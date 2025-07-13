import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Play, Code, Workflow, Globe } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Patronum - Google Workspace Automation",
      description: "Enterprise automation suite for Google Workspace that streamlines business processes and improves productivity for thousands of users worldwide.",
      category: "Enterprise Software",
      icon: Workflow,
      technologies: ["React", "Node.js", "Google APIs", "TypeScript", "Cloud Functions"],
      highlights: [
        "Automated user management and provisioning",
        "Advanced workflow automation capabilities",
        "Real-time analytics and reporting",
        "Enterprise-grade security and compliance"
      ],
      links: {
        demo: "#",
        github: "#"
      }
    },
    {
      title: "Music Production Portfolio",
      description: "Created and produced music content reaching 600K+ streams across YouTube and Spotify, including collaborations with artists like Khamsin.",
      category: "Creative",
      icon: Play,
      technologies: ["Audio Production", "Digital Marketing", "Content Strategy", "Collaboration"],
      highlights: [
        "600K+ streams across platforms",
        "Successful artist collaborations",
        "Global audience engagement",
        "Professional music distribution"
      ],
      links: {
        demo: "#",
        github: "#"
      }
    },
    {
      title: "Developer Portfolio & Blog",
      description: "Modern, responsive portfolio website with integrated blog functionality, built with React and optimized for SEO and performance.",
      category: "Web Development",
      icon: Code,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "SEO Optimization"],
      highlights: [
        "Fully responsive design",
        "SEO-optimized blog system",
        "Modern animations and interactions",
        "Performance optimized"
      ],
      links: {
        demo: "#",
        github: "#"
      }
    },
    {
      title: "Community Building Platform",
      description: "Platform designed to foster and grow tech communities, providing tools for engagement, networking, and knowledge sharing.",
      category: "Community",
      icon: Globe,
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
      highlights: [
        "Real-time community interactions",
        "Event management system",
        "Networking and mentorship features",
        "Content sharing and collaboration tools"
      ],
      links: {
        demo: "#",
        github: "#"
      }
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Featured Work
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Latest <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work spanning web development, automation, and creative projects
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="card-hover bg-card/50 backdrop-blur-sm border-primary/10 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {project.category}
                      </Badge>
                      <CardTitle className="text-xl gradient-text group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                <div>
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Github className="w-4 h-4 mr-2" />
                    Source
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <Github className="w-5 h-5 mr-2" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;