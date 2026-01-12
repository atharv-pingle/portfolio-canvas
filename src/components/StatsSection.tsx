import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const stats = [
    { value: "1+", label: "Years of Experience" },
    { value: "10+", label: "Projects Completed" },
    { value: "15+", label: "Technologies Mastered" },
  ];

  return (
    <section className="py-16 px-4 scroll-m-20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 hover:scale-105 transition-all duration-300 ${
                isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2 font-mono">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
