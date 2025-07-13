import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Pulse",
      location: "Remote",
      period: "2023 - Present",
      description: "Leading development of modern web applications and automation solutions. Focus on user experience and scalable architecture.",
      highlights: [
        "Built responsive web applications using React and Node.js",
        "Implemented automated workflows and integrations",
        "Collaborated with cross-functional teams to deliver features",
        "Optimized application performance and user experience"
      ],
      technologies: ["React", "Node.js", "TypeScript", "MongoDB", "Express"]
    },
    {
      title: "Software Engineer",
      company: "JFT (Previous Role)",
      location: "Remote",
      period: "2022 - 2023",
      description: "Developed and maintained software solutions focusing on automation and user productivity tools.",
      highlights: [
        "Worked on Patronum - Google Workspace automation suite",
        "Collaborated with diverse teams and international clients",
        "Implemented features that improved user productivity",
        "Gained experience in enterprise software development"
      ],
      technologies: ["JavaScript", "Google APIs", "React", "Python", "Cloud Services"]
    },
    {
      title: "Music Producer & Content Creator",
      company: "Independent",
      location: "Global",
      period: "2020 - Present",
      description: "Created and produced music content that reached over 600K streams across platforms including collaborations with artists like Khamsin.",
      highlights: [
        "Achieved 600K+ streams on YouTube and Spotify",
        "Collaborated with multiple artists and creators",
        "Built and engaged with a global audience",
        "Managed full production pipeline from creation to distribution"
      ],
      technologies: ["Audio Production", "Content Strategy", "Digital Marketing", "Collaboration"]
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Experience
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From software engineering to music production, here's my professional story
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="card-hover bg-card/50 backdrop-blur-sm border-primary/10">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl gradient-text">{exp.title}</CardTitle>
                    <div className="flex items-center gap-2 text-lg font-semibold text-foreground mt-2">
                      <span>{exp.company}</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:items-end gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
                
                <div>
                  <h4 className="font-semibold mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Technologies & Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;