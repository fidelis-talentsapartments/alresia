import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import alresiaLogo from "@/assets/alresia-logo.jpeg";

const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Web Development", href: "/services#web" },
    { name: "Mobile Apps", href: "/services#mobile" },
    { name: "AI Solutions", href: "/services#ai" },
    { name: "UI/UX Design", href: "/services#design" },
  ],
  resources: [
    { name: "Case Studies", href: "/projects" },
    { name: "Documentation", href: "/docs" },
    { name: "Support", href: "/support" },
    { name: "FAQ", href: "/faq" },
  ],
};

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Email", icon: Mail, href: "mailto:hello@alresia.com" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={alresiaLogo} alt="Alresia Technologies" className="w-10 h-10 rounded-lg object-contain bg-secondary-foreground/10" />
              <span className="font-semibold text-xl">Alresia</span>
            </Link>
            <p className="text-secondary-foreground/70 mb-6 max-w-sm">
              Engineering Intelligence. Inspiring Creativity. Building the Future.
              We craft software that drives business growth.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors"
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
          <p className="text-secondary-foreground/50 text-sm">
            © {new Date().getFullYear()} Alresia Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-secondary-foreground/50 text-sm hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-secondary-foreground/50 text-sm hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
