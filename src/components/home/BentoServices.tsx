import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Smartphone,
  Brain,
  Palette,
  Video,
  Camera,
  Music,
  Brush,
  Megaphone,
  Globe,
  Server,
  Shield,
} from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Modern web apps with React, Next.js, and scalable architecture.",
    href: "/services#web",
    size: "large" as const,
    accent: "from-primary/20 to-chart-2/10",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native & cross-platform for iOS and Android.",
    href: "/services#mobile",
    size: "small" as const,
    accent: "from-chart-1/20 to-primary/10",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Custom models, NLP, computer vision, and intelligent automation.",
    href: "/services#ai",
    size: "large" as const,
    accent: "from-chart-2/20 to-chart-1/10",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful interfaces people actually want to use.",
    href: "/services#design",
    size: "small" as const,
    accent: "from-primary/15 to-chart-2/10",
  },
  {
    icon: Video,
    title: "Video Production",
    description: "Professional editing, motion graphics, and post-production.",
    href: "/services#video",
    size: "small" as const,
    accent: "from-chart-1/15 to-primary/10",
  },
  {
    icon: Camera,
    title: "Video Coverage",
    description: "Events, corporate videos, documentaries, and live streams.",
    href: "/services#coverage",
    size: "small" as const,
    accent: "from-chart-2/15 to-chart-1/10",
  },
  {
    icon: Music,
    title: "Music & Audio Studio",
    description: "Recording, mixing, mastering, sound design, and original scores.",
    href: "/services#music",
    size: "large" as const,
    accent: "from-primary/20 to-chart-1/15",
  },
  {
    icon: Brush,
    title: "Graphic Design",
    description: "Visual identity, print, packaging, and digital assets.",
    href: "/services#graphic",
    size: "small" as const,
    accent: "from-chart-2/20 to-primary/10",
  },
  {
    icon: Globe,
    title: "Branding & Identity",
    description: "Strategy, logos, brand guidelines, and positioning.",
    href: "/services#branding",
    size: "small" as const,
    accent: "from-primary/15 to-chart-1/10",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "SEO, social media, paid ads, content strategy.",
    href: "/services#marketing",
    size: "small" as const,
    accent: "from-chart-1/20 to-chart-2/10",
  },
  {
    icon: Server,
    title: "Cloud & DevOps",
    description: "Infrastructure, CI/CD, and cloud optimization.",
    href: "/services#cloud",
    size: "small" as const,
    accent: "from-chart-2/15 to-primary/10",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Audits, compliance, penetration testing.",
    href: "/services#security",
    size: "small" as const,
    accent: "from-primary/20 to-chart-2/15",
  },
];

export function BentoServices() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-pattern -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-xs uppercase tracking-widest mb-6">
            ./services
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need.{" "}
            <span className="text-gradient">One Team.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From code to canvas, from algorithms to amplifiers — we do it all.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className={`group bento-item relative overflow-hidden animate-fade-up ${
                service.size === "large" ? "lg:col-span-2" : ""
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Accent gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
              />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="outline" size="lg" className="group border-border/50">
              Explore All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
