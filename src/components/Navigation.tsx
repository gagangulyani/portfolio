import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Code, Github, Linkedin, User, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
  // import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
    // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Auth state listener
    // const { data: { subscription } } = supabase.auth.onAuthStateChange(
    //   (event, session) => {
    //     setUser(session?.user ?? null);
    //   }
    // );

    // Check current session
      // supabase.auth.getSession().then(({ data: { session } }) => {
      //   setUser(session?.user ?? null);
      // });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
        // subscription.unsubscribe();
    };
  }, []);

  const navigationItems = [
    { label: "About", href: "#about", type: "scroll" },
    { label: "Experience", href: "#experience", type: "scroll" },
    { label: "Projects", href: "#projects", type: "scroll" },
    { label: "Blog", href: "#blog", type: "scroll" },
    { label: "Contact", href: "#contact", type: "scroll" },
  ];

  const handleNavClick = (href: string, type: string) => {
    setIsOpen(false);
    if (type === "navigate") {
      navigate(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

    // const handleSignOut = async () => {
    //   const { error } = await supabase.auth.signOut();
    //   if (error) {
    //     toast({
    //       title: "Error",
    //       description: "Failed to sign out",
    //       variant: "destructive",
    //     });
    //   } else {
    //     toast({
    //       title: "Signed out successfully",
    //       description: "See you later!",
    //     });
    //   }
    // };

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
            <span className="text-xl font-bold text-primary">Gagan Deep</span>
            <Badge variant="secondary" className="hidden md:block text-xs">
              Available
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href, item.type)}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Social Links & CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="hover:bg-primary/20 transition-colors">
              <Github className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/20 transition-colors">
              <Linkedin className="w-4 h-4" />
            </Button>
            
            {/* Auth UI removed: Dashboard/Sign In/Sign Out buttons hidden */}
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
                  onClick={() => handleNavClick(item.href, item.type)}
                  className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <ThemeToggle />
                  <Button variant="ghost" size="icon" className="hover:bg-primary/20 transition-colors">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/20 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Auth UI removed: Dashboard/Sign In/Sign Out buttons hidden */}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;