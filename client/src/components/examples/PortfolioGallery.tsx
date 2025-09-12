import { ThemeProvider } from '../ThemeProvider';
import PortfolioGallery from '../PortfolioGallery';

export default function PortfolioGalleryExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <PortfolioGallery 
          onItemClick={(item) => console.log('Portfolio item clicked:', item.title)}
        />
      </div>
    </ThemeProvider>
  );
}