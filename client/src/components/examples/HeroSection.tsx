import { ThemeProvider } from '../ThemeProvider';
import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <HeroSection 
          onExploreClick={() => console.log('Explore Portfolio clicked')}
          onPlayReelClick={() => console.log('Play Demo Reel clicked')}
        />
      </div>
    </ThemeProvider>
  );
}