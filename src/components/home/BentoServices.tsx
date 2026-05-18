import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

export function BentoServices() {
  return (
    <section className="py-28">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-primary font-mono font-medium text-sm uppercase tracking-widest mb-4">// Services</p>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
            Full-stack <span className="text-gradient">capabilities</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From code to canvas — development, design, and creative production under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to={service.href}
              className={`group relative p-5 rounded-xl border border-border/50 bg-card/40 hover:bg-card hover:border-primary/30 hover:shadow-md transition-all duration-400 animate-fade-up ${service.bentoSpan ?? ""}`}
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                  <service.icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/0 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link to="/services">
            <Button variant="outline" size="lg" className="group rounded-md font-semibold">
              Explore all services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
