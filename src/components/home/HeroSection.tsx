import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import { TechGlobe } from "./TechGlobe";

const codeLines = [
  '$ alresia init --project "your-vision"',
  "→ Scaffolding infrastructure...",
  "→ Deploying to production...",
  "✓ Project live at alresia.com",
];

function useTerminalLines(lines: string[], charSpeed = 30, lineDelay = 800) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    if (currentChar === 0 && currentLine > 0) {
      const timeout = setTimeout(() => setCurrentChar(1), lineDelay);
      return () => clearTimeout(timeout);
    }

    const fullLine = lines[currentLine];
    if (currentChar <= fullLine.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => {
          const copy = [...prev];
          copy[currentLine] = fullLine.substring(0, currentChar);
          return copy;
        });
        if (currentChar === fullLine.length) {
          setCurrentLine((l) => l + 1);
          setCurrentChar(0);
        } else {
          setCurrentChar((c) => c + 1);
        }
      }, charSpeed);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar, lines, charSpeed, lineDelay]);

  useEffect(() => {
    setVisibleLines([""]);
  }, []);

  return visibleLines;
}

export function HeroSection() {
  const typedLines = useTerminalLines(codeLines);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Grid pattern bg */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-20 left-10 w-[30%] h-[30%] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px]">
          {/* Left — Content */}
          <div className="max-w-xl flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex mb-6 animate-fade-up">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
                <Terminal className="w-3.5 h-3.5 text-primary" />
                <span className="text-sm font-medium text-primary font-mono">
                  Engineering Intelligence. Inspiring Creativity.
                </span>
              </div>
            </div>

            {/* Headline */}
            <div className="mb-6 animate-fade-up" style={{ animationDelay: "0.08s" }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.08] tracking-tight">
                We build the
                <br />
                <span className="text-gradient">software</span> that
                <br />
                powers your future
              </h1>
            </div>

            {/* Subheadline */}
            <p
              className="text-base md:text-lg text-muted-foreground max-w-lg mb-8 animate-fade-up leading-relaxed"
              style={{ animationDelay: "0.16s" }}
            >
              Full-stack development, AI solutions, cloud infrastructure, design &
              creative production — one team, zero friction.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-start gap-4 mb-10 animate-fade-up"
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
              className="max-w-md animate-fade-up"
              style={{ animationDelay: "0.32s" }}
            >
              <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden shadow-lg">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-border/40 bg-accent/40">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">
                    terminal
                  </span>
                </div>
                <div className="p-4 font-mono text-xs leading-relaxed">
                  {typedLines.map((line, i) => (
                    <div
                      key={i}
                      className={`${
                        line.startsWith("✓")
                          ? "text-primary"
                          : line.startsWith("→")
                          ? "text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                  <span className="inline-block w-2 h-4 bg-primary animate-blink" />
                </div>
              </div>
            </div>
          </div>

          {/* Right — Globe */}
          <div className="hidden lg:flex items-center justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <TechGlobe />
          </div>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-16 animate-fade-up"
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
    </section>
  );
}
