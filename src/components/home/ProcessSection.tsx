import { MessageSquare, Lightbulb, Layers, Rocket } from "lucide-react";

const steps = [
  { icon: MessageSquare, step: "01", title: "Discovery", description: "Deep-dive into your goals, constraints, and technical requirements." },
  { icon: Lightbulb, step: "02", title: "Architecture", description: "System design, tech stack selection, and a detailed project roadmap." },
  { icon: Layers, step: "03", title: "Build & Ship", description: "Agile sprints with milestone reviews. Track progress in your dashboard." },
  { icon: Rocket, step: "04", title: "Launch & Scale", description: "Deploy, monitor, and iterate. We stay on for support and optimization." },
];

export function ProcessSection() {
  return (
    <section className="py-28 bg-accent/30">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <p className="text-primary font-mono font-medium text-sm uppercase tracking-widest mb-4">// Process</p>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
            How we <span className="text-gradient">ship</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A proven workflow designed for speed, quality, and transparency.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="group animate-fade-up relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[70%] w-[60%] border-t border-dashed border-primary/20" />
              )}

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-card border border-border/60 flex items-center justify-center mb-6 group-hover:border-primary/40 group-hover:shadow-md transition-all duration-500">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>

                <span className="text-xs text-primary font-mono font-semibold uppercase tracking-widest mb-2 block">
                  {step.step}
                </span>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}