import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "Alresia transformed our vision into reality. Their technical planning saved us months. The project dashboard kept us informed every step of the way.",
    author: "Sarah Chen",
    role: "CEO, TechStart Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    content: "The transparency is unmatched. Tracking every phase of development and approving milestones gave us complete confidence in the process.",
    author: "Michael Rodriguez",
    role: "CTO, FinanceFlow",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    content: "Their combination of technical excellence and creative vision is exceptional. Our platform scaled from 10k to 500k users seamlessly.",
    author: "Emily Johnson",
    role: "Product Director, HealthPlus",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-28 bg-accent/30">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-primary font-mono font-medium text-sm uppercase tracking-widest mb-4">// Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
            Trusted by <span className="text-gradient">builders</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground/85 mb-7 leading-relaxed text-sm">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-9 h-9 rounded-lg object-cover"
                />
                <div>
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}