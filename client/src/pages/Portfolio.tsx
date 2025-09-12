import { useEffect, useRef } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PortfolioGallery from "@/components/PortfolioGallery";
import SkillsShowcase from "@/components/SkillsShowcase";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import CustomCursor from "@/components/CustomCursor";

export default function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const refs = {
      home: heroRef,
      portfolio: portfolioRef,
      skills: skillsRef,
      about: aboutRef,
      contact: contactRef,
    };

    const targetRef = refs[sectionId as keyof typeof refs];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  };

  // Add smooth scrolling styles
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <CustomCursor />
        <Navigation onNavigate={scrollToSection} />
        
        <main>
          <div ref={heroRef}>
            <HeroSection 
              onExploreClick={() => scrollToSection("portfolio")}
              onPlayReelClick={() => console.log("Demo reel clicked")}
            />
          </div>

          <div ref={portfolioRef}>
            <PortfolioGallery 
              onItemClick={(item) => console.log(`Portfolio item clicked: ${item.title}`)}
            />
          </div>

          <div ref={skillsRef}>
            <SkillsShowcase />
          </div>

          <div ref={aboutRef}>
            <AboutSection />
          </div>

          <div ref={contactRef}>
            <ContactForm />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/20 py-12">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
                  VFX.ARTIST
                </div>
                <p className="text-muted-foreground">
                  Bringing imagination to life through cutting-edge 3D visualization and VFX.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2 text-sm">
                  <button 
                    onClick={() => scrollToSection("portfolio")}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    Portfolio
                  </button>
                  <button 
                    onClick={() => scrollToSection("skills")}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    Skills
                  </button>
                  <button 
                    onClick={() => scrollToSection("about")}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    About
                  </button>
                  <button 
                    onClick={() => scrollToSection("contact")}
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contact
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Los Angeles, CA</div>
                  <div>alex@vfxartist.com</div>
                  <div>Available for worldwide projects</div>
                </div>
              </div>
            </div>
            
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Alex Render. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}