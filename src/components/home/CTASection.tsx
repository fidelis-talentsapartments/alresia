import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary -z-10" />
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-primary/8 blur-[120px] -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:48px_48px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-primary/20 bg-primary/5 mb-8">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-mono text-primary">ready to deploy</span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-secondary-foreground mb-8 leading-[1.08]">
            Let's build
            <br />
            something <span className="text-gradient">great</span>
          </h2>

          <p className="text-lg text-secondary-foreground/50 mb-12 max-w-lg mx-auto leading-relaxed">
            Get a free technical consultation. We'll scope your project,
            recommend the right stack, and ship it fast.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/request-project">
              <Button size="xl" className="group rounded-md px-10 font-semibold">
                Start your project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="xl"
                className="rounded-md px-10 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 font-semibold"
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