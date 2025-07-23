"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Github, Linkedin, Coffee } from "lucide-react";
import Link from "next/link";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "gagangulyanig@gmail.com",
      href: "mailto:gagangulyanig@gmail.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Saharanpur, Uttar Pradesh, India",
      href: "#",
    },
    {
      icon: Phone,
      label: "Available",
      value: "Mon - Fri, 9AM - 6PM IST",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/gagangulyani",
      color: "hover:text-foreground",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/gagan-gulyani",
      color: "hover:text-blue-500",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-secondary relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Get In Touch
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's create something exceptional together.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/10 shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Column - Contact Info */}
                <div className="md:col-span-5 space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 gradient-text">Let's Connect</h3>
                    <div className="space-y-6">
                      {contactInfo.map((info, index) => (
                        <Link
                          key={index}
                          href={info.href}
                          className="group flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-all duration-300"
                        >
                          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <info.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm text-muted-foreground">{info.label}</div>
                            <div className="font-semibold">{info.value}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Find Me On</h4>
                    <div className="flex gap-4">
                      {socialLinks.map((link, index) => (
                        <Link
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-all duration-300 ${link.color}`}
                        >
                          <link.icon className="w-5 h-5" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Card className="bg-gradient-primary/5 border-primary/10">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 text-sm">
                        <Coffee className="w-4 h-4 text-primary" />
                        <span className="font-medium">Available for freelance opportunities</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Quick Actions */}
                <div className="md:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 gradient-text">Quick Response</h3>
                    <p className="text-muted-foreground mb-6">
                      For urgent inquiries or exciting opportunities, reach out directly. I typically respond within a few
                      hours during business days.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button className="flex-1" size="lg">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                      <Button variant="outline" className="flex-1" size="lg">
                        <Phone className="w-4 h-4 mr-2" />
                        Schedule Call
                      </Button>
                    </div>
                  </div>

                  <Card className="bg-gradient-primary/5 border-primary/10">
                    <CardContent className="p-6">
                      <h4 className="font-bold mb-3">Currently Working On</h4>
                      <p className="text-muted-foreground text-sm">
                        Full Stack Development projects focusing on AI integration, real-time features, and scalable
                        architecture.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;