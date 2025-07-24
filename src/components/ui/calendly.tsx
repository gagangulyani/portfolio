import { useEffect } from 'react';
import { Button } from './button';
import { Calendar } from 'lucide-react';

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export const CalendlyButton = () => {
  useEffect(() => {
    // Add Calendly stylesheet
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/gagangulyanig'
      });
    }
  };

  return (
    <Button 
      size="lg"
      variant="outline"
      className="border-primary/50 hover:bg-primary/10 hover:text-primary transition-colors"
      onClick={openCalendly}
    >
      <Calendar className="w-5 h-5 mr-2" />
      Schedule a Call
    </Button>
  );
};
