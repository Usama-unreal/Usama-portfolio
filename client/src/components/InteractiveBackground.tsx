import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

interface InteractiveBackgroundProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  mouseInfluence?: number;
}

export default function InteractiveBackground({
  className = "",
  particleCount = 50,
  connectionDistance = 150,
  mouseInfluence = 100,
}: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>();

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        hue: 270 + Math.random() * 60 - 30, // Purple range
      });
    }

    particlesRef.current = particles;
  }, [particleCount]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Initial resize
    handleResize();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;

      // Update particle positions
      particles.forEach(particle => {
        // Mouse influence
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 0.01;
          particle.vy += Math.sin(angle) * force * 0.01;
        }

        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Boundary collision
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsl(${particle.hue}, 70%, 60%)`;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (connectionDistance - distance) / connectionDistance;
            ctx.save();
            ctx.globalAlpha = opacity * 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Mouse particle
      if (mousePos.x && mousePos.y) {
        ctx.save();
        ctx.fillStyle = 'rgba(168, 85, 247, 0.6)';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
        ctx.beginPath();
        ctx.arc(mousePos.x, mousePos.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections from mouse to nearby particles
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
        ctx.lineWidth = 2;

        particles.forEach(particle => {
          const dx = mousePos.x - particle.x;
          const dy = mousePos.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseInfluence) {
            const opacity = (mouseInfluence - distance) / mouseInfluence;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(mousePos.x, mousePos.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [mousePos, connectionDistance, mouseInfluence]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}