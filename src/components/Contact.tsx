import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Music, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      label: "Available",
      value: "Mon - Fri, 9AM - 6PM IST",
      href: "#"
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
    {
      icon: Music,
      label: "Music",
      href: "#",
      color: "hover:text-green-500"
    },
    {
      icon: Coffee,
      label: "Buy me a coffee",
      href: "#",
      color: "hover:text-yellow-500"
    }
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
    <section id="contact" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Get In Touch
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to collaborate? Reach out directly via email or connect with me on social platforms!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{info.label}</div>
                      <div className="text-muted-foreground">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 bg-card/50 rounded-lg border border-primary/10 hover:border-primary/30 transition-all ${link.color}`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-bold mb-2">Quick Response</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  For urgent inquiries or business opportunities, feel free to reach out directly. 
                  I typically respond within a few hours during business days.
                </p>
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Direct Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;