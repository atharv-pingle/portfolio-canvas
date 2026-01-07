import { Mail, Linkedin, Github, Phone, MapPin, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "atharvpingle@gmail.com",
      href: "mailto:atharvpingle@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8007035660",
      href: "tel:+918007035660",
    },
    {
      icon: Calendar,
      label: "Schedule",
      value: "Book a meeting on Calendly",
      href: "https://calendly.com/atharv-pingle",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/atharv-pingle",
      href: "https://linkedin.com/in/atharv-pingle",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/atharv-pingle",
      href: "https://github.com/atharv-pingle",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Pune, India",
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 ${isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-mono">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, projects, or just having a chat about technology.
          </p>
        </div>

        {/* This grid will now show 6 blocks (3 per row on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.href || undefined}
              target={item.href?.startsWith("http") ? "_blank" : undefined}
              rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 hover:scale-[1.02] transition-all duration-300 group ${
                item.href ? "cursor-pointer" : "cursor-default"
              } ${isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-foreground font-medium mb-1 font-mono">{item.label}</h3>
              <p className="text-muted-foreground text-sm break-all">{item.value}</p>
            </a>
          ))}
        </div>

        <div className={`text-center mt-12 ${isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.8s" }}>
          <p className="text-muted-foreground text-lg">
            Let's work together and build something amazing!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;