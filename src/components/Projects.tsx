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
      isWorkProject: true,
      links: {
        demo: "https://patronum.io",
        github: null
      }
    },
    {
      title: "Delhi Devs",
      description: "A thriving tech community platform connecting developers, fostering collaboration, and driving innovation in Delhi's tech ecosystem.",
      category: "Community",
      icon: Globe,
      technologies: ["Community Building", "Event Management", "Networking", "Mentorship"],
      highlights: [
        "Growing developer community in Delhi",
        "Regular tech events and meetups",
        "Knowledge sharing platform",
        "Career growth and networking opportunities"
      ],
      isHighlighted: true,
      links: {
        demo: "https://delhidevs.com",
        github: null
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
                  {project.links.demo && (
                    <Button 
                      size="sm" 
                      className={`${project.isHighlighted ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300' : ''} ${project.links.github ? 'flex-1' : 'w-full'}`}
                      onClick={() => window.open(project.links.demo, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {project.isHighlighted ? 'Visit Delhi Devs' : 'Live Demo'}
                    </Button>
                  )}
                  {project.links.github && !project.isWorkProject && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(project.links.github, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Source
                    </Button>
                  )}
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