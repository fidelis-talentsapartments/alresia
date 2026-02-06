import { useTypewriter } from "@/hooks/useTypewriter";

const codeLines = [
  { prefix: "const", keyword: " alresia", operator: " = ", value: "{" },
  { prefix: "  services:", value: ' ["Web", "Mobile", "AI", "Video", "Music", "Branding"],' },
  { prefix: "  stack:", value: ' ["React", "Node.js", "Python", "Figma", "Premiere"],' },
  { prefix: "  clients:", value: " 50+," },
  { prefix: "  satisfaction:", value: ' "98%",' },
  { prefix: "  motto:", value: ' "Engineering Intelligence. Inspiring Creativity."' },
  { prefix: "", value: "};" },
];

export function TerminalBlock() {
  const { displayText } = useTypewriter({
    texts: [
      "npx alresia init --project my-app",
      "alresia deploy --production",
      "alresia generate --ai-scope",
      "alresia studio --render 4K",
    ],
    typingSpeed: 60,
    deletingSpeed: 40,
    pauseDuration: 2500,
  });

  return (
    <div className="w-full max-w-2xl mx-auto terminal-glow rounded-xl overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-border/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-chart-1/60" />
          <div className="w-3 h-3 rounded-full bg-primary/60" />
        </div>
        <span className="ml-2 text-xs text-muted-foreground font-mono">alresia.config.ts</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground/50 font-mono">TypeScript</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="bg-secondary/90 backdrop-blur-sm p-5">
        {/* Code Block */}
        <div className="font-mono text-sm leading-relaxed space-y-0.5 mb-4">
          {codeLines.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-6 text-muted-foreground/30 text-xs text-right mr-4 select-none">
                {i + 1}
              </span>
              <span>
                {line.prefix && (
                  <span className="text-chart-2">{line.prefix}</span>
                )}
                {line.keyword && (
                  <span className="text-chart-1">{line.keyword}</span>
                )}
                {line.operator && (
                  <span className="text-secondary-foreground/60">{line.operator}</span>
                )}
                <span className="text-secondary-foreground/80">{line.value}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Command Line */}
        <div className="border-t border-border/20 pt-3 mt-3">
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="text-primary">❯</span>
            <span className="text-secondary-foreground/90">{displayText}</span>
            <span className="w-2 h-5 bg-primary/80 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
