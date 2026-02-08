interface AuthDividerProps {
  text: string;
}

export function AuthDivider({ text }: AuthDividerProps) {
  return (
    <div className="relative my-7">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border/40" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-card px-4 text-muted-foreground text-xs uppercase tracking-widest font-medium">
          {text}
        </span>
      </div>
    </div>
  );
}
