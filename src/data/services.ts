import {
  Code, Smartphone, Brain, Palette, Video, Camera, Music,
  Brush, Globe, Megaphone, Server, Shield, type LucideIcon,
} from "lucide-react";
import servicesJson from "./services.json";

const iconMap: Record<string, LucideIcon> = {
  Code, Smartphone, Brain, Palette, Video, Camera, Music,
  Brush, Globe, Megaphone, Server, Shield,
};

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  technologies: string[];
  href: string;
  bentoSpan?: string;
}

export const services: Service[] = (servicesJson as Array<Omit<Service, "icon" | "href"> & { icon: string }>).map((s) => ({
  ...s,
  icon: iconMap[s.icon] ?? Code,
  href: `/services#${s.id}`,
}));
