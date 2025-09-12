import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
  intensity?: number; // Magnetic pull intensity (default: 30)
  'data-testid'?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  intensity = 30,
  'data-testid': testId,
  type = "button",
  disabled = false,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.max(rect.width, rect.height);

      if (distance < maxDistance) {
        const normalizedX = (deltaX / maxDistance) * intensity;
        const normalizedY = (deltaY / maxDistance) * intensity;

        setMousePosition({ x: normalizedX, y: normalizedY });
      }
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      // Smooth return to center
      const animate = () => {
        setMousePosition(prev => {
          const newX = prev.x * 0.8;
          const newY = prev.y * 0.8;
          
          if (Math.abs(newX) > 0.1 || Math.abs(newY) > 0.1) {
            animationId = requestAnimationFrame(animate);
            return { x: newX, y: newY };
          }
          return { x: 0, y: 0 };
        });
      };
      animate();
    };

    document.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [isHovering, intensity]);

  return (
    <Button
      ref={buttonRef}
      className={`cursor-button relative overflow-hidden transition-all duration-200 ${className}`}
      variant={variant}
      size={size}
      onClick={onClick}
      data-testid={testId}
      type={type}
      disabled={disabled}
      style={{
        transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
        transition: isHovering ? 'none' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      {...props}
    >
      {/* Ripple effect background */}
      <div
        className="absolute inset-0 rounded-inherit opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${50 + (mousePosition.x / intensity) * 50}% ${50 + (mousePosition.y / intensity) * 50}%, rgba(255,255,255,0.1) 0%, transparent 70%)`,
          opacity: isHovering ? 1 : 0,
        }}
      />
      
      {/* Button content */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-inherit opacity-0 transition-opacity duration-300"
        style={{
          background: 'rgba(168, 85, 247, 0.1)',
          boxShadow: isHovering ? '0 0 20px rgba(168, 85, 247, 0.3)' : 'none',
          opacity: isHovering ? 1 : 0,
        }}
      />
    </Button>
  );
}