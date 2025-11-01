import { useEffect } from 'react';
import { Button } from './button';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

// Allow passing Button props (className, size, variant, etc.) so consumers can control width/style
export const CalendlyButton: React.FC<React.ComponentProps<typeof Button>> = ({ className, size = 'lg', variant = 'outline', ...props }) => {
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
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
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
      size={size}
      variant={variant}
      className={cn('border-primary/50 hover:bg-primary/10 hover:text-primary transition-colors', className)}
      onClick={openCalendly}
      {...props}
    >
      <Calendar className="w-5 h-5 mr-2" />
      Schedule a Call
    </Button>
  );
};
