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
        <link rel="canonical" href="https://pixel-perfect-clone-0841.lovable.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pixel-perfect-clone-0841.lovable.app/" />
        <meta property="og:title" content="Fresh Tracks Africa Tours & Travel | Gorilla Trekking & Safari Tours" />
        <meta property="og:description" content="Book gorilla trekking, wildlife safaris & cultural tours in Uganda and Rwanda. ATTA-certified operator with 10+ years experience." />
        <meta property="og:site_name" content="Fresh Tracks Africa Tours & Travel" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fresh Tracks Africa Tours & Travel | Gorilla Trekking & Safari Tours" />
        <meta name="twitter:description" content="Book gorilla trekking, wildlife safaris & cultural tours in Uganda and Rwanda." />
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
