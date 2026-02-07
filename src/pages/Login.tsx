import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import alresiaLogo from "@/assets/alresia-logo.jpeg";

export default function Login() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Login functionality",
      description: "Backend authentication will be enabled with Cloud integration.",
    });

    setIsLoading(false);
  };

  return (
    <Layout showFooter={false}>
      <section className="min-h-screen flex items-center justify-center pt-20 pb-12 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern opacity-20 -z-10" />
        <div className="orb orb-1 -z-10" />
        <div className="orb orb-2 -z-10" />

        <div className="w-full max-w-5xl px-4 grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - branding */}
          <div className="hidden lg:flex flex-col gap-8">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={alresiaLogo} alt="Alresia Technologies" className="w-12 h-12 rounded-xl object-contain" />
              <span className="font-bold text-2xl text-foreground">Alresia</span>
            </Link>

            <div>
              <h1 className="text-4xl font-bold mb-4">
                Welcome back to <br />
                <span className="text-gradient">your workspace</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-md">
                Access your projects, track progress, and collaborate with our team — all in one place.
              </p>
            </div>

            {/* Terminal-style decoration */}
            <div className="rounded-xl bg-secondary/80 border border-border/50 p-4 font-mono text-sm terminal-glow max-w-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-chart-1/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
              </div>
              <div className="space-y-1 text-muted-foreground">
                <p><span className="text-primary">$</span> alresia auth login</p>
                <p className="text-chart-1">✓ Credentials verified</p>
                <p className="text-chart-2">✓ Session established</p>
                <p><span className="text-primary">$</span> <span className="animate-pulse">_</span></p>
              </div>
            </div>
          </div>

          {/* Right side - form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* Mobile logo */}
            <div className="text-center mb-8 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <img src={alresiaLogo} alt="Alresia Technologies" className="w-10 h-10 rounded-lg object-contain" />
                <span className="font-semibold text-xl">Alresia</span>
              </Link>
              <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
              <p className="text-muted-foreground">
                Sign in to access your dashboard
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50 glow-border">
              <div className="hidden lg:flex items-center gap-2 mb-6">
                <Terminal className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Sign In</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="bg-background/50 border-border/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, password: e.target.value }))
                      }
                      className="bg-background/50 border-border/50"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card/80 px-3 text-muted-foreground text-xs">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" className="bg-background/50 border-border/50">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button" className="bg-background/50 border-border/50">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
              </div>
            </div>

            <p className="text-center mt-6 text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
