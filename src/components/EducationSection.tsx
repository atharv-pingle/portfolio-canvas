import { GraduationCap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const EducationSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const education = [
    {
      institution: "Welingkar Institute of Management Development and Research",
      degree: "MBA (IT Project Management)",
      period: "Jan 2024 – May 2026",
      location: "Mumbai, India",
      info: "CGPA: 9.1",
    },
    {
      institution: "Bharati Vidyapeeth (IMED)",
      degree: "Bachelor of Computer Application",
      period: "Aug 2019 – Jun 2022",
      location: "Pune, India",
      info: "CGPA: 8.4",
    },
  ];

  return (
    <section id="education" className="py-20 px-4 scroll-m-20" ref={ref}>
      <div className="max-w-6xl mx-auto space-y-20">
        <div>
          <div className={`text-center mb-12 ${isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-mono">
              My <span className="text-primary">Education</span>
            </h2>
          </div>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <GraduationCap size={14} className="text-primary-foreground" />
                </div>
                <div className="bg-card border border-border rounded-lg p-6 hover:translate-x-1 transition-all">
                  <div className="flex flex-wrap justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold font-mono">{edu.degree}</h3>
                      <p className="text-primary font-medium">{edu.institution}</p>
                      <p className="text-muted-foreground text-sm mt-2 font-bold">{edu.info}</p>
                    </div>
                    <div className="text-right text-muted-foreground text-sm">
                      <p>{edu.period}</p>
                      <p>{edu.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
