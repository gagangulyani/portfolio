import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Users, Music, Briefcase } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Code2, label: "Years Experience", value: "3+" },
    { icon: Music, label: "Music Streams", value: "600K+" },
    { icon: Users, label: "LinkedIn Connections", value: "500+" },
    { icon: Briefcase, label: "Projects Completed", value: "50+" }
  ];

  const skills = [
    "React", "Node.js", "TypeScript", "Python", "MongoDB", 
    "Express", "Next.js", "TailwindCSS", "Docker", "AWS",
    "Google Workspace APIs", "Music Production", "Community Building"
  ];

  return (
    <section id="about" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            About Me
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Crafting Digital <span className="gradient-text">Experiences</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a multi-faceted developer who bridges the gap between technology and creativity
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              As a Full Stack Developer at <span className="text-primary font-semibold">Pulse</span>, 
              I've had the opportunity to work on <span className="text-accent font-semibold">Patronum</span> - 
              an automation suite for Google Workspace that streamlines business processes for thousands of users.
            </p>
            
            <p className="text-lg leading-relaxed text-muted-foreground">
              My journey in tech started with curiosity and evolved into passion. I believe in the power of 
              community and have been actively building and nurturing tech communities. When I'm not coding, 
              you'll find me producing music that has gained over 600K streams across platforms.
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground">
              I specialize in creating scalable web applications, automating workflows, and bringing 
              creative ideas to life through code. My experience spans from frontend magic with React 
              to backend architecture with Node.js and cloud deployment.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="card-hover bg-card/50 backdrop-blur-sm border-primary/10">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">Technologies & Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-4 py-2 text-sm hover:bg-primary/20 transition-colors cursor-default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;