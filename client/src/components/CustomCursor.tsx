import { useState, useEffect, useRef } from "react";

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  cursorType: 'default' | 'hover' | 'text' | 'image' | 'button';
}

export default function CustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    cursorType: 'default',
  });
  
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    opacity: number;
    size: number;
  }>>([]);
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const particleId = useRef(0);

  useEffect(() => {
    let animationId: number;

    const updateCursor = (e: MouseEvent) => {
      setCursor(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));

      // Add particle trail
      if (Math.random() > 0.7) {
        const newParticle = {
          id: particleId.current++,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          opacity: 1,
          size: Math.random() * 4 + 2,
        };

        setParticles(prev => [...prev.slice(-20), newParticle]);
      }
    };

    const handleMouseDown = () => {
      setCursor(prev => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setCursor(prev => ({ ...prev, isClicking: false }));
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      let cursorType: CursorState['cursorType'] = 'default';
      
      if (target.matches('button, .cursor-button, [role="button"]')) {
        cursorType = 'button';
      } else if (target.matches('img, .cursor-image')) {
        cursorType = 'image';
      } else if (target.matches('input, textarea, .cursor-text')) {
        cursorType = 'text';
      } else if (target.matches('a, .cursor-hover, .hover-target')) {
        cursorType = 'hover';
      }

      setCursor(prev => ({ 
        ...prev, 
        isHovering: true,
        cursorType 
      }));
    };

    const handleMouseLeave = () => {
      setCursor(prev => ({ 
        ...prev, 
        isHovering: false,
        cursorType: 'default'
      }));
    };

    // Animation loop for particles
    const animateParticles = () => {
      setParticles(prev => prev
        .map(particle => ({
          ...particle,
          opacity: particle.opacity - 0.02,
          y: particle.y - 0.5,
        }))
        .filter(particle => particle.opacity > 0)
      );
      animationId = requestAnimationFrame(animateParticles);
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add event listeners for hover states
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    animateParticles();

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  const getCursorSize = () => {
    switch (cursor.cursorType) {
      case 'button':
        return cursor.isClicking ? 60 : 80;
      case 'hover':
        return cursor.isClicking ? 45 : 65;
      case 'image':
        return cursor.isClicking ? 35 : 50;
      case 'text':
        return 20;
      default:
        return cursor.isClicking ? 25 : 35;
    }
  };

  const getCursorColor = () => {
    switch (cursor.cursorType) {
      case 'button':
        return 'rgba(168, 85, 247, 0.6)'; // primary color
      case 'hover':
        return 'rgba(168, 85, 247, 0.4)';
      case 'image':
        return 'rgba(59, 130, 246, 0.5)'; // blue
      case 'text':
        return 'rgba(34, 197, 94, 0.6)'; // green
      default:
        return 'rgba(168, 85, 247, 0.3)';
    }
  };

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate3d(${cursor.x - getCursorSize() / 2}px, ${cursor.y - getCursorSize() / 2}px, 0)`,
          transition: cursor.isClicking ? 'none' : 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.2s ease, height 0.2s ease',
        }}
      >
        <div
          className="rounded-full border-2 border-white"
          style={{
            width: getCursorSize(),
            height: getCursorSize(),
            backgroundColor: getCursorColor(),
            backdropFilter: 'blur(8px)',
            boxShadow: `0 0 ${getCursorSize() / 2}px ${getCursorColor()}`,
          }}
        />
        
        {/* Inner dot */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{
            width: cursor.cursorType === 'text' ? 2 : 6,
            height: cursor.cursorType === 'text' ? 20 : 6,
            opacity: cursor.cursorType === 'button' ? 0 : 1,
          }}
        />
        
        {/* Button text */}
        {cursor.cursorType === 'button' && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-semibold"
            style={{ fontSize: '10px' }}
          >
            CLICK
          </div>
        )}
      </div>

      {/* Particle trail */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed top-0 left-0 pointer-events-none rounded-full bg-primary/60 z-[9998]"
          style={{
            transform: `translate3d(${particle.x - particle.size / 2}px, ${particle.y - particle.size / 2}px, 0)`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(168, 85, 247, ${particle.opacity * 0.5})`,
          }}
        />
      ))}
    </>
  );
}