import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Code, Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/gagangulyani", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/gagan-gulyani", label: "LinkedIn" },
    { icon: Mail, href: "mailto:gagangulyanig@gmail.com", label: "Email" },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold gradient-text">Gagan Deep Singh</span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Full Stack Developer & Community Builder. 
              Crafting digital experiences and building communities that matter.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Full Stack Developer</Badge>
              <Badge variant="secondary">Community Builder</Badge>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>using React & TypeScript</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
            
            <div className="mt-6">
              <Button onClick={handleScrollToTop} variant="outline" size="sm">
                <ArrowUp className="w-4 h-4 mr-2" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div>
              © {currentYear} Gagan Deep Singh. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6">
              <span>Available for new opportunities</span>
              <Badge variant="default" className="animate-pulse">
                Open to Work
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;