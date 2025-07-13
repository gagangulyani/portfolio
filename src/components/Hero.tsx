import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Download, Music, Code, Coffee, Leaf, Zap } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import gaganPortrait from "@/assets/gagan-portrait.jpg";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const roles = ["Full Stack Developer", "Community Builder", "Music Producer"];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay with neon gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90 backdrop-blur-sm" />
      
      {/* Floating nature/neon elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-primary/20 rounded-full animate-float neon-glow">
        <div className="flex items-center justify-center w-full h-full">
          <Leaf className="w-8 h-8 text-primary" />
        </div>
      </div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-accent/20 rounded-full animate-float animate-pulse-glow" style={{ animationDelay: '2s' }}>
        <div className="flex items-center justify-center w-full h-full">
          <Zap className="w-6 h-6 text-accent" />
        </div>
      </div>
      <div className="absolute top-1/2 left-10 w-12 h-12 bg-primary/10 rounded-full animate-float neon-glow" style={{ animationDelay: '4s' }}>
        <div className="flex items-center justify-center w-full h-full">
          <Code className="w-5 h-5 text-primary" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm neon-glow border-primary/30">
                <Leaf className="w-4 h-4 mr-2 text-primary" />
                Available for Work
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Hey, I'm{" "}
                <span className="neon-text">
                  Gagan Deep
                </span>
              </h1>
              
              <div className="h-16 mb-6">
                <p className="text-xl lg:text-2xl text-muted-foreground transition-all duration-500">
                  <span className="text-primary font-semibold">{roles[currentRole]}</span> with 600K+ streams
                </p>
              </div>
              
              <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                Passionate Full Stack Developer at Pulse, Ex-SWE at JFT. I build amazing web applications, 
                foster communities, and create music that resonates with hundreds of thousands of listeners worldwide.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-neon hover:shadow-neon group transition-all duration-300"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Get In Touch
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group border-primary/50 hover:bg-primary/10 hover:shadow-glow"
              >
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Download CV
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group border-accent/50 hover:bg-accent/10"
                onClick={() => navigate('/music')}
              >
                <Music className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                My Music
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <Button variant="ghost" size="icon" className="neon-glow hover:bg-primary/20 transition-all duration-300">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="neon-glow hover:bg-primary/20 transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="neon-glow hover:bg-accent/20 transition-all duration-300"
                onClick={() => navigate('/music')}
              >
                <Music className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className={`flex-1 flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/40 shadow-2xl relative z-10 neon-glow">
                <img 
                  src={gaganPortrait} 
                  alt="Gagan Deep Singh"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Enhanced neon glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-neon opacity-30 blur-3xl animate-pulse-glow" />
              
              {/* Floating nature/tech icons */}
              <div className="absolute -top-8 -right-8 p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-lg animate-float neon-glow border border-primary/30">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -bottom-8 -left-8 p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-lg animate-float neon-glow border border-accent/30" style={{ animationDelay: '1s' }}>
                <Music className="w-6 h-6 text-accent" />
              </div>
              <div className="absolute top-1/2 -left-12 p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-lg animate-float neon-glow border border-primary/30" style={{ animationDelay: '2s' }}>
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute top-10 -left-8 p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-lg animate-float neon-glow border border-accent/30" style={{ animationDelay: '3s' }}>
                <Zap className="w-6 h-6 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;