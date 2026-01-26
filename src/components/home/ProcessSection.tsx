import { MessageSquare, Brain, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Discovery",
    description: "Share your vision and requirements. We'll understand your goals, challenges, and timeline.",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI Planning",
    description: "Our AI analyzes your project and generates a detailed scope, tech stack, and phase breakdown.",
  },
  {
    icon: Code,
    step: "03",
    title: "Development",
    description: "Watch your project come to life with real-time updates, GitHub integration, and milestone approvals.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch",
    description: "We deploy, monitor, and support your application. Your success is our priority.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            From Idea to Launch in 4 Steps
          </h2>
          <p className="text-muted-foreground">
            A transparent, efficient process that keeps you in control at every stage
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-border hidden lg:block" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-6 px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mt-4 mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
