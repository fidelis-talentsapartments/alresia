import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { AuthCardWrapper } from "@/components/auth/AuthCardWrapper";
import alresiaLogo from "@/assets/alresia-logo.jpeg";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!" });
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (error) {
      toast({ title: "Google sign in failed", description: error.message, variant: "destructive" });
      setIsGoogleLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setIsAppleLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("apple", { redirect_uri: window.location.origin });
    if (error) {
      toast({ title: "Apple sign in failed", description: error.message, variant: "destructive" });
      setIsAppleLoading(false);
    }
  };

  return (
    <Layout showFooter={false}>
      <section className="min-h-screen flex items-center justify-center pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 -z-10" />
        <div className="orb orb-1 -z-10" />
        <div className="orb orb-2 -z-10" />

        <div className="w-full max-w-5xl px-4 grid lg:grid-cols-2 gap-12 items-center">
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

          {/* Mobile logo */}
          <div className="text-center mb-4 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <img src={alresiaLogo} alt="Alresia Technologies" className="w-10 h-10 rounded-lg object-contain" />
              <span className="font-semibold text-xl">Alresia</span>
            </Link>
            <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to access your dashboard</p>
          </div>

          {/* Right side - form */}
          <AuthCardWrapper
            icon={<Terminal className="w-5 h-5 text-primary" />}
            title="Sign In"
            footer={
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            }
          >
            <OAuthButtons
              onGoogleClick={handleGoogleSignIn}
              onAppleClick={handleAppleSignIn}
              isGoogleLoading={isGoogleLoading}
              isAppleLoading={isAppleLoading}
            />

            <AuthDivider text="or continue with email" />

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="h-12 bg-background/60 border-border/60 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    className="h-12 bg-background/60 border-border/60 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/50 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full h-12 text-base font-semibold mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </AuthCardWrapper>
        </div>
      </section>
    </Layout>
  );
}
