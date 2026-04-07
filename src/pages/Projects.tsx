import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects, categories } from "@/data/projects";
import { Seo } from "@/components/seo/Seo";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Seo
        title="Projects"
        description="Browse case studies and selected work from Alresia Technologies across web, mobile, AI, and design engagements."
        path="/projects"
        keywords={[
          "case studies",
          "portfolio",
          "web projects",
          "mobile projects",
          "AI case studies",
        ]}
      />
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
                Each one represents a partnership built on trust and delivered
                with excellence.
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
                      <span className="text-sm text-muted-foreground">
                        {project.year}
                      </span>
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
            <h2 className="text-3xl font-bold mb-4">
              Ready to Be Our Next Success Story?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss your project and see how we can help you achieve
              your goals.
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
    </>
  );
}
