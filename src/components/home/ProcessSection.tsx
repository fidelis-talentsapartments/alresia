import { MessageSquare, Brain, Code, Rocket, GitBranch } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Discovery",
    description: "Share your vision. We deep-dive into your goals, challenges, and timeline.",
    tag: "git init",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Planning",
    description: "Our AI generates a detailed scope, tech stack, and phase breakdown.",
    tag: "git branch feature/plan",
  },
  {
    icon: Code,
    step: "03",
    title: "Build & Create",
    description: "Watch it come alive — real-time updates, GitHub integration, milestone approvals.",
    tag: "git commit -m 'ship it'",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch & Scale",
    description: "Deploy, monitor, and grow. Your success is our metric.",
    tag: "git push origin main",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-50 -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-xs uppercase tracking-widest mb-6">
            ./process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            From <span className="font-mono text-primary">git init</span> to{" "}
            <span className="font-mono text-primary">production</span>
          </h2>
          <p className="text-muted-foreground">
            A transparent, git-like process that keeps you in control
          </p>
        </div>

        {/* Steps with vertical line */}
        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-chart-2/30 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative flex gap-6 md:gap-8 animate-fade-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Git dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-card border border-border/50 flex items-center justify-center hover-glow transition-all">
                    <step.icon className="w-7 h-7 md:w-10 md:h-10 text-primary" />
                  </div>
                  {/* Dot on the line */}
                  <div className="hidden sm:block absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[calc(50%-0.5px)] w-3 h-3 rounded-full bg-primary border-2 border-background" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-2 md:pt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-primary font-mono text-sm font-bold">{step.step}</span>
                    <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground font-mono text-xs">
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
