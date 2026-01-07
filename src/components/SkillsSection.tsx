import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const skillCategories = [
    {
      title: "Languages & Databases",
      skills: ["Python", "SQL", "MongoDB", "PostgreSQL", "DynamoDB"],
    },
    {
      title: "Cloud & DevOps",
      skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    },
    {
      title: "Tools & Technologies",
      skills: ["Git", "Linux", "Grafana", "CloudWatch", "S3"],
    },
    {
      title: "Concepts",
      skills: ["Data Analysis", "CI/CD", "ETL Pipelines", "Automation", "Agile"],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-card/50" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 ${isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-mono">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to build scalable solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:scale-[1.02] transition-all duration-300 ${
                isVisible ? "opacity-100 animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 font-mono">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm font-mono bg-secondary text-foreground rounded-full border border-border hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
