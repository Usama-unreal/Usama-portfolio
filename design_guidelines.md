# Portfolio Website Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium portfolio websites like Awwwards winners and Apple's product showcases. This project demands a cinematic, animation-rich experience that reflects the user's expertise in 3D visualization and VFX.

## Core Design Elements

### Color Palette
**Dark Mode Primary (Default)**:
- Background: 12 8% 6% (Deep charcoal)
- Surface: 220 13% 12% (Dark slate)
- Primary accent: 270 100% 65% (Vibrant purple)
- Text: 0 0% 95% (Near white)

**Light Mode**:
- Background: 0 0% 98% (Pure white)
- Surface: 220 13% 96% (Light gray)
- Primary accent: 270 80% 55% (Darker purple)
- Text: 220 13% 18% (Dark slate)

### Typography
- **Primary**: Inter (Google Fonts) - clean, modern sans-serif
- **Display**: Orbitron (Google Fonts) - futuristic for headings
- **Code**: JetBrains Mono - for technical specifications

### Layout System
**Tailwind Spacing**: Consistent use of 4, 8, 12, and 24 units (p-4, m-8, h-12, gap-24) for harmonious spacing throughout.

### Component Library

**Navigation**:
- Fixed header with glassmorphism effect
- Smooth scroll indicators
- Animated hamburger menu for mobile

**Hero Section**:
- Full viewport height with particle animation background
- Large typography with typewriter effect
- Floating 3D elements with subtle rotation
- Call-to-action buttons with outline variant over hero imagery

**Portfolio Gallery**:
- Masonry grid layout with category filters
- Hover animations revealing project details
- Lightbox modal with image zoom and project information
- Lazy loading for performance optimization

**Skills Showcase**:
- Interactive progress bars with animation on scroll
- Tool icons with hover effects
- Proficiency levels with dynamic visual feedback

**Forms**:
- Floating label inputs with smooth transitions
- Real-time validation with micro-animations
- Success/error states with subtle color changes

### Animations
**Core Animation Principles**:
- Entrance animations: Fade-up with stagger delays
- Scroll-triggered animations using Intersection Observer
- Smooth transitions between sections (800ms duration)
- Particle systems for background ambiance
- Hover states with scale and color transitions

**Performance Considerations**:
- Use `transform` and `opacity` for GPU acceleration
- Implement `will-change` property sparingly
- Prefers-reduced-motion respect for accessibility

### Interactive Elements
- 3D card hover effects with transform perspective
- Smooth scrolling with momentum
- Dynamic cursor that adapts to content
- Interactive timeline for experience showcase
- Floating action buttons with ripple effects

### Images
**Hero Image**: Large cinematic background showcasing a premium 3D render or VFX scene, with overlay gradients and particle effects

**Portfolio Images**: High-quality project thumbnails in various aspect ratios, optimized for web with progressive loading

**About Section**: Professional headshot with subtle animation on scroll

**Background Elements**: Abstract geometric patterns and particle systems that complement the 3D/VFX theme

### Responsive Design
- Mobile-first approach with touch-optimized interactions
- Reduced animation complexity on smaller screens
- Collapsible navigation with smooth slide transitions
- Optimized image sizes for different viewports

This design system creates a premium, cinematic experience that showcases technical expertise while maintaining exceptional usability and performance.