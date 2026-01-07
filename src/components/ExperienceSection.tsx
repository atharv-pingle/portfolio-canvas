import { Briefcase, GraduationCap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const PortfolioDataSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const experiences = [
    {
      company: "Skylex Technologies Pvt. Ltd.",
      role: "Software Engineer (Cloud & Data Operations)",
      period: "Oct 2022 – Sept 2023",
      location: "Pune, India",
      achievements: [
        "Supported cloud-based applications on AWS (EC2, IAM, VPC, S3) ensuring high availability [cite: 10]",
        "Monitored system logs and operational metrics using AWS CloudWatch [cite: 11]",
        "Automated operational and data-related tasks using Python and shell scripting [cite: 14]",
        "Worked with Docker and Kubernetes to support scalable services [cite: 15]",
      ],
    },
    {
      company: "DarkCode Pvt. Ltd.",
      role: "Project Manager",
      period: "Jun 2021 – Jan 2022",
      location: "Pune, India",
      achievements: [
        "Coordinated with developers to deliver over 10 business-ready web applications [cite: 20]",
        "Ensured project timelines and data accuracy in reporting [cite: 21]",
        "Gathered and documented technical client requirements [cite: 20]",
      ],
    },
  ];

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
    <section id="portfolio-info" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Experience Section */}
        <div>
          <div className={`text-center mb-12 ${isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-mono">
              Work <span className="text-primary">Experience</span>
            </h2>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Briefcase size={14} className="text-primary-foreground" />
                </div>
                <div className="bg-card border border-border rounded-lg p-6 hover:translate-x-1 transition-all">
                  <div className="flex flex-wrap justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold font-mono">{exp.role}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right text-muted-foreground text-sm">
                      <p>{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex gap-2">
                        <span className="text-primary">▹</span> {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <div className="text-center mb-12">
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

export default PortfolioDataSection;