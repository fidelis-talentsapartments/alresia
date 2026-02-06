import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink } from "lucide-react";

const featuredProjects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Web App",
    description: "A comprehensive financial management platform with real-time analytics and AI-powered insights.",
    tags: ["React", "Node.js", "PostgreSQL", "AI"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "HealthCare Mobile App",
    category: "Mobile",
    description: "Patient management and telemedicine platform serving 100k+ users daily.",
    tags: ["React Native", "Firebase", "HIPAA"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    category: "Full-Stack",
    description: "Scalable marketplace with 50+ integrated payment methods and global shipping.",
    tags: ["Next.js", "Stripe", "AWS"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
  },
];

export function ProjectsShowcase() {
  return (
    <section className="py-24 bg-card/50 relative">
      <div className="absolute inset-0 grid-pattern opacity-50 -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-xs uppercase tracking-widest mb-6">
              ./portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Featured Work
            </h2>
          </div>
          <Link to="/projects">
            <Button variant="outline" className="group border-border/50">
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Projects Grid - asymmetric */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Large featured */}
          <Link
            to={`/projects/${featuredProjects[0].id}`}
            className="group lg:col-span-7 relative rounded-2xl overflow-hidden hover-lift gradient-border"
          >
            <div className="aspect-[16/10] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent z-10" />
              <img
                src={featuredProjects[0].image}
                alt={featuredProjects[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <Badge variant="secondary" className="mb-3 font-mono text-xs">
                  {featuredProjects[0].category}
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-2">
                  {featuredProjects[0].title}
                </h3>
                <p className="text-secondary-foreground/80 mb-4 max-w-md">
                  {featuredProjects[0].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {featuredProjects[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-secondary-foreground/10 text-secondary-foreground font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>

          {/* Stacked smaller */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {featuredProjects.slice(1).map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group relative rounded-2xl overflow-hidden hover-lift gradient-border flex-1"
              >
                <div className="relative h-full min-h-[200px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <Badge variant="secondary" className="mb-2 font-mono text-xs">
                      {project.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-secondary-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-secondary-foreground/80 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center glow-primary">
                      <ExternalLink className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
