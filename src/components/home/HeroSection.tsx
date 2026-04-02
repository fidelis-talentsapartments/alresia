import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center pt-24 pb-16">
      {/* Subtle warm gradient bg */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex justify-center mb-10 animate-fade-up">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-border/60 bg-card/50">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Technology & Creative Studio
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-10 animate-fade-up" style={{ animationDelay: "0.08s" }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-bold leading-[1.05] tracking-tight">
              We craft digital
              <br />
              <span className="text-gradient italic">experiences</span> that
              <br />
              move people
            </h1>
          </div>

          {/* Subheadline */}
          <p
            className="text-center text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 animate-fade-up leading-relaxed"
            style={{ animationDelay: "0.16s" }}
          >
            Software, design, video, music & AI — a full-spectrum studio
            building the future, one project at a time.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-up"
            style={{ animationDelay: "0.24s" }}
          >
            <Link to="/request-project">
              <Button size="xl" className="group rounded-full px-8">
                Start your project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="xl" className="rounded-full px-8">
                View our work
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.32s" }}
          >
            {[
              { value: "50+", label: "Projects delivered" },
              { value: "98%", label: "Client satisfaction" },
              { value: "12+", label: "Creative services" },
              { value: "24/7", label: "Support available" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">
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
