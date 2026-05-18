import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { services } from "@/data/services";

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Explore Alresia Technologies services across web development, mobile apps, AI solutions, UI/UX design, branding, cloud, and cybersecurity."
        path="/services"
        keywords={[
          "web development services",
          "mobile app development",
          "AI consulting",
          "UI/UX design",
          "cloud and devops",
          "cybersecurity services",
        ]}
      />
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 relative">
          <div className="absolute inset-0 grid-pattern -z-10" />
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-xs uppercase tracking-widest mb-6">
                ./services
              </span>
              <h1 className="text-4xl md:text-6xl font-black mt-3 mb-6 tracking-tighter">
                Full-Spectrum{" "}
                <span className="text-gradient">Creative & Tech</span> Services
              </h1>
              <p className="text-xl text-muted-foreground">
                From code to canvas, from algorithms to amplifiers. Everything
                you need under one roof.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-24">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm rounded-full bg-card border border-border/50 font-mono text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link to="/request-project">
                      <Button variant="hero" className="group">
                        Get Started
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>

                  <div
                    className={`relative rounded-2xl overflow-hidden gradient-border bg-gradient-to-br from-primary/10 to-chart-2/10 p-8 ${
                      index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                    }`}
                  >
                    <div className="aspect-video rounded-lg bg-card/50 backdrop-blur-sm border border-border/30 flex items-center justify-center">
                      <service.icon className="w-24 h-24 text-primary/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-secondary-foreground mb-4 tracking-tighter">
              Need a Custom Solution?
            </h2>
            <p className="text-secondary-foreground/60 mb-8 max-w-xl mx-auto">
              Don't see exactly what you need? Let's discuss your unique
              requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/request-project">
                <Button variant="hero" size="xl" className="group">
                  Request a Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="glass"
                  size="xl"
                  className="border-secondary-foreground/10 text-secondary-foreground hover:bg-secondary-foreground/10"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
