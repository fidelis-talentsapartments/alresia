import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesPreview />
      <ProcessSection />
      <ProjectsShowcase />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
