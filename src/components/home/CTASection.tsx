import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Warm gradient bg */}
      <div className="absolute inset-0 bg-foreground -z-10" />
      <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-6">
            Let's collaborate
          </p>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-background mb-8 leading-[1.1]">
            Ready to build
            <br />
            something <span className="italic">extraordinary?</span>
          </h2>

          <p className="text-lg text-background/50 mb-12 max-w-lg mx-auto leading-relaxed">
            Get a free project consultation. No obligations, just insights
            into how we can bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/request-project">
              <Button size="xl" className="group rounded-full px-10 bg-primary text-primary-foreground hover:bg-primary/90">
                Start your project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="xl"
                className="rounded-full px-10 border-background/20 text-background hover:bg-background/10"
              >
                Schedule a call
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
