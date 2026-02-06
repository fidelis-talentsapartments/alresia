import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeBanner } from "@/components/home/MarqueeBanner";
import { BentoServices } from "@/components/home/BentoServices";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <MarqueeBanner />
      <BentoServices />
      <ProcessSection />
      <ProjectsShowcase />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
