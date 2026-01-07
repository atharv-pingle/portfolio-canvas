import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Phone, Download } from "lucide-react";

const HeroSection = () => {
  const socialLinks = [
    { icon: Mail, href: "mailto:atharvpingle@gmail.com", label: "Email" },
    { icon: Linkedin, href: "https://linkedin.com/in/atharv-pingle", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/atharvpingle", label: "GitHub" },
    { icon: Phone, href: "tel:+918007035660", label: "Phone" },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Avatar - Shows first on mobile, second on desktop */}
          <div className="flex justify-center lg:justify-end opacity-0 animate-fade-in-right lg:order-2" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              {/* Decorative dashed border */}
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-primary/50 animate-swing" />

              {/* Avatar container */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-4 border-primary/20">
                <div className="text-6xl sm:text-8xl font-bold text-primary/30 font-mono">
                  AP
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-80 animate-pulse" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>

          {/* Text Content - Shows second on mobile, first on desktop */}
          <div className="space-y-6 lg:order-1">
            <div className="space-y-2 opacity-0 animate-fade-in-left" style={{ animationDelay: "0.1s" }}>
              <p className="text-muted-foreground text-sm tracking-wider uppercase font-mono">
                Software Engineer
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight font-mono">
                 Hello I'm{" "}
                  {/* Adding a block-level span forces the name to the next line */}
                    <span className="block text-primary">Atharv Pingle</span>
                  </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Cloud & Data Operations specialist with expertise in AWS, Python, and building
                scalable data pipelines. Passionate about automation and infrastructure optimization.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:scale-110 transition-all duration-300"
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300"
              >
                <a href="/Atharv_Pingle_Resume.pdf" download>
                  <Download size={18} className="mr-2" />
                  Download CV
                </a>
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="border-border text-foreground hover:border-primary hover:text-black hover:scale-105 transition-all duration-300"
              >
                Let's Talk
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
