import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Smartphone, Brain, Palette, Server, Shield } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks and scalable architecture.",
    href: "/services#web",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    href: "/services#mobile",
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Intelligent automation, machine learning, and AI-powered features.",
    href: "/services#ai",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that users love and engage with.",
    href: "/services#design",
  },
  {
    icon: Server,
    title: "Cloud & DevOps",
    description: "Scalable infrastructure, CI/CD pipelines, and cloud optimization.",
    href: "/services#cloud",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security audits and compliance implementation.",
    href: "/services#security",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Full-Stack Development Services
          </h2>
          <p className="text-muted-foreground">
            End-to-end solutions tailored to your business needs. 
            From concept to deployment and beyond.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className="group p-6 rounded-xl bg-background border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="outline" size="lg" className="group">
              Explore All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
