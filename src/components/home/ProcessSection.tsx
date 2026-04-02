import { MessageSquare, Lightbulb, Layers, Rocket } from "lucide-react";

const steps = [
  { icon: MessageSquare, step: "01", title: "Discovery", description: "We deep-dive into your goals, challenges, and timeline to understand exactly what you need." },
  { icon: Lightbulb, step: "02", title: "Strategy", description: "A tailored roadmap — scope, timeline, budget, and tech stack — so there are zero surprises." },
  { icon: Layers, step: "03", title: "Build", description: "Watch your project come alive with milestone reviews and complete creative control." },
  { icon: Rocket, step: "04", title: "Launch", description: "We deploy, optimize, and stay with you post-launch. Your success is our metric." },
];

export function ProcessSection() {
  return (
    <section className="py-28 bg-accent/30">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Process</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-5">
            From <span className="italic">idea</span> to <span className="italic">reality</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A clear, collaborative process designed to deliver exceptional results.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="group animate-fade-up relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[70%] w-[60%] border-t border-dashed border-border/60" />
              )}

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-card border border-border/60 flex items-center justify-center mb-6 group-hover:border-primary/40 group-hover:shadow-md transition-all duration-500">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>

                <span className="text-xs text-primary font-medium uppercase tracking-widest mb-2 block">
                  Step {step.step}
                </span>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
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
