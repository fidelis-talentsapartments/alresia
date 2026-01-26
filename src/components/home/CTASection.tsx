import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary -z-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">
              Ready to Start?
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-secondary-foreground mb-6">
            Let's Build Something{" "}
            <span className="text-primary">Extraordinary</span>
          </h2>

          <p className="text-lg text-secondary-foreground/80 mb-10 max-w-xl mx-auto">
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
                className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10"
              >
                Schedule a Call
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
