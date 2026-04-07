import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Quote,
  CheckCircle2,
  Calendar,
  Building2,
  Layers,
} from "lucide-react";
import { getProjectById, projects } from "@/data/projects";
import { Seo } from "@/components/seo/Seo";
import { siteConfig } from "@/lib/site";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(Number(id));

  if (!project) {
    return (
      <>
        <Seo
          title="Project Not Found"
          description="The requested project case study could not be found. Explore other projects from Alresia Technologies."
          path={`/projects/${id ?? "unknown"}`}
          noindex
          nofollow
        />
        <Layout>
          <section className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Project Not Found</h1>
            <p className="text-muted-foreground">
              The project you're looking for doesn't exist.
            </p>
            <Link to="/projects">
              <Button variant="hero">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </section>
        </Layout>
      </>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const relatedProjects = projects
    .filter((p) => p.category === project.category && p.id !== project.id)
    .slice(0, 2);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: `${siteConfig.url}/projects`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
          item: `${siteConfig.url}/projects/${project.id}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      url: `${siteConfig.url}/projects/${project.id}`,
      image: project.image,
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  ];

  return (
    <>
      <Seo
        title={`${project.title} Case Study`}
        description={project.description}
        path={`/projects/${project.id}`}
        image={project.image}
        imageAlt={project.title}
        type="article"
        keywords={[project.category, ...project.tags, project.client, "case study"]}
        structuredData={structuredData}
      />
      <Layout>
        {/* Hero */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10 -z-10" />
        <div className="orb orb-1 -z-10" />

        <div className="container mx-auto px-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-sm">
                  {project.category}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.year}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {project.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4 text-primary" />
                <span>Client:</span>
                <span className="font-medium text-foreground">
                  {project.client}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={project.image}
                alt={project.title}
                className="relative w-full aspect-video object-cover rounded-2xl border border-border/50 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      {(project.challenge || project.solution) && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {project.challenge && (
                <div className="p-8 rounded-2xl bg-card border border-border/50 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold">The Challenge</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-8 rounded-2xl bg-card border border-border/50 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Our Solution</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {project.results && project.results.length > 0 && (
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Impact
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3">
                Key Results
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {project.results.map((result, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-background border border-border/50 text-center space-y-3 hover:border-primary/30 transition-colors duration-300 animate-fade-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    {result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Gallery
              </span>
              <h2 className="text-3xl font-bold mt-3">Project Showcase</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative group rounded-2xl overflow-hidden border border-border/50"
                >
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                <Quote className="w-7 h-7 text-primary" />
              </div>
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-foreground italic">
                "{project.testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-foreground">
                  {project.testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {project.testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                More Work
              </span>
              <h2 className="text-3xl font-bold mt-3">Related Projects</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedProjects.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/projects/${rp.id}`}
                  className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/40 transition-all duration-300 hover-lift"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <ExternalLink className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">
                      {rp.category}
                    </Badge>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {rp.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {rp.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <section className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.id}`}
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <p className="text-xs uppercase tracking-wider">Previous</p>
                  <p className="font-medium text-sm">{prevProject.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.id}`}
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-right"
              >
                <div>
                  <p className="text-xs uppercase tracking-wider">Next</p>
                  <p className="font-medium text-sm">{nextProject.title}</p>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Something Like This?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Let's discuss how we can bring your vision to life with the same
            level of quality and attention to detail.
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
