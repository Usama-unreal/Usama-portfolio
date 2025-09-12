import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Award, Users, Calendar } from "lucide-react";
import profileImage from "@assets/generated_images/Professional_artist_headshot_portrait_35684f42.png";

export default function AboutSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const achievements = [
    { icon: <Award className="w-5 h-5" />, label: "Award-Winning Projects", count: "12+" },
    { icon: <Users className="w-5 h-5" />, label: "Collaborative Teams", count: "25+" },
    { icon: <Calendar className="w-5 h-5" />, label: "Years in Industry", count: "8+" },
  ];

  const specializations = [
    "Architectural Visualization",
    "Cinematic VFX",
    "Motion Graphics",
    "Product Visualization", 
    "Virtual Production",
    "Real-time Rendering",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleDownloadCV = () => {
    console.log("Download CV clicked");
    // todo: remove mock functionality - replace with actual CV download
  };

  const handleViewCredentials = () => {
    console.log("View Credentials clicked");
    // todo: remove mock functionality - replace with credentials modal/page
  };

  return (
    <section className="py-24 px-4" data-testid="about-section" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image and Stats */}
          <div className={`space-y-8 transition-all duration-700 ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}>
            {/* Profile Image */}
            <div className="relative group">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
                <img 
                  src={profileImage}
                  alt="Alex Render - 3D Visualizer & VFX Artist"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold shadow-lg">
                Available for Projects
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-1 gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.label}
                  className={`flex items-center gap-4 p-4 bg-card border rounded-lg hover-elevate transition-all duration-500 ${
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="text-primary">
                    {achievement.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{achievement.count}</div>
                    <div className="text-sm text-muted-foreground">{achievement.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className={`space-y-8 transition-all duration-700 ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}>
            <div>
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Creative Vision
              </h2>
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                Crafting Visual Stories That Inspire
              </p>
            </div>

            <div className="space-y-6 text-foreground/90 leading-relaxed">
              <p>
                My journey in 3D visualization and VFX began with a simple fascination: 
                <span className="text-primary font-medium"> bringing impossible worlds to life</span>. 
                Over eight years, I've honed my craft across architectural visualization, 
                cinematic VFX, and cutting-edge motion graphics.
              </p>
              
              <p>
                I believe every pixel tells a story. Whether it's revealing the warmth of natural light 
                in an unbuilt space or orchestrating explosive particle systems that defy physics, 
                my work bridges the gap between imagination and reality.
              </p>

              <p>
                Collaboration fuels my creativity. I've worked with visionary architects, 
                bold filmmakers, and innovative brands to create experiences that not only look stunning 
                but evoke genuine emotion and drive meaningful results.
              </p>
            </div>

            {/* Specializations */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Specializations</h3>
              <div className="flex flex-wrap gap-3">
                {specializations.map((spec, index) => (
                  <Badge 
                    key={spec}
                    variant="secondary"
                    className={`transition-all duration-300 hover-elevate ${
                      isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                onClick={handleDownloadCV}
                data-testid="button-download-cv"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleViewCredentials}
                data-testid="button-view-credentials"
              >
                View Credentials
              </Button>
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground">
              "The best 3D work doesn't just showcase technical skill—it tells a story that resonates 
              long after the final render."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}