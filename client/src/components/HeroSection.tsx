import { useEffect, useState } from "react";
import { ArrowDown, Play } from "lucide-react";
import MagneticButton from "./MagneticButton";
import InteractiveBackground from "./InteractiveBackground";
import heroImage from "@assets/generated_images/Cinematic_hero_background_scene_c0874808.png";

interface HeroSectionProps {
  onExploreClick?: () => void;
  onPlayReelClick?: () => void;
}

export default function HeroSection({ onExploreClick, onPlayReelClick }: HeroSectionProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = "3D Visualizer & VFX Artist";

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const typeWriter = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(typeWriter, 100);
      }
    };

    timeout = setTimeout(typeWriter, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const handleExploreClick = () => {
    console.log("Explore Portfolio clicked");
    onExploreClick?.();
  };

  const handlePlayReelClick = () => {
    console.log("Play Demo Reel clicked");
    onPlayReelClick?.();
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Cinematic 3D Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      </div>

      {/* Interactive Particle Background */}
      <InteractiveBackground 
        className="opacity-60"
        particleCount={60}
        connectionDistance={120}
        mouseInfluence={150}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            ALEX RENDER
          </h1>
          
          <div className="text-2xl md:text-4xl font-sans font-light text-primary mb-6 min-h-[3rem]">
            {displayedText}
            {showCursor && <span className="ml-1 animate-pulse">|</span>}
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Bringing imagination to life through cutting-edge 3D visualization, 
            cinematic VFX, and immersive digital experiences that blur the lines between reality and art.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <MagneticButton
            size="lg"
            onClick={handleExploreClick}
            className="px-8 py-6 text-lg font-semibold bg-primary/90 backdrop-blur-sm border border-primary-border"
            data-testid="button-explore-portfolio"
            intensity={40}
          >
            Explore Portfolio
          </MagneticButton>
          
          <MagneticButton
            variant="outline"
            size="lg"
            onClick={handlePlayReelClick}
            className="px-8 py-6 text-lg font-semibold bg-background/10 backdrop-blur-sm"
            data-testid="button-play-reel"
            intensity={35}
          >
            <Play className="w-5 h-5 mr-2" />
            Demo Reel
          </MagneticButton>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors cursor-hover hover-target group">
            <span className="text-sm mb-2 group-hover:scale-110 transition-transform">Scroll to explore</span>
            <ArrowDown className="w-6 h-6 animate-bounce group-hover:scale-125 transition-transform" data-testid="scroll-indicator" />
          </div>
        </div>
      </div>
    </section>
  );
}