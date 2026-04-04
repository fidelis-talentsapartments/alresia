import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Code, Smartphone, Brain, Palette, Video,
  Camera, Music, Brush, Megaphone, Globe, Server, Shield,
} from "lucide-react";

const services = [
  { icon: Code, title: "Web Development", description: "React, Next.js, full-stack apps with scalable architecture.", href: "/services#web", span: "md:col-span-2" },
  { icon: Smartphone, title: "Mobile Apps", description: "Native & cross-platform for iOS and Android.", href: "/services#mobile", span: "" },
  { icon: Brain, title: "AI & ML", description: "Custom models, NLP, computer vision, intelligent automation.", href: "/services#ai", span: "" },
  { icon: Palette, title: "UI/UX Design", description: "Interfaces people actually want to use.", href: "/services#design", span: "md:col-span-2" },
  { icon: Video, title: "Video Production", description: "Editing, motion graphics, and post-production.", href: "/services#video", span: "" },
  { icon: Camera, title: "Video Coverage", description: "Events, corporate, documentaries, live streams.", href: "/services#coverage", span: "" },
  { icon: Music, title: "Music & Audio", description: "Recording, mixing, mastering, sound design.", href: "/services#music", span: "md:col-span-2" },
  { icon: Brush, title: "Graphic Design", description: "Visual identity, print, packaging, digital assets.", href: "/services#graphic", span: "" },
  { icon: Globe, title: "Branding", description: "Strategy, logos, brand guidelines, positioning.", href: "/services#branding", span: "" },
  { icon: Megaphone, title: "Digital Marketing", description: "SEO, social media, paid ads, content strategy.", href: "/services#marketing", span: "" },
  { icon: Server, title: "Cloud & DevOps", description: "Infrastructure, CI/CD, cloud optimization.", href: "/services#cloud", span: "" },
  { icon: Shield, title: "Cybersecurity", description: "Audits, compliance, penetration testing.", href: "/services#security", span: "" },
];

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
              key={service.title}
              to={service.href}
              className={`group relative p-5 rounded-xl border border-border/50 bg-card/40 hover:bg-card hover:border-primary/30 hover:shadow-md transition-all duration-400 animate-fade-up ${service.span}`}
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
                    {service.description}
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