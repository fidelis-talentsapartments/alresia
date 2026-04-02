import {
  Globe, Smartphone, Brain, Palette, Video, Music,
  Camera, Brush, Megaphone, Server, Shield, Code,
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
    <section className="py-6 border-y border-border/40 overflow-hidden">
      <div className="marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-content" aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <div
                key={`${copy}-${i}`}
                className="flex items-center gap-2.5 px-5 py-2 whitespace-nowrap"
              >
                <item.icon className="w-4 h-4 text-primary/70" />
                <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                <span className="text-border/80 ml-4">·</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
