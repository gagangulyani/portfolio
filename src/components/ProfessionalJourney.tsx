import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

type Experience = {
  company: string;
  role: string;
  period: string;
  type: "employment" | "freelance";
  location: string;
  bullets: string[];
  tech: string;
};

const ProfessionalJourney: React.FC = () => {
  const experiences: Experience[] = [
    {
      company: "Private Dating Platform",
      role: "Full-Stack Developer",
      period: "Jul 2025 – Current",
      type: "freelance",
      location: "Remote",
      bullets: [
        "Led development of cross-platform dating product with core features (Welcome, Messages, Profile)",
        "Architected Jest test suite with 95%+ API coverage to prevent regressions",
        "Redesigned 6-step authentication wizard to fix OAuth redirect loops",
        "Implemented real-time notifications with Socket.IO",
        "Built gender-specific matching and unified premium subscription system",
        "Implemented content moderation with bilingual i18n (English/Spanish) using i18next",
        "Optimized mobile deployment with Capacitor (safe-area handling and cross-platform validation)",
        "Developed affiliate, subscription, referral and rewards systems with real-time premium updates",
        "Delivered 395+ commits, 60+ production improvements, comprehensive test coverage, and zero-downtime deployments",
      ],
      tech: "Technologies: React, TypeScript, Material-UI, Node.js, Express.js, Firebase, Firestore, Socket.IO, Jest, Capacitor",
    },
    {
      company: "Training Solutions",
      role: "Full-Stack Developer",
      period: "Jul 2025",
      type: "freelance",
      location: "Remote",
      bullets: [
        "Built comprehensive fitness training platform connecting trainers, employers, and facilities",
        "Implemented multi-role authentication and access control",
        "Developed job posting and application flows",
        "Built booking and session management system",
        "Integrated Google Maps for venue discovery",
        "Created dashboards for trainers, employers, and facilities",
        "Implemented automated invoicing system",
      ],
      tech: "Technologies: Next.js, React, TypeScript, Supabase, PostgreSQL, Tailwind CSS, Google Maps API",
    },
    {
      company: "Pulse Business Solutions Inc",
      role: "Full Stack Developer",
      period: "Sep 2024 – Jun 2025",
      type: "employment",
      location: "Noida, India (Hybrid)",
      bullets: [
        "Delivered 120+ new features including advanced analytics dashboards and data export tools",
        "Significantly enhanced product capabilities and drove user engagement",
        "Resolved 170+ critical bugs and reduced system errors",
        "Contributed 900+ commits to the codebase",
        "Led 160+ code refactors to modernize legacy systems",
        "Optimized performance and reduced technical debt",
      ],
      tech: "Technologies: TypeScript, ReactJS, Redux, NodeJS, PostgreSQL, Git, Python, Django",
    },
    {
      company: "Multiple Clients",
      role: "Full Stack Developer",
      period: "Jan 2024 – Sep 2024",
      type: "freelance",
      location: "Remote",
      bullets: [
        "Designed and implemented Single Page Application for Generative AI consultancy firm",
        "Increased client lead conversion by 30%",
        "Architected secure RESTful APIs for Property Management platform with role-based access control",
        "Implemented OTP authentication achieving 75% reduction in system errors",
        "Engineered Python script using Large Language Models for multilingual sentiment analysis",
        "Processed 100,000+ reviews with 80% accuracy rate",
      ],
      tech: "Technologies: TypeScript, Bun, ElysiaJS, Drizzle ORM, MySQL, Python, ReactJS, Git",
    },
    {
      company: "Jellyfish Technologies",
      role: "Software Engineer (promoted from Trainee)",
      period: "Nov 2022 – Dec 2023",
      type: "employment",
      location: "Noida, India",
      bullets: [
        "Enhanced core functionalities in Patronum (Google Workspace manager)",
        "Streamlined file permissions impacting 50,000+ user files across My Drive and Shared Drives",
        "Implemented approval workflows and role management features",
        "Reduced administrative overhead by 40% for enterprise clients",
        "Developed mobile device security settings module",
        "Protected 10,000+ corporate devices across international deployments",
      ],
      tech: "Technologies: JavaScript, NodeJS, SailsJS, EJS, jQuery, MongoDB, Redis, Google APIs, Git",
    },
  ];

  const [openItems, setOpenItems] = useState<string[]>([]);

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
            A timeline of my career growth and key achievements in software
            development
          </p>
        </div>

        {/* Experience Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={(v) => setOpenItems(v)}
            className="space-y-3"
          >
            {experiences.map((exp, idx) => (
              <AccordionItem value={`exp-${idx}`} key={idx}>
                <AccordionTrigger>
                  <div className="text-left w-full pr-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="font-semibold text-lg gradient-text">
                          {exp.company}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {exp.role}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap justify-end">
                        <Badge
                          variant={
                            exp.type === "freelance" ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {exp.type === "freelance"
                            ? "Freelance"
                            : "Employment"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground flex gap-4">
                      <span>{exp.period}</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <Card className="bg-card/50 border-0">
                    <CardContent className="pt-6">
                      {/* Bullet Points */}
                      <ul className="list-disc ml-6 mb-6 space-y-2">
                        {exp.bullets.map((bullet, i) => (
                          <li
                            key={i}
                            className="text-muted-foreground leading-relaxed text-base"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tech
                          .replace("Technologies: ", "")
                          .split(", ")
                          .map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-xs bg-primary/5 hover:bg-primary/10 transition-colors"
                            >
                              {tech}
                            </Badge>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalJourney;
