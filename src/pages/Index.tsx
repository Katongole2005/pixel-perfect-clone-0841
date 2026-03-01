import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import TripSearchSection from "@/components/TripSearchSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import PressRelease from "@/components/PressRelease";
import AfconSection from "@/components/AfconSection";
import NewsSection from "@/components/NewsSection";
import ExploreSection from "@/components/ExploreSection";
import ScrollVideoSection from "@/components/ScrollVideoSection";
import AboutSection from "@/components/AboutSection";
import PartnersSection from "@/components/PartnersSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Fresh Tracks Africa Tours & Travel | Gorilla Trekking & Safari Tours Uganda & Rwanda</title>
        <meta name="description" content="Book gorilla trekking, wildlife safaris & cultural tours in Uganda and Rwanda with Fresh Tracks Africa. ATTA-certified operator with 10+ years experience. Get a free quote today." />
      </Helmet>
      <HeroSection />
      <TripSearchSection />
      <ExperiencesSection />
      <PressRelease />
      <AfconSection />
      <NewsSection />
      <ExploreSection />
      <ScrollVideoSection />
      <AboutSection />
      <PartnersSection />
    </>
  );
};

export default Index;
