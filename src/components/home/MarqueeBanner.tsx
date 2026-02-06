import {
  Globe,
  Smartphone,
  Brain,
  Palette,
  Video,
  Music,
  Camera,
  Brush,
  Megaphone,
  Server,
  Shield,
  Code,
} from "lucide-react";

const items = [
  { icon: Code, label: "Web Development" },
  { icon: Smartphone, label: "Mobile Apps" },
  { icon: Brain, label: "AI Solutions" },
  { icon: Palette, label: "UI/UX Design" },
  { icon: Video, label: "Video Production" },
  { icon: Camera, label: "Video Coverage" },
  { icon: Music, label: "Music Studio" },
  { icon: Brush, label: "Graphic Design" },
  { icon: Megaphone, label: "Digital Marketing" },
  { icon: Globe, label: "Branding" },
  { icon: Server, label: "Cloud & DevOps" },
  { icon: Shield, label: "Cybersecurity" },
];

export function MarqueeBanner() {
  return (
    <section className="py-8 border-y border-border/50 overflow-hidden bg-card/50">
      <div className="marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-content" aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <div
                key={`${copy}-${i}`}
                className="flex items-center gap-3 px-6 py-2 rounded-full border border-border/50 bg-background/50 whitespace-nowrap hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-default"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">{item.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
