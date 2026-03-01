import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Users, Music, Utensils, Landmark, Heart, MapPin } from "lucide-react";
import culturalImg from "@/assets/cultural-heritage.jpg";
import {
  SplitTextReveal,
  ClipReveal,
  FloatingParticles,
  LineDraw,
  MagneticHover,
  StaggerGrid,
  StaggerItem,
} from "@/components/animations/AnimationUtils";

const experiences = [
  {
    icon: Users,
    title: "Village Homestays",
    description: "Live with local families and experience authentic daily life in rural Uganda. Share meals, stories, and traditions.",
  },
  {
    icon: Music,
    title: "Traditional Dance & Music",
    description: "Witness vibrant performances from Uganda's diverse ethnic groups — from Baganda drums to Acholi dances.",
  },
  {
    icon: Utensils,
    title: "Culinary Experiences",
    description: "Learn to prepare traditional dishes like luwombo, matoke, and rolex from expert local cooks.",
  },
  {
    icon: Landmark,
    title: "Kingdom Heritage Sites",
    description: "Visit the Kasubi Tombs, Bigo bya Mugenyi, and other UNESCO-listed cultural landmarks.",
  },
  {
    icon: Heart,
    title: "Community Projects",
    description: "Engage with grassroots conservation and education initiatives that benefit local communities.",
  },
  {
    icon: MapPin,
    title: "Craft & Market Tours",
    description: "Explore colorful local markets and meet artisans creating traditional bark cloth, baskets, and jewelry.",
  },
];

const CulturalToursPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Cultural Heritage Tours in Uganda | Fresh Tracks Africa</title>
        <meta name="description" content="Explore Uganda's rich cultural heritage with village homestays, traditional dance performances, culinary experiences, and community projects. Book your cultural tour today." />
      </Helmet>

      <div className="bg-background">
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <img
            src={culturalImg}
            alt="Cultural heritage tour in Uganda"
            className="w-full h-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
          <FloatingParticles count={20} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.p
              className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            >
              ── 56+ Tribes
            </motion.p>
            <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-display font-semibold leading-tight">
              <SplitTextReveal delay={0.3}>Cultural Heritage</SplitTextReveal>
              <br />
              <span className="text-secondary italic">
                <SplitTextReveal delay={0.6}>Tours</SplitTextReveal>
              </span>
            </h1>
            <motion.p
              className="text-white/60 text-base md:text-lg font-body max-w-xl mt-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            >
              Immerse yourself in the vibrant traditions and warm hospitality of Uganda's diverse communities
            </motion.p>
          </div>
        </section>

        {/* Experiences Grid */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <ClipReveal>
                <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-5">
                  ── Cultural Experiences
                </p>
              </ClipReveal>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                <SplitTextReveal>What Awaits You</SplitTextReveal>
              </h2>
            </div>

            <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map(({ icon: Icon, title, description }) => (
                <StaggerItem key={title}>
                  <motion.div
                    className="group relative p-8 lg:p-10 border border-border bg-card cursor-default overflow-hidden"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 w-full h-[2px] bg-secondary"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.6 }}
                      style={{ originX: 0 }}
                    />
                    <motion.div
                      className="w-14 h-14 bg-secondary/10 flex items-center justify-center mb-6"
                      whileHover={{ scale: 1.15, rotate: 8, backgroundColor: "hsl(var(--secondary))" }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon className="w-6 h-6 text-secondary group-hover:text-secondary-foreground transition-colors" />
                    </motion.div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-3">{title}</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">{description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Ready to Explore Uganda's Culture?
            </h2>
            <p className="text-primary-foreground/70 font-body text-lg max-w-2xl mx-auto mb-10">
              Let us craft a personalized cultural tour that connects you with the heart and soul of East Africa.
            </p>
            <Link to="/plan-your-trip">
              <MagneticHover className="inline-block">
                <span className="group relative inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-12 py-5 text-sm font-body font-bold uppercase tracking-wider overflow-hidden">
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative flex items-center gap-3 group-hover:text-primary transition-colors duration-500">
                    Plan Your Cultural Tour
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </span>
              </MagneticHover>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default CulturalToursPage;
