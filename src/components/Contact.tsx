import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CalendlyButton } from "@/components/ui/calendly";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "gagangulyanig@gmail.com",
      href: "mailto:gagangulyanig@gmail.com"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Saharanpur, Uttar Pradesh, India",
      href: "#"
    },
    {
      icon: Phone,
      label: "Hours",
      value: "Mon - Fri, 9AM - 6PM IST",
      href: "#",
      component: CalendlyButton
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/gagangulyani",
      color: "hover:text-foreground"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/gagan-gulyani",
      color: "hover:text-blue-500"
    },
    // Buy me a coffee button hidden
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-gradient-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Get In Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Got a project in mind? Let's create something amazing together.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="group block"
              >
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:bg-card/80 hover:border-primary/30 transition-all duration-300 h-full cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors mb-4">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="font-medium text-xs sm:text-sm text-muted-foreground mb-2">{info.label}</div>
                    <div className="font-semibold text-sm sm:text-base line-clamp-2">{info.value}</div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-3 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-primary/5 rounded-lg hover:bg-primary/15 transition-all duration-300 ${link.color}`}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <a href="mailto:gagangulyanig@gmail.com">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </a>
            </Button>

            {/* Make Calendly CTA expand like the Send Email button (full width on mobile) */}
            <CalendlyButton className="w-full sm:w-auto" />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-primary/5 border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Coffee className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Available For</h4>
                    <p className="text-sm text-muted-foreground">
                      Freelance projects, full-time roles, and exciting opportunities
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary/5 border-primary/10">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Send className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Response Time</h4>
                    <p className="text-sm text-muted-foreground">
                      Usually within a few hours on business days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;