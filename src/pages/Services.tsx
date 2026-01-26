import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Smartphone, Brain, Palette, Server, Shield, CheckCircle2 } from "lucide-react";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks and scalable architecture.",
    features: [
      "React, Next.js, Vue.js applications",
      "Progressive Web Apps (PWA)",
      "E-commerce platforms",
      "Enterprise dashboards",
      "API development & integration",
      "Performance optimization",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "GraphQL"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    features: [
      "React Native applications",
      "Native iOS & Android apps",
      "Offline-first architecture",
      "Push notifications",
      "In-app purchases",
      "App Store optimization",
    ],
    technologies: ["React Native", "Swift", "Kotlin", "Flutter", "Firebase"],
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Intelligent automation, machine learning, and AI-powered features.",
    features: [
      "Custom AI model development",
      "Natural language processing",
      "Computer vision solutions",
      "Predictive analytics",
      "Chatbots & virtual assistants",
      "AI-powered recommendations",
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "LangChain", "Hugging Face"],
  },
  {
    id: "design",
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that users love and engage with.",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Visual design systems",
      "Interaction design",
      "Usability testing",
      "Design system creation",
    ],
    technologies: ["Figma", "Framer", "Adobe XD", "Principle", "Lottie"],
  },
  {
    id: "cloud",
    icon: Server,
    title: "Cloud & DevOps",
    description: "Scalable infrastructure, CI/CD pipelines, and cloud optimization.",
    features: [
      "Cloud architecture design",
      "CI/CD pipeline setup",
      "Container orchestration",
      "Monitoring & alerting",
      "Cost optimization",
      "Disaster recovery",
    ],
    technologies: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform"],
  },
  {
    id: "security",
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security audits and compliance implementation.",
    features: [
      "Security audits & penetration testing",
      "GDPR/HIPAA compliance",
      "SOC 2 certification prep",
      "Identity & access management",
      "Data encryption",
      "Security training",
    ],
    technologies: ["OAuth", "SSO", "WAF", "SIEM", "HashiCorp Vault"],
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
              End-to-End{" "}
              <span className="text-gradient">Development Services</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              From initial concept to deployment and beyond, we provide comprehensive 
              solutions tailored to your business needs.
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
                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm rounded-full bg-card border border-border"
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
                  className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-chart-2/20 p-8 ${
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <div className="aspect-video rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center">
                    <service.icon className="w-24 h-24 text-primary/30" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Don't see exactly what you need? Let's discuss your unique requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/request-project">
              <Button variant="hero" size="xl" className="group">
                Request a Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="xl">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
