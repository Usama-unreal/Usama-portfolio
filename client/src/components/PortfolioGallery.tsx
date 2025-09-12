import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play, Maximize } from "lucide-react";
import archRender from "@assets/generated_images/Architectural_visualization_render_sample_07099f8c.png";
import vfxBreakdown from "@assets/generated_images/VFX_particle_explosion_breakdown_c3b9ef43.png";
import animationFrame from "@assets/generated_images/Abstract_3D_animation_frame_d0047f68.png";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tools: string[];
  year: string;
  type: "image" | "video";
}

interface PortfolioGalleryProps {
  onItemClick?: (item: PortfolioItem) => void;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Luxury Residential Interior",
    category: "Architecture",
    image: archRender,
    description: "Modern architectural visualization featuring premium materials and natural lighting",
    tools: ["Blender", "V-Ray", "Photoshop"],
    year: "2024",
    type: "image",
  },
  {
    id: "2", 
    title: "Particle Explosion VFX",
    category: "VFX",
    image: vfxBreakdown,
    description: "Dynamic particle system with realistic fire and smoke simulation",
    tools: ["Houdini", "Nuke", "After Effects"],
    year: "2024",
    type: "video",
  },
  {
    id: "3",
    title: "Fluid Motion Graphics",
    category: "Animation",
    image: animationFrame,
    description: "Abstract 3D animation showcasing organic fluid dynamics",
    tools: ["Cinema 4D", "Octane", "After Effects"],
    year: "2023",
    type: "video",
  },
  // todo: remove mock functionality - duplicate for demo
  {
    id: "4",
    title: "Corporate Office Space",
    category: "Architecture", 
    image: archRender,
    description: "Professional workspace design with focus on natural lighting and modern aesthetics",
    tools: ["Blender", "Corona", "Photoshop"],
    year: "2023",
    type: "image",
  },
  {
    id: "5",
    title: "Magical Portal Effect",
    category: "VFX",
    image: vfxBreakdown,
    description: "Fantasy VFX sequence with energy portals and magical particles",
    tools: ["Houdini", "Nuke", "DaVinci Resolve"],
    year: "2024",
    type: "video",
  },
  {
    id: "6",
    title: "Logo Animation Sequence",
    category: "Motion Graphics",
    image: animationFrame,
    description: "Brand identity animation with dynamic typography and effects",
    tools: ["After Effects", "Cinema 4D", "Illustrator"],
    year: "2024",
    type: "video",
  },
];

const categories = ["All", "Architecture", "VFX", "Animation", "Motion Graphics"];

export default function PortfolioGallery({ onItemClick }: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const handleCategoryClick = (category: string) => {
    console.log(`Switching to category: ${category}`);
    setActiveCategory(category);
  };

  const handleItemClick = (item: PortfolioItem) => {
    console.log(`Clicked portfolio item: ${item.title}`);
    onItemClick?.(item);
  };

  return (
    <section className="py-24 px-4" data-testid="portfolio-section">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Featured Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A curated selection of my latest projects spanning architecture, VFX, and motion graphics
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryClick(category)}
              className="px-6 py-2"
              data-testid={`filter-${category.toLowerCase().replace(" ", "-")}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg bg-card border cursor-pointer transition-all duration-300 hover:scale-[1.02] hover-elevate"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleItemClick(item)}
              data-testid={`portfolio-item-${item.id}`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-300 ${
                  hoveredItem === item.id ? "opacity-100" : "opacity-0"
                }`} />

                {/* Play Icon for Videos */}
                {item.type === "video" && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2">
                      <Play className="w-4 h-4 text-primary fill-current" />
                    </div>
                  </div>
                )}

                {/* Hover Actions */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredItem === item.id ? "opacity-100" : "opacity-0"
                }`}>
                  <div className="flex gap-3">
                    <Button size="sm" variant="secondary">
                      <Maximize className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.year}</p>
                  </div>
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                  {item.tools.map((tool) => (
                    <Badge key={tool} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" data-testid="button-view-more">
            View Complete Portfolio
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}