import { ReactNode } from "react";
import { Shield } from "lucide-react";

interface AuthCardWrapperProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCardWrapper({ icon, title, children, footer }: AuthCardWrapperProps) {
  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <div className="relative group">
        {/* Subtle glow behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative p-8 sm:p-10 rounded-2xl bg-card border border-border/60 shadow-xl shadow-primary/5 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              {icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{title}</h2>
            </div>
          </div>

          {children}

          {/* Security badge */}
          <div className="mt-8 pt-6 border-t border-border/30 flex items-center justify-center gap-2 text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-xs">256-bit SSL encrypted</span>
          </div>
        </div>
      </div>

      {footer && (
        <div className="mt-6">{footer}</div>
      )}
    </div>
  );
}
