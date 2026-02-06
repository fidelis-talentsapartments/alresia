import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "Alresia transformed our vision into reality. Their AI-powered planning saved us months of back-and-forth. The project dashboard kept us informed every step of the way.",
    author: "Sarah Chen",
    role: "CEO, TechStart Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    content: "The transparency is unmatched. Being able to track every phase of development, see GitHub commits, and approve milestones gave us complete confidence in the process.",
    author: "Michael Rodriguez",
    role: "CTO, FinanceFlow",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    id: 3,
    content: "We've worked with many agencies, but Alresia's combination of technical excellence and creative vision is exceptional. Our platform scaled to 1M users seamlessly.",
    author: "Emily Johnson",
    role: "Product Director, HealthPlus",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="orb orb-2" style={{ opacity: 0.15 }} />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-xs uppercase tracking-widest mb-6">
            ./testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Trusted by{" "}
            <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-muted-foreground">
            Don't take our word for it — hear from our clients
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bento-item relative animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 mb-6 leading-relaxed text-sm">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
