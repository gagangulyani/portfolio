import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Briefcase, LaptopMinimalCheck } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Code2, label: "Years Experience", value: "3+" },
  // Hide the exact LinkedIn connections number for privacy, show Stealth Project (Freelance) instead
    { icon: LaptopMinimalCheck, label: "Professional", value: "Vibe Coder" },
    { icon: Briefcase, label: "Projects Completed", value: "50+" },
  ];

  const skills = [
    "React",
    "Node.js",
    "TypeScript",
    "Python",
    "MongoDB",
    "Express",
    "Next.js",
    "TailwindCSS",
    "Docker",
    "BunJS",
    "Google Workspace APIs",
  ];

  // No experiences array needed after removal of Professional Journey section

  return (
    <section id="about" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            About Me
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Building Digital <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Full Stack Developer with 3+ years of experience crafting scalable
            web applications and optimizing system performance. Proven track
            record of implementing 120+ features and resolving 170+ critical
            bugs.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="bg-card/70 border-primary/10 shadow-lg transform hover:scale-105 transition-transform"
            >
              <CardContent className="flex flex-col items-center justify-center py-6">
                <stat.icon className="w-10 h-10 text-primary mb-3" />
                <div className="text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/70 border-primary/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold gradient-text text-center">
                Skills & Technologies
              </CardTitle>
              <CardDescription className="text-center">
                Core technologies I work with
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-4 py-2 text-sm hover:bg-primary/20 transition-all cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
