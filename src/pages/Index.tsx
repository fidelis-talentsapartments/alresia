import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeBanner } from "@/components/home/MarqueeBanner";
import { BentoServices } from "@/components/home/BentoServices";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";
import { Seo } from "@/components/seo/Seo";
import { siteConfig } from "@/lib/site";

const Index = () => {
  return (
    <>
      <Seo
        title="Alresia Technologies | Engineering Intelligence. Inspiring Creativity."
        description={siteConfig.description}
        path="/"
        keywords={[
          "Alresia Technologies",
          "web development",
          "mobile app development",
          "AI solutions",
          "digital products",
        ]}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            logo: `${siteConfig.url}/android-chrome-512x512.png`,
            email: siteConfig.email,
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
          },
        ]}
      />
      <Layout>
        <HeroSection />
        <MarqueeBanner />
        <BentoServices />
        <ProcessSection />
        <ProjectsShowcase />
        <TestimonialsSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
