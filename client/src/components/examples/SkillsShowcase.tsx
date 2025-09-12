import { ThemeProvider } from '../ThemeProvider';
import SkillsShowcase from '../SkillsShowcase';

export default function SkillsShowcaseExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <SkillsShowcase />
      </div>
    </ThemeProvider>
  );
}