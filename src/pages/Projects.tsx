import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

const categories = ["All", "Web", "Mobile", "AI", "Design"];

const projects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Web",
    description: "A comprehensive financial management platform with real-time analytics and AI-powered insights for enterprise clients.",
    tags: ["React", "Node.js", "PostgreSQL", "AI"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    featured: true,
    client: "Fortune 500 Bank",
    year: "2024",
  },
  {
    id: 2,
    title: "HealthCare Mobile App",
    category: "Mobile",
    description: "Patient management and telemedicine platform serving 100k+ users daily with HIPAA compliance.",
    tags: ["React Native", "Firebase", "HIPAA"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    client: "HealthPlus",
    year: "2024",
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    category: "Web",
    description: "Scalable marketplace with 50+ integrated payment methods and global shipping capabilities.",
    tags: ["Next.js", "Stripe", "AWS"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
    client: "RetailMax",
    year: "2023",
  },
  {
    id: 4,
    title: "AI Customer Service Bot",
    category: "AI",
    description: "Intelligent chatbot handling 80% of customer inquiries with natural language understanding.",
    tags: ["Python", "GPT-4", "LangChain"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop",
    client: "TelecomGiant",
    year: "2024",
  },
  {
    id: 5,
    title: "SaaS Analytics Dashboard",
    category: "Design",
    description: "Complete design system and UI overhaul for a B2B analytics platform, improving UX metrics by 40%.",
    tags: ["Figma", "Design System", "React"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    client: "DataInsights",
    year: "2023",
  },
  {
    id: 6,
    title: "Logistics Tracking App",
    category: "Mobile",
    description: "Real-time fleet tracking and delivery management for a national logistics company.",
    tags: ["Flutter", "Google Maps", "IoT"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
    client: "FastShip",
    year: "2023",
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
              Projects That{" "}
              <span className="text-gradient">Drive Results</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore our portfolio of successful projects across industries.
              Each one represents a partnership built on trust and delivered with excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "ghost"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover-lift animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{project.category}</Badge>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md bg-background border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Be Our Next Success Story?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss your project and see how we can help you achieve your goals.
          </p>
          <Link to="/request-project">
            <Button variant="hero" size="xl" className="group">
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
