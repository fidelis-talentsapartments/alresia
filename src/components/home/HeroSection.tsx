import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";

const codeLines = [
  '$ alresia init --project "your-vision"',
  "→ Scaffolding infrastructure...",
  "→ Deploying to production...",
  "✓ Project live at alresia.com",
];

export function HeroSection() {
  const typedText = useTypewriter(codeLines, 50, 2000);

  return (
    <section className="relative min-h-[100vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Grid pattern bg */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-20 left-10 w-[30%] h-[30%] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex justify-center mb-8 animate-fade-up">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm font-medium text-primary font-mono">
                Engineering Intelligence. Inspiring Creativity.
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-8 animate-fade-up" style={{ animationDelay: "0.08s" }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold leading-[1.05] tracking-tight">
              We build the
              <br />
              <span className="text-gradient">software</span> that
              <br />
              powers your future
            </h1>
          </div>

          {/* Subheadline */}
          <p
            className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up leading-relaxed"
            style={{ animationDelay: "0.16s" }}
          >
            Full-stack development, AI solutions, cloud infrastructure, design & creative production — one team, zero friction.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-up"
            style={{ animationDelay: "0.24s" }}
          >
            <Link to="/request-project">
              <Button size="xl" className="group rounded-full px-8 font-semibold">
                Start your project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="xl" className="rounded-full px-8 font-semibold">
                View our work
              </Button>
            </Link>
          </div>

          {/* Terminal block */}
          <div
            className="max-w-2xl mx-auto animate-fade-up mb-16"
            style={{ animationDelay: "0.32s" }}
          >
            <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden shadow-lg">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40 bg-accent/40">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-primary/40" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">terminal</span>
              </div>
              <div className="p-5 font-mono text-sm leading-relaxed">
                {typedText.map((line, i) => (
                  <div key={i} className={`${line.startsWith("✓") ? "text-primary" : line.startsWith("→") ? "text-muted-foreground" : "text-foreground"}`}>
                    {line}
                  </div>
                ))}
                <span className="inline-block w-2 h-4 bg-primary animate-blink" />
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { value: "50+", label: "Projects shipped" },
              { value: "98%", label: "Client satisfaction" },
              { value: "12+", label: "Services offered" },
              { value: "24/7", label: "Support & monitoring" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-foreground mb-1 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}