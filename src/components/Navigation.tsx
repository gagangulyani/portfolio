import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Code, Github, Linkedin, Mail } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold gradient-text">Gagan Deep</span>
            <Badge variant="secondary" className="hidden md:block text-xs">
              Available
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Social Links & CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hover:bg-primary/20">
              <Github className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/20">
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button size="sm" className="hero-glow">
              <Mail className="w-4 h-4 mr-2" />
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/50">
            <div className="px-6 py-6 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/20">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
                <Button size="sm" className="w-full hero-glow">
                  <Mail className="w-4 h-4 mr-2" />
                  Hire Me
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;