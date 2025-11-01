import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Code } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "COVID-Text-Extractor",
      description:
        "Automated tool to extract contact information from images and PDFs for COVID-19 crisis response.",
      category: "Open Source / Data Processing",
      icon: Code,
      technologies: ["Python", "OpenCV", "Pillow", "RegEx"],
      links: {
        demo: null,
        github: "https://github.com/gagangulyani/covid-text-extractor",
      },
    },
    {
      title: "Atypical - Stock Image Platform",
      description:
        "Responsive stock photo platform with social features and improved discovery via AI tagging.",
      category: "Web App / Community",
      icon: Code,
      technologies: ["Python", "Flask", "MongoDB", "JavaScript"],
      links: { demo: null, github: "https://github.com/gagangulyani/atypical" },
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Side Projects
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            Personal <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Highlighting two side projects built for passion and learning. Click
            to view details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project, idx) => (
            <Card key={idx} className="bg-card/50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <project.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </div>
                <Badge variant="secondary" className="text-xs w-fit">
                  {project.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.links.demo && (
                    <Button
                      size="sm"
                      onClick={() => window.open(project.links.demo, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </Button>
                  )}

                  {project.links.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(project.links.github, "_blank")
                      }
                    >
                      <Github className="w-4 h-4 mr-2" /> Source
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
