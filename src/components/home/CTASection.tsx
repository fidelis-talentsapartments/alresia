import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary -z-10" />
      <div className="absolute inset-0 grid-pattern -z-10" />
      <div className="orb orb-1" style={{ opacity: 0.1 }} />
      <div className="orb orb-3" style={{ opacity: 0.08 }} />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal prompt */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary-foreground/10 bg-secondary-foreground/5 mb-8">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-secondary-foreground/70">
              Ready to ship something extraordinary?
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-secondary-foreground mb-6 tracking-tighter">
            Let's Build{" "}
            <span className="text-gradient">Together.</span>
          </h2>

          <p className="text-lg text-secondary-foreground/60 mb-10 max-w-xl mx-auto">
            Get a free project consultation and AI-generated scope document.
            No obligations, just insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/request-project">
              <Button variant="hero" size="xl" className="group">
                Request a Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="glass"
                size="xl"
                className="border-secondary-foreground/10 text-secondary-foreground hover:bg-secondary-foreground/10"
              >
                Schedule a Call
              </Button>
            </Link>
          </div>

          {/* Bottom code line */}
          <div className="mt-16 font-mono text-sm text-secondary-foreground/30">
            <span className="text-primary/50">$</span> alresia start --your-vision --our-expertise
          </div>
        </div>
      </div>
    </section>
  );
}
