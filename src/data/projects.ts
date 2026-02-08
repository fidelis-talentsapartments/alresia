export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  featured?: boolean;
  client: string;
  year: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  gallery?: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Web",
    description:
      "A comprehensive financial management platform with real-time analytics and AI-powered insights for enterprise clients.",
    tags: ["React", "Node.js", "PostgreSQL", "AI"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    featured: true,
    client: "Fortune 500 Bank",
    year: "2024",
    challenge:
      "The client needed a unified dashboard to consolidate data from 12+ legacy systems, providing real-time visibility into financial metrics while meeting strict regulatory compliance requirements.",
    solution:
      "We built a modular React application with a microservices backend, implementing real-time data streaming via WebSockets and an AI-powered anomaly detection engine that processes millions of transactions daily.",
    results: [
      "60% reduction in report generation time",
      "99.99% uptime across 12 months",
      "$2.3M saved in operational costs annually",
      "40% faster decision-making for portfolio managers",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&auto=format&fit=crop",
    ],
    testimonial: {
      quote:
        "Alresia delivered beyond our expectations. The dashboard transformed how our teams interact with financial data.",
      author: "Sarah Chen",
      role: "VP of Technology",
    },
  },
  {
    id: 2,
    title: "HealthCare Mobile App",
    category: "Mobile",
    description:
      "Patient management and telemedicine platform serving 100k+ users daily with HIPAA compliance.",
    tags: ["React Native", "Firebase", "HIPAA"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    client: "HealthPlus",
    year: "2024",
    challenge:
      "HealthPlus needed a telemedicine solution that could handle high-volume patient interactions while maintaining strict HIPAA compliance and seamless video consultation quality.",
    solution:
      "We developed a cross-platform mobile app with end-to-end encryption, real-time video consultations, automated appointment scheduling, and integration with existing EHR systems.",
    results: [
      "100k+ daily active users",
      "4.8★ App Store rating",
      "35% reduction in no-show appointments",
      "Full HIPAA & SOC 2 compliance",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&auto=format&fit=crop",
    ],
    testimonial: {
      quote:
        "The app has fundamentally changed how we deliver care. Patient satisfaction scores are at an all-time high.",
      author: "Dr. Michael Torres",
      role: "Chief Medical Officer",
    },
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    category: "Web",
    description:
      "Scalable marketplace with 50+ integrated payment methods and global shipping capabilities.",
    tags: ["Next.js", "Stripe", "AWS"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
    client: "RetailMax",
    year: "2023",
    challenge:
      "RetailMax required a platform that could handle Black Friday-level traffic spikes while supporting 50+ payment methods across 30 countries.",
    solution:
      "We architected a serverless e-commerce platform on AWS with auto-scaling, a custom payment orchestration layer, and an AI-driven recommendation engine.",
    results: [
      "300% increase in conversion rate",
      "50+ payment methods integrated",
      "Sub-second page load times globally",
      "Zero downtime during peak traffic",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop",
    ],
    testimonial: {
      quote:
        "Our revenue doubled within 6 months of launching the new platform. The technical execution was flawless.",
      author: "James Wright",
      role: "CEO, RetailMax",
    },
  },
  {
    id: 4,
    title: "AI Customer Service Bot",
    category: "AI",
    description:
      "Intelligent chatbot handling 80% of customer inquiries with natural language understanding.",
    tags: ["Python", "GPT-4", "LangChain"],
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&auto=format&fit=crop",
    client: "TelecomGiant",
    year: "2024",
    challenge:
      "The client's call center was overwhelmed with 50,000+ daily inquiries, leading to long wait times and declining customer satisfaction scores.",
    solution:
      "We built an AI-powered chatbot using GPT-4 and LangChain with custom fine-tuning on the client's knowledge base, integrated with their CRM and ticketing systems.",
    results: [
      "80% of inquiries resolved without human intervention",
      "Average response time reduced from 8 min to 3 sec",
      "Customer satisfaction improved by 45%",
      "$4M saved in annual support costs",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop",
    ],
    testimonial: {
      quote:
        "The AI bot handles the majority of our inquiries flawlessly. Our support team can now focus on complex issues.",
      author: "Linda Park",
      role: "Director of Customer Experience",
    },
  },
  {
    id: 5,
    title: "SaaS Analytics Dashboard",
    category: "Design",
    description:
      "Complete design system and UI overhaul for a B2B analytics platform, improving UX metrics by 40%.",
    tags: ["Figma", "Design System", "React"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    client: "DataInsights",
    year: "2023",
    challenge:
      "DataInsights had a powerful analytics engine, but their outdated UI was causing user churn and low adoption rates among enterprise clients.",
    solution:
      "We redesigned the entire platform with a comprehensive design system, implemented accessible component library, and created intuitive data visualization patterns.",
    results: [
      "40% improvement in user engagement",
      "60% reduction in support tickets",
      "25% increase in enterprise adoption",
      "Accessibility AA compliance achieved",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop",
    ],
    testimonial: {
      quote:
        "The redesign was a game-changer. Our enterprise clients immediately noticed the improvement.",
      author: "Alex Rivera",
      role: "Product Manager",
    },
  },
  {
    id: 6,
    title: "Logistics Tracking App",
    category: "Mobile",
    description:
      "Real-time fleet tracking and delivery management for a national logistics company.",
    tags: ["Flutter", "Google Maps", "IoT"],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
    client: "FastShip",
    year: "2023",
    challenge:
      "FastShip needed real-time visibility into their fleet of 500+ vehicles and a way to optimize delivery routes dynamically.",
    solution:
      "We developed a Flutter-based mobile app with real-time GPS tracking, IoT sensor integration, and an AI-powered route optimization engine.",
    results: [
      "20% reduction in fuel costs",
      "15% improvement in delivery times",
      "Real-time tracking for 500+ vehicles",
      "98% delivery accuracy rate",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&auto=format&fit=crop",
    ],
    testimonial: {
      quote:
        "The tracking app gave us complete visibility into our operations. Route optimization alone saved us millions.",
      author: "Robert Kim",
      role: "COO, FastShip",
    },
  },
];

export const categories = ["All", "Web", "Mobile", "AI", "Design"];

export function getProjectById(id: number): Project | undefined {
  return projects.find((p) => p.id === id);
}
