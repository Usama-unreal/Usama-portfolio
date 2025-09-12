import { useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Palette, Film } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
  description: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "3d",
    title: "3D & Modeling",
    icon: <Cpu className="w-6 h-6" />,
    skills: [
      { name: "Blender", level: 95, category: "3D Software", description: "Advanced modeling, sculpting, and rendering" },
      { name: "Cinema 4D", level: 90, category: "3D Software", description: "Motion graphics and procedural workflows" },
      { name: "Houdini", level: 85, category: "3D Software", description: "Procedural modeling and VFX simulations" },
      { name: "3ds Max", level: 80, category: "3D Software", description: "Architectural visualization and modeling" },
    ],
  },
  {
    id: "vfx",
    title: "VFX & Compositing", 
    icon: <Zap className="w-6 h-6" />,
    skills: [
      { name: "Nuke", level: 90, category: "Compositing", description: "Node-based compositing and VFX work" },
      { name: "After Effects", level: 95, category: "Motion Graphics", description: "Motion graphics and post-production" },
      { name: "DaVinci Resolve", level: 75, category: "Color", description: "Color grading and finishing" },
      { name: "Fusion", level: 70, category: "Compositing", description: "3D compositing and motion graphics" },
    ],
  },
  {
    id: "rendering",
    title: "Rendering & Lighting",
    icon: <Palette className="w-6 h-6" />,
    skills: [
      { name: "V-Ray", level: 90, category: "Renderer", description: "Photorealistic rendering and lighting" },
      { name: "Octane", level: 85, category: "Renderer", description: "GPU-accelerated rendering workflows" },
      { name: "Corona", level: 80, category: "Renderer", description: "Architectural and product visualization" },
      { name: "Cycles", level: 88, category: "Renderer", description: "Blender's path-tracing renderer" },
    ],
  },
  {
    id: "pipeline",
    title: "Pipeline & Tools",
    icon: <Film className="w-6 h-6" />,
    skills: [
      { name: "Python", level: 85, category: "Scripting", description: "Automation and pipeline tools" },
      { name: "Photoshop", level: 90, category: "2D", description: "Texture work and post-processing" },
      { name: "Substance Suite", level: 80, category: "Texturing", description: "PBR material creation and painting" },
      { name: "Unreal Engine", level: 75, category: "Real-time", description: "Real-time rendering and virtual production" },
    ],
  },
];

export default function SkillsShowcase() {
  const [activeCategory, setActiveCategory] = useState("3d");
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const activeSkills = skillCategories.find(cat => cat.id === activeCategory)?.skills || [];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          // Animate skills with stagger delay
          activeSkills.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => new Set(Array.from(prev).concat(skill.name)));
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [activeSkills, isInView]);

  // Reset animations when category changes
  useEffect(() => {
    setAnimatedSkills(new Set());
    setIsInView(false);
    
    if (sectionRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            activeSkills.forEach((skill, index) => {
              setTimeout(() => {
                setAnimatedSkills(prev => new Set(Array.from(prev).concat(skill.name)));
              }, index * 200);
            });
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }
  }, [activeCategory]);

  const handleCategoryClick = (categoryId: string) => {
    console.log(`Switching to skills category: ${categoryId}`);
    setActiveCategory(categoryId);
  };

  return (
    <section className="py-24 px-4 bg-muted/20" data-testid="skills-section">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mastery across the complete 3D and VFX pipeline, from concept to final delivery
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg text-left transition-all duration-200 hover-elevate ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card hover:bg-accent"
                  }`}
                  data-testid={`skill-category-${category.id}`}
                >
                  {category.icon}
                  <span className="font-medium">{category.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Skills Content */}
          <div className="lg:col-span-3" ref={sectionRef}>
            <div className="bg-card border rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                {skillCategories.find(cat => cat.id === activeCategory)?.icon}
                {skillCategories.find(cat => cat.id === activeCategory)?.title}
              </h3>

              <div className="space-y-6">
                {activeSkills.map((skill, index) => {
                  const isAnimated = animatedSkills.has(skill.name);
                  return (
                    <div
                      key={skill.name}
                      className={`transition-all duration-500 ${
                        isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                      data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-lg">{skill.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <Progress 
                        value={isAnimated ? skill.level : 0}
                        className="h-3 mb-2"
                      />
                      
                      <p className="text-sm text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">8+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">150+</div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">20+</div>
            <div className="text-sm text-muted-foreground">Software Tools</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Happy Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
}