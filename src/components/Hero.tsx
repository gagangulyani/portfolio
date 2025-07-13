import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Download, ExternalLink, Users } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import gaganProfile from "@/assets/gagan-profile.jpg";
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
  }, []);

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <div className={`flex-1 text-center lg:text-left transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
                Available for Work
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                I'm{" "}
                <span className="text-primary">
                  Gagan Deep
                </span>
              </h1>
              
              <div className="h-16 mb-6">
                <p className="text-xl lg:text-2xl text-muted-foreground transition-all duration-500">
                  <span className="text-primary font-semibold">{roles[currentRole]}</span>
                </p>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-2xl mb-6 leading-relaxed">
                Full Stack Developer at Pulse, Ex-SWE at JFT. I build amazing web applications 
                and foster tech communities.
              </p>
              
              {/* Community Builder Info */}
              <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Community Builder at</span>
                </div>
                <a 
                  href="https://delhidevs.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img 
                    src={delhiDevsLogo} 
                    alt="DelhiDevs Community" 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-primary font-medium">DelhiDevs</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
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
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <Button variant="ghost" size="icon" className="hover:bg-primary/20 transition-colors">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-primary/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className={`flex-1 flex justify-center lg:justify-end transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img 
                  src={gaganProfile} 
                  alt="Gagan Deep Singh"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;