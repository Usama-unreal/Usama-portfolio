import { ThemeProvider } from '../ThemeProvider';
import ContactForm from '../ContactForm';

export default function ContactFormExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <ContactForm />
      </div>
    </ThemeProvider>
  );
}