import { MessageSquare, Lightbulb, Layers, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Discovery",
    description: "Share your vision. We deep-dive into your goals, challenges, and timeline to understand exactly what you need.",
    accent: "from-primary/20 to-chart-1/20",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Strategy & Planning",
    description: "We craft a tailored roadmap — scope, timeline, budget, and tech stack — so there are zero surprises.",
    accent: "from-chart-1/20 to-chart-2/20",
  },
  {
    icon: Layers,
    step: "03",
    title: "Design & Build",
    description: "Watch your project come alive with real-time updates, milestone reviews, and complete creative control.",
    accent: "from-chart-2/20 to-primary/20",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch & Grow",
    description: "We deploy, monitor, and optimize. Your success is our metric — we stay with you post-launch.",
    accent: "from-primary/20 to-chart-1/20",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30 -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-xs uppercase tracking-widest mb-6">
            How We Work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            From <span className="text-gradient">idea</span> to{" "}
            <span className="text-gradient">reality</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A clear, collaborative process designed to deliver exceptional results
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="group relative animate-fade-up"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent z-0" />
              )}

              <div className="relative z-10 bento-item h-full flex flex-col items-start text-left">
                {/* Step number + icon */}
                <div className="flex items-center gap-4 mb-6 w-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.accent} border border-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors font-mono">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
