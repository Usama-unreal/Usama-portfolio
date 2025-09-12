import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import MagneticButton from "./MagneticButton";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle, 
  Linkedin, 
  Instagram, 
  Youtube,
  ExternalLink
} from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const projectTypes = [
    "Architectural Visualization",
    "VFX & Motion Graphics", 
    "Product Visualization",
    "Animation & Rendering",
    "Consultation",
    "Other"
  ];

  const budgetRanges = [
    "$5,000 - $15,000",
    "$15,000 - $35,000", 
    "$35,000 - $75,000",
    "$75,000+",
    "Let's Discuss"
  ];

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", url: "#" },
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", url: "#" },
    { icon: <Youtube className="w-5 h-5" />, label: "YouTube", url: "#" },
  ];

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your name, email, and message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // For static hosting, use Formspree (replace YOUR_FORM_ID with your actual Formspree form ID)
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          projectType: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message,
        }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        
        toast({
          title: "Message sent successfully!",
          description: "I'll get back to you within 24 hours.",
        });

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            company: "",
            projectType: "",
            budget: "",
            timeline: "",
            message: "",
          });
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
      
    } catch (error) {
      // Fallback to mailto link for immediate deployment
      const subject = `VFX Project Inquiry from ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'Not specified'}\nProject Type: ${formData.projectType || 'Not specified'}\nBudget: ${formData.budget || 'Not specified'}\nTimeline: ${formData.timeline || 'Not specified'}\n\nMessage:\n${formData.message}`;
      const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.open(mailtoLink, '_blank');
      
      setIsSubmitted(true);
      
      toast({
        title: "Opening email client",
        description: "Your default email client will open with the message pre-filled.",
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          budget: "",
          timeline: "",
          message: "",
        });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (platform: string) => {
    console.log(`Opening ${platform} profile`);
    // todo: remove mock functionality - replace with actual social links
  };

  if (isSubmitted) {
    return (
      <section className="py-24 px-4 bg-muted/20" data-testid="contact-section">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-8">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h2 className="text-4xl font-display font-bold mb-4">Message Sent!</h2>
              <p className="text-xl text-muted-foreground">
                Thank you for reaching out. I'll review your project details and get back to you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 bg-muted/20" data-testid="contact-section">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Let's Create Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your vision to life? Let's discuss your project and explore the possibilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <div className="font-medium">Email</div>
                    <a href="mailto:alex@vfxartist.com" className="text-muted-foreground hover:text-primary transition-colors">
                      alex@vfxartist.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                      +1 (234) 567-8900
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-muted-foreground">Los Angeles, CA</div>
                    <div className="text-sm text-muted-foreground">Available worldwide (Remote)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Follow My Work</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <MagneticButton
                    key={social.label}
                    variant="outline"
                    size="icon"
                    onClick={() => handleSocialClick(social.label)}
                    data-testid={`social-${social.label.toLowerCase()}`}
                    intensity={25}
                  >
                    {social.icon}
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-card border rounded-lg p-6">
              <h4 className="font-semibold mb-4">Quick Info</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response Time:</span>
                  <span>Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Project Start:</span>
                  <span>2-4 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability:</span>
                  <Badge variant="secondary" className="text-xs">Open</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    required
                    data-testid="input-name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Your company name"
                    data-testid="input-company"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange("timeline", e.target.value)}
                    placeholder="When do you need this completed?"
                    data-testid="input-timeline"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Project Type</Label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <Badge
                        key={type}
                        variant={formData.projectType === type ? "default" : "outline"}
                        className="cursor-pointer hover-elevate"
                        onClick={() => handleInputChange("projectType", formData.projectType === type ? "" : type)}
                        data-testid={`project-type-${type.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Budget Range</Label>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map((budget) => (
                      <Badge
                        key={budget}
                        variant={formData.budget === budget ? "default" : "outline"}
                        className="cursor-pointer hover-elevate"
                        onClick={() => handleInputChange("budget", formData.budget === budget ? "" : budget)}
                        data-testid={`budget-${budget.toLowerCase().replace(/[\s$+,]/g, '-')}`}
                      >
                        {budget}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Project Details *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell me about your project, goals, and any specific requirements..."
                  className="min-h-[120px]"
                  required
                  data-testid="input-message"
                />
              </div>

              <MagneticButton
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
                data-testid="button-submit"
                intensity={40}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}