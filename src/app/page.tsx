import { HeroSection } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
import { AboutSection } from "@/components/sections/about";
import { ExpertiseSection } from "@/components/sections/expertise";
import { HighlightsSection } from "@/components/sections/highlights";
import { ContactSection } from "@/components/sections/contact";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Emincan Demirkaya",
  jobTitle: "Senior Frontend Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
  url: "https://demirkaya.net",
  sameAs: [
    "https://linkedin.com/in/edemirkaya",
    "https://github.com/3mincan",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Frontend Architecture",
    "API Integration",
    "Performance Optimization",
  ],
};

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="ambient-background" aria-hidden="true" />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <HighlightsSection />
        <ContactSection />
      </div>
    </main>
  );
}