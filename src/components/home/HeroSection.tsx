import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { TerminalBlock } from "./TerminalBlock";

const techBadges = [
  "React", "Node.js", "AI/ML", "Figma", "Premiere Pro", "Logic Pro",
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-pattern" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-primary">
                We build what others can't imagine
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
              <span className="block">Engineering</span>
              <span className="block text-gradient">Intelligence.</span>
              <span className="block text-muted-foreground/60 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-2">
                Inspiring Creativity.
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Software. Design. Video. Music. AI. We're a full-spectrum technology &
            creative studio building the future, one project at a time.
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-up" style={{ animationDelay: "0.25s" }}>
            {techBadges.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm text-xs font-mono text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors cursor-default"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/request-project">
              <Button variant="hero" size="xl" className="group">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="glass" size="xl">
                View Our Work
              </Button>
            </Link>
          </div>

          {/* Terminal */}
          <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <TerminalBlock />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: "0.5s" }}>
            {[
              { value: "50+", label: "Projects Shipped" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "12+", label: "Creative Services" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
