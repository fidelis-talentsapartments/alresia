import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, Award, Heart } from "lucide-react";
import { Seo } from "@/components/seo/Seo";

const values = [
  {
    icon: Target,
    title: "Client-Centric",
    description:
      "Your success is our success. We align every decision with your business goals.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We don't ship anything we wouldn't be proud to put our name on.",
  },
  {
    icon: Users,
    title: "Transparency",
    description: "Real-time updates, clear communication, no surprises.",
  },
  {
    icon: Heart,
    title: "Partnership",
    description:
      "We're not just vendors—we're your technical partners for the long haul.",
  },
];

const team = [
  {
    name: "Alex Morgan",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Jessica Liu",
    role: "Head of Engineering",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
  {
    name: "David Kim",
    role: "Lead Designer",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
  },
  {
    name: "Maria Santos",
    role: "Project Director",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
  },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Alresia Technologies"
        description="Learn how Alresia Technologies helps brands ship better digital products through transparent delivery, technical excellence, and long-term partnership."
        path="/about"
        keywords={[
          "about Alresia Technologies",
          "digital product studio",
          "software development partner",
          "transparent delivery",
        ]}
      />
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
                We're a Team of{" "}
                <span className="text-gradient">Builders & Dreamers</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Founded in 2020, Alresia Technologies has helped 50+ companies
                transform their ideas into scalable digital products. We combine
                technical excellence with a deep understanding of business
                needs.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Alresia Technologies was born from a simple frustration: why
                    is working with development agencies so opaque? Missed
                    deadlines, unclear progress, and scope creep were the norm.
                  </p>
                  <p>
                    We set out to build something different—a development
                    partner that treats transparency as a feature, not an
                    afterthought. Every project gets a dedicated dashboard,
                    every milestone is tracked, and AI helps us plan smarter
                    from day one.
                  </p>
                  <p>
                    Today, we're proud to serve clients from startups to Fortune
                    500 companies, delivering software that actually ships on
                    time and on budget.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 p-6 rounded-xl glass">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">
                    Projects Delivered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet the Team
              </h2>
              <p className="text-muted-foreground">
                The talented people behind Alresia Technologies
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={member.name}
                  className="group text-center animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative mb-4 rounded-2xl overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss how we can help bring your vision to life.
            </p>
            <Link to="/request-project">
              <Button variant="hero" size="xl" className="group">
                Start a Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}
