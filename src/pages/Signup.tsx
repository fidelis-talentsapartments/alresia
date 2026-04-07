import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { AuthCardWrapper } from "@/components/auth/AuthCardWrapper";
import alresiaLogo from "@/assets/alresia-logo.jpeg";
import { Seo } from "@/components/seo/Seo";

export default function Signup() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: formData.name },
      },
    });

    if (error) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Check your email",
        description:
          "We've sent you a verification link to confirm your account.",
      });
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) {
      toast({
        title: "Google sign in failed",
        description: error.message,
        variant: "destructive",
      });
      setIsGoogleLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setIsAppleLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("apple", {
      redirect_uri: window.location.origin,
    });
    if (error) {
      toast({
        title: "Apple sign in failed",
        description: error.message,
        variant: "destructive",
      });
      setIsAppleLoading(false);
    }
  };

  const features = [
    "Real-time project tracking & updates",
    "Direct communication with our team",
    "Milestone approvals & feedback tools",
    "Invoices & payment management",
  ];

  return (
    <>
      <Seo
        title="Create Account"
        description="Create your Alresia Technologies account to manage projects, approvals, and communication in one place."
        path="/signup"
        noindex
        nofollow
      />
      <Layout showFooter={false}>
        <section className="min-h-screen flex items-center justify-center pt-20 pb-12 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20 -z-10" />
          <div className="orb orb-1 -z-10" />
          <div className="orb orb-3 -z-10" />

          <div className="w-full max-w-5xl px-4 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - branding */}
            <div className="hidden lg:flex flex-col gap-8">
              <Link to="/" className="inline-flex items-center gap-3">
                <img
                  src={alresiaLogo}
                  alt="Alresia Technologies"
                  className="w-12 h-12 rounded-xl object-contain"
                />
                <span className="font-bold text-2xl text-foreground">
                  Alresia
                </span>
              </Link>

              <div>
                <h1 className="text-4xl font-bold mb-4">
                  Start building with <br />
                  <span className="text-gradient">Alresia today</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-md">
                  Join our platform to manage projects, track progress, and
                  bring your creative vision to life.
                </p>
              </div>

              <div className="space-y-4">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 animate-fade-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile logo */}
            <div className="text-center mb-4 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <img
                  src={alresiaLogo}
                  alt="Alresia Technologies"
                  className="w-10 h-10 rounded-lg object-contain"
                />
                <span className="font-semibold text-xl">Alresia</span>
              </Link>
              <h1 className="text-2xl font-bold mb-2">Create your account</h1>
              <p className="text-muted-foreground">
                Start managing your projects today
              </p>
            </div>

            {/* Right side - form */}
            <AuthCardWrapper
              icon={<Sparkles className="w-5 h-5 text-primary" />}
              title="Create Account"
              footer={
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
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
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="h-12 bg-background/60 border-border/60 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="h-12 bg-background/60 border-border/60 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
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
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreeTerms: checked as boolean,
                      }))
                    }
                    className="mt-0.5"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full h-12 text-base font-semibold mt-2"
                  disabled={isLoading || !formData.agreeTerms}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </form>
            </AuthCardWrapper>
          </div>
        </section>
      </Layout>
    </>
  );
}
