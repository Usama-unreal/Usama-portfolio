import { ThemeProvider } from '../ThemeProvider';
import Navigation from '../Navigation';

export default function NavigationExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navigation onNavigate={(section) => console.log(`Navigate to: ${section}`)} />
        <div className="pt-20 p-8">
          <h2 className="text-2xl font-bold mb-4">Navigation Example</h2>
          <p className="text-muted-foreground">This navigation bar includes theme toggle, responsive mobile menu, and smooth animations.</p>
          <div className="mt-8 space-y-4">
            <p>Scroll down to see the glassmorphism effect on the navigation bar.</p>
            <div className="h-screen bg-gradient-to-b from-primary/10 to-transparent flex items-center justify-center">
              <p className="text-xl text-muted-foreground">Scroll area for testing nav effects</p>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}