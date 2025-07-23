import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProfessionalJourney = () => {
  const experiences = [
    {
      title: "Freelance (July 2025 – Present) – Full Stack Developer, Remote",
      description:
        "Developed a comprehensive fitness training platform connecting trainers, employers, and facilities with multi-role authentication and real-time notifications. Implemented job posting, booking management, dashboards, Google Maps integration, and automated invoice generation. Built RESTful APIs for jobs, applications, bookings, venues, and user management with role-based access control. Used Generative AI tools like Lovable.dev and Cursor.ai for rapid development.",
      tech: "Technologies: Next.js, React, TypeScript, PostgreSQL, Tailwind CSS, shadcn, Google Maps API",
    },
    {
      title: "Pulse Business Solutions Inc (pulsepro.ai) (Sep 2024 – Jun 2025) – Full Stack Developer, Noida, India (Hybrid)",
      description:
        "Delivered 120+ new features including advanced analytics dashboards and data export tools, significantly enhancing product capabilities and driving user engagement. Resolved 170+ critical bugs, contributed 900+ commits, and led 160+ code refactors to modernize legacy systems, optimizing performance and reducing technical debt.",
      tech: "Technologies: TypeScript, ReactJS, Redux, NodeJS, PostgreSQL, Git, Python, Django",
    },
    {
      title: "Freelance (Jan 2024 – Sep 2024) – Full Stack Developer, Remote",
      description:
        "Designed and implemented a Single Page Application for a Generative AI consultancy firm, increasing client lead conversion by 30%. Architected secure RESTful APIs for a Property Management platform with role-based access control and OTP authentication, achieving a 75% reduction in system errors. Engineered a Python script using Large Language Models for multilingual sentiment analysis, processing 100,000+ reviews with 80% accuracy rate.",
      tech: "Technologies: TypeScript, Bun, ElysiaJS, Drizzle ORM, MySQL, Python, ReactJS, Git",
    },
    {
      title: "Jellyfish Technologies (Nov 2022 – Dec 2023) – Software Engineer (promoted from Trainee), Noida, India",
      description:
        "Enhanced core functionalities in Patronum (Google Workspace manager) by streamlining file permissions, impacting over 50,000 user files across My Drive and Shared Drives. Implemented approval workflows and role management features, reducing administrative overhead by 40% for enterprise clients. Developed mobile device security settings module, protecting 10,000+ corporate devices across international deployments.",
      tech: "Technologies: JavaScript, NodeJS, SailsJS, EJS, jQuery, MongoDB, Redis, Google APIs, Git",
    },
  ];

  return (
    <section id="journey" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Experience
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A timeline of my career growth and key achievements in software development
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-5xl mx-auto">
          <Card className="bg-card/70 border-primary/10 shadow-lg">
            <CardContent className="pt-6">
              <div className="relative border-l-2 border-primary/30 pl-6 space-y-12">
                {experiences.map((exp, idx) => (
                  <div key={exp.title} className="relative group">
                    {/* Timeline dot with pulse effect */}
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[1.85rem] border-4 border-background group-hover:ring-4 ring-primary/20 transition-all" />
                    
                    {/* Content */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold gradient-text mb-3">{exp.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed text-base">
                        {exp.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.replace('Technologies: ', '').split(', ').map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs bg-primary/5 hover:bg-primary/10 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalJourney;