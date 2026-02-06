import { Star } from "lucide-react";

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
    content: "We've worked with many agencies, but Alresia's combination of technical excellence and client communication is exceptional. Our platform scaled to 1M users seamlessly.",
    author: "Emily Johnson",
    role: "Product Director, HealthPlus",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Client Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground">
            See what our clients say about working with Alresia
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="p-8 rounded-2xl bg-background border border-border hover:border-primary/30 transition-colors animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
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
