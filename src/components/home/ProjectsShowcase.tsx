import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const featuredProjects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Web App",
    description: "A comprehensive financial management platform with real-time analytics and AI-powered insights.",
    tags: ["React", "Node.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "HealthCare App",
    category: "Mobile",
    description: "Patient management and telemedicine platform serving 100k+ users.",
    tags: ["React Native", "Firebase"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    category: "Full-Stack",
    description: "Scalable marketplace with 50+ payment integrations and global shipping.",
    tags: ["Next.js", "Stripe", "AWS"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
  },
];

export function ProjectsShowcase() {
  return (
    <section className="py-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Portfolio</p>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">
              Selected <span className="italic">work</span>
            </h2>
          </div>
          <Link to="/projects">
            <Button variant="outline" className="group rounded-full">
              View all projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* Large featured */}
          <Link
            to={`/projects/${featuredProjects[0].id}`}
            className="group lg:col-span-7 relative rounded-2xl overflow-hidden hover-lift"
          >
            <div className="aspect-[16/10] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent z-10" />
              <img
                src={featuredProjects[0].image}
                alt={featuredProjects[0].title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <span className="text-xs uppercase tracking-widest text-background/60 mb-2 block">
                  {featuredProjects[0].category}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-background mb-2">
                  {featuredProjects[0].title}
                </h3>
                <p className="text-background/70 text-sm max-w-md mb-4">
                  {featuredProjects[0].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {featuredProjects[0].tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-background/10 text-background/80 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>

          {/* Stacked */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {featuredProjects.slice(1).map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group relative rounded-2xl overflow-hidden hover-lift flex-1"
              >
                <div className="relative h-full min-h-[220px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <span className="text-xs uppercase tracking-widest text-background/50 mb-1 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-background mb-1">
                      {project.title}
                    </h3>
                    <p className="text-background/60 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-background" />
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
