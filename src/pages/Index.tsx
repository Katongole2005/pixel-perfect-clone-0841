import { useRef } from "react";
import TopBar from "@/components/TopBar";
import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import PressRelease from "@/components/PressRelease";
import AfconSection from "@/components/AfconSection";
import NewsSection from "@/components/NewsSection";
import ExploreSection from "@/components/ExploreSection";
import ScrollVideoSection from "@/components/ScrollVideoSection";
import AboutSection from "@/components/AboutSection";
import PartnersSection from "@/components/PartnersSection";
import FooterSection from "@/components/FooterSection";
import {
  ScrollProgress,
  CustomCursor,
  BackToTop,
} from "@/components/animations/AnimationUtils";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Global UI overlays */}
      <ScrollProgress />
      <CustomCursor />
      <BackToTop />

      <header>
        <TopBar />
        <HeaderBar />
        <Navbar />
      </header>
      <main>
        <HeroSection />
        <ExperiencesSection />
        <PressRelease />
        <AfconSection />
        <NewsSection />
        <ExploreSection />
        <ScrollVideoSection />
        <AboutSection />
        <PartnersSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
