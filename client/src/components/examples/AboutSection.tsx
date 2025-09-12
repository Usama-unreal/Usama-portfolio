import { ThemeProvider } from '../ThemeProvider';
import AboutSection from '../AboutSection';

export default function AboutSectionExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <AboutSection />
      </div>
    </ThemeProvider>
  );
}