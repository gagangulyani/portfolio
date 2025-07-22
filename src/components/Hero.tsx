import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Download, ExternalLink, Users } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import gaganProfile from "/lovable-uploads/ef8139b6-2ceb-4d3f-bc94-f96737ae8d4d.png";
import delhiDevsLogo from "@/assets/delhidevs-logo.png";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const roles = ["Full Stack Developer", "Community Builder", "Tech Leader"];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Mobile-first: Name & Title, then Profile, then rest
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Name & Title */}
        <div className={`w-full text-center mt-12 mb-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
            Available for Work
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 leading-tight">
            Gagan Deep
          </h1>
          <div className="mb-2">
            <span className="text-primary font-semibold text-lg sm:text-2xl">{roles[currentRole]}</span>
          </div>
        </div>

        {/* Profile Image */}
        <div className={`w-full flex justify-center mb-6 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative">
            <div className="w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
              <img
                src={gaganProfile}
                alt="Gagan Deep Singh"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Description & Actions */}
        <div className="w-full text-center max-w-2xl mb-6">
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Full Stack Developer with 3+ years of experience delivering scalable web applications and optimizing system performance. Proven track record of implementing 120+ features, resolving 170+ critical bugs, and modernizing legacy systems using modern JavaScript frameworks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 transition-colors"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/50 hover:bg-primary/10 transition-colors"
              asChild
            >
              {/* Updated resume link to correct file */}
              <a href="/Gagan-Resume-SWE.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 justify-center mb-8">
          <Button variant="ghost" size="icon" className="hover:bg-primary/20 transition-colors" asChild>
            <a href="https://github.com/gagangulyani" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/20 transition-colors" asChild>
            <a href="https://linkedin.com/in/gagan-gulyani" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;