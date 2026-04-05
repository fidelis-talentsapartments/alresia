import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import alresiaLogo from "@/assets/alresia-logo.png";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-2 bg-background/80 backdrop-blur-2xl border-b border-primary/10 shadow-lg shadow-primary/5"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={alresiaLogo}
              alt="Alresia"
              className="relative w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-[15px] tracking-tight text-foreground leading-tight">
              Alresia
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-primary/70 leading-tight">
              Technologies
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-0.5 bg-muted/40 backdrop-blur-sm rounded-full px-1.5 py-1 border border-border/30">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                    isActive
                      ? "text-primary-foreground bg-primary shadow-md shadow-primary/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground font-medium text-[13px]">
              Sign in
            </Button>
          </Link>
          <Link to="/request-project">
            <Button size="sm" className="rounded-full px-5 font-semibold text-[13px] bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5 gap-2">
              Start a project
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1.5">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 rounded-2xl bg-card/95 backdrop-blur-2xl border border-border/30 p-5 animate-scale-in shadow-2xl shadow-primary/10">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.href
                    ? "text-primary-foreground bg-primary shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <hr className="border-border/30 my-3" />
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start font-medium">Sign in</Button>
            </Link>
            <Link to="/request-project" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full rounded-xl font-semibold gap-2">
                Start a project
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
