import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, Instagram } from "lucide-react";
import alresiaLogo from "@/assets/alresia-logo.jpeg";

const footerLinks = {
  development: [
    { name: "Web Development", href: "/services#web" },
    { name: "Mobile Apps", href: "/services#mobile" },
    { name: "AI Solutions", href: "/services#ai" },
    { name: "Cloud & DevOps", href: "/services#cloud" },
    { name: "Cybersecurity", href: "/services#security" },
  ],
  creative: [
    { name: "UI/UX Design", href: "/services#design" },
    { name: "Video Production", href: "/services#video" },
    { name: "Music Studio", href: "/services#music" },
    { name: "Graphic Design", href: "/services#graphic" },
    { name: "Branding", href: "/services#branding" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
  ],
};

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "Email", icon: Mail, href: "mailto:hello@alresia.com" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={alresiaLogo} alt="Alresia Technologies" className="w-10 h-10 rounded-lg object-contain bg-secondary-foreground/10" />
              <span className="font-bold text-xl">Alresia</span>
            </Link>
            <p className="text-secondary-foreground/50 mb-6 max-w-sm text-sm leading-relaxed">
              Engineering Intelligence. Inspiring Creativity.
              A full-spectrum technology & creative studio building the future.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-secondary-foreground/5 border border-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Development Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-secondary-foreground/40 mb-4">Development</h4>
            <ul className="space-y-2.5">
              {footerLinks.development.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Creative Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-secondary-foreground/40 mb-4">Creative</h4>
            <ul className="space-y-2.5">
              {footerLinks.creative.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-secondary-foreground/40 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-secondary-foreground/10 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-foreground/30 text-xs font-mono">
            © {new Date().getFullYear()} Alresia Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-secondary-foreground/30 text-xs font-mono hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-secondary-foreground/30 text-xs font-mono hover:text-primary transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
