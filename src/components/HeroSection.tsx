import { Button } from "@/components/ui/button";
import { triggerHaptic, scrollElementIntoViewWithHaptics } from "@/lib/haptics";
import { Mail, Linkedin, Github, Phone, Download } from "lucide-react";
import TypingAnimation from "./ui/TypingAnimation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const RESUME_DRIVE_FILE_ID = "1r7yWc6GW73xnFZmZinWMVpTkYGYJodoY";
const RESUME_VIEW_URL = `https://drive.google.com/file/d/${RESUME_DRIVE_FILE_ID}/view`;
const RESUME_LEADS_STORAGE_KEY = "resume_download_leads";
const DEFAULT_RESUME_LEAD_ENDPOINT = "https://formspree.io/f/mojpderl";
const RESUME_LEAD_WEBHOOK_URL = import.meta.env.VITE_RESUME_LEAD_WEBHOOK_URL;
const RESUME_LEAD_ENDPOINT = RESUME_LEAD_WEBHOOK_URL || DEFAULT_RESUME_LEAD_ENDPOINT;

type ResumeLead = {
  name: string;
  email: string;
  createdAt: string;
};

const HeroSection = () => {
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const parseStoredLeads = () => {
    try {
      const rawLeads = localStorage.getItem(RESUME_LEADS_STORAGE_KEY);
      if (!rawLeads) return [] as ResumeLead[];
      const parsedLeads = JSON.parse(rawLeads);
      return Array.isArray(parsedLeads) ? (parsedLeads as ResumeLead[]) : [];
    } catch {
      return [] as ResumeLead[];
    }
  };

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const triggerResumeDownload = () => {
    window.open(RESUME_VIEW_URL, "_blank", "noopener,noreferrer");
  };

  const persistLead = async (lead: ResumeLead) => {
    const existingLeads = parseStoredLeads();
    localStorage.setItem(RESUME_LEADS_STORAGE_KEY, JSON.stringify([...existingLeads, lead]));

    const response = await fetch(RESUME_LEAD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      throw new Error("Failed to store lead");
    }
  };

  const handleResumeButtonClick = () => {
    triggerHaptic("success");
    setName("");
    setEmail("");
    setIsDownloadDialogOpen(true);
  };

  const handleResumeFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      toast({
        title: "Name required",
        description: "Please add your name before downloading.",
      });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      toast({
        title: "Valid email required",
        description: "Please enter a valid email address.",
      });
      return;
    }

    try {
      await persistLead({
        name: trimmedName,
        email: trimmedEmail,
        createdAt: new Date().toISOString(),
      });
    } catch {
      toast({
        title: "Could not save details",
        description: "Your resume will still open, but lead capture failed.",
      });
    }

    setIsDownloadDialogOpen(false);
    triggerResumeDownload();

    toast({
      title: "Download started",
      description: "Thanks. Your details were saved and the resume is opening now.",
    });
  };

  const socialLinks = [
    { icon: Mail, href: "mailto:atharvpingle@gmail.com", label: "Email" },
    { icon: Linkedin, href: "https://linkedin.com/in/atharv-pingle", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/atharv-pingle", label: "GitHub" },
    { icon: Phone, href: "tel:+918007035660", label: "Phone" },
  ];

  return (
    <section id="home" className="min-h-screen grid place-items-center px-4 pt-32 sm:pt-24 scroll-m-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-2 opacity-0 animate-fade-in-left" style={{ animationDelay: "0.1s" }}>
              <p className="text-muted-foreground text-sm tracking-wider uppercase font-mono">
                DevOps Engineer
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight font-mono">
                <TypingAnimation
                  text="Hello I'm Atharv Pingle"
                  enableHaptics
                  render={(text, cursor) => {
                    const preNameText = "Hello I'm ";
                    const preNameLength = preNameText.length;

                    const displayText = text;
                    const helloPart = displayText.slice(0, preNameLength);
                    const namePart = displayText.slice(preNameLength);

                    return (
                      <>
                        {helloPart}
                        {namePart && <br />}
                        <span className="text-primary">{namePart}</span>
                        {cursor}
                      </>
                    );
                  }}
                />
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Bridging the gap from data to deployment. 
                I build resilient Cloud infrastructure and automated pipelines that empower engineers to scale reliably. 
                Passionate about everything-as-code and peak optimization.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 justify-center lg:justify-start opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerHaptic()}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:scale-110 transition-all duration-300"
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              <Button
                onClick={handleResumeButtonClick}
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300"
              >
                <Download size={18} className="mr-2" />
                Download CV
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    scrollElementIntoViewWithHaptics(contactSection);
                  } else {
                    triggerHaptic();
                  }
                }}
                className="border-border text-foreground hover:border-primary hover:text-black hover:scale-105 transition-all duration-300"
              >
                Let's Talk
              </Button>
            </div>
          </div>

          {/* Right Content - Avatar */}
          <div className="order-first lg:order-last flex justify-center lg:justify-end opacity-0 animate-fade-in-right" style={{ animationDelay: "0.4s" }}>
            <div className="relative">
              
              {/* --- CHANGED: Used 'absolute -inset-4' to align exactly like your original code (but with a gap) --- */}
              <svg 
                className="absolute -inset-4 animate-swing text-primary" 
                viewBox="0 0 100 100" 
              >
                <circle 
                  cx="50" 
                  cy="50" 
                  r="48" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeDasharray="30 20" 
                  strokeLinecap="round"
                />
              </svg>

              {/* Avatar container */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full flex items-center justify-center overflow-hidden relative z-10">
                <img 
                  src="/placeholder.png" 
                  alt="Profile Picture" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-80 animate-pulse" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDownloadDialogOpen} onOpenChange={setIsDownloadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Resume</DialogTitle>
            <DialogDescription>
              Please add your name and email to continue.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleResumeFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="resume-user-name" className="text-sm text-muted-foreground">
                Name
              </label>
              <Input
                id="resume-user-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="resume-user-email" className="text-sm text-muted-foreground">
                Email
              </label>
              <Input
                id="resume-user-email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
                required
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full sm:w-auto">
                Save and Download
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
