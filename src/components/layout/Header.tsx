import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import alresiaLogo from "@/assets/alresia-logo.jpeg";

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
          ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border/40"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={alresiaLogo}
            alt="Alresia"
            className="w-9 h-9 rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-bold text-lg tracking-tight text-foreground">
            Alresia
          </span>
        </Link>

        {/* Desktop Navigation — centered, pill style */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-1 px-1.5 py-1.5 rounded-full bg-accent/60 backdrop-blur-sm border border-border/40">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-foreground text-background shadow-sm"
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
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Sign in
            </Button>
          </Link>
          <Link to="/request-project">
            <Button size="sm" className="rounded-full px-5">
              Start a project
            </Button>
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1">
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
        <div className="md:hidden mt-2 mx-4 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/50 p-5 animate-scale-in shadow-xl">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <hr className="border-border/50 my-3" />
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Sign in</Button>
            </Link>
            <Link to="/request-project" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full rounded-full">Start a project</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
