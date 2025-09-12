import { ThemeProvider } from '../ThemeProvider';
import { Button } from '@/components/ui/button';

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <div className="p-8 space-y-4">
        <h2 className="text-2xl font-bold">Theme Provider Example</h2>
        <p className="text-muted-foreground">The theme provider is wrapping this content and managing dark/light mode state.</p>
        <div className="space-y-2">
          <Button>Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="secondary">Secondary Button</Button>
        </div>
      </div>
    </ThemeProvider>
  );
}