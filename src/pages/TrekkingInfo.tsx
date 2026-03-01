import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Mountain, Clock, Users, Shield, TreePine, Camera, Heart, Footprints } from "lucide-react";
import gorillaImg from "@/assets/gorilla-trekking.jpg";
import {
  SplitTextReveal,
  ClipReveal,
  FloatingParticles,
  MagneticHover,
  StaggerGrid,
  StaggerItem,
  LineDraw,
} from "@/components/animations/AnimationUtils";

const infoCards = [
  {
    icon: Clock,
    title: "Duration & Timing",
    description: "Treks start at 8 AM and can last 2–8 hours depending on gorilla location. You'll spend 1 hour with the gorillas once found.",
  },
  {
    icon: Mountain,
    title: "Fitness Level",
    description: "Moderate fitness required. Trails can be steep and muddy. Porters are available to carry your bags and assist you.",
  },
  {
    icon: Shield,
    title: "Permits",
    description: "Gorilla permits cost $700 (Uganda) or $1,500 (Rwanda). We handle all permit arrangements — book early as they sell out.",
  },
  {
    icon: Users,
    title: "Group Size",
    description: "Maximum 8 trekkers per gorilla family per day. This ensures minimal disturbance to the primates.",
  },
  {
    icon: Camera,
    title: "Photography Rules",
    description: "No flash photography. Keep a 7-meter distance. Bring a camera with good low-light performance for the forest canopy.",
  },
  {
    icon: TreePine,
    title: "What to Wear",
    description: "Long sleeves, trousers tucked into socks, waterproof jacket, sturdy boots, gardening gloves for grabbing vegetation.",
  },
  {
    icon: Heart,
    title: "Health Requirements",
    description: "No trekking if you have a cold, flu, or infectious disease — gorillas are susceptible to human illnesses.",
  },
  {
    icon: Footprints,
    title: "Chimpanzee Trekking",
    description: "Similar to gorilla trekking but in Kibale Forest. Chimps are faster-moving, so expect a more dynamic experience.",
  },
];

const TrekkingInfoPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Gorilla & Chimp Trekking Guide | Fresh Tracks Africa</title>
        <meta name="description" content="Complete guide to gorilla and chimpanzee trekking in Uganda and Rwanda — what to expect, fitness requirements, permits, rules, and tips from Fresh Tracks Africa." />
      </Helmet>

      <div className="bg-background min-h-screen">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[450px] overflow-hidden">
          <img src={gorillaImg} alt="Gorilla trekking in Bwindi" className="w-full h-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
          <FloatingParticles count={15} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.p
              className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            >
              ── Everything You Need to Know
            </motion.p>
            <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-display font-semibold leading-tight">
              <SplitTextReveal delay={0.3}>Trekking</SplitTextReveal>
              <br />
              <span className="text-secondary italic">
                <SplitTextReveal delay={0.6}>Information</SplitTextReveal>
              </span>
            </h1>
          </div>
        </section>

        {/* Info Grid */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <ClipReveal>
                <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-5">
                  ── Trekking Guide
                </p>
              </ClipReveal>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                <SplitTextReveal>What to Expect</SplitTextReveal>
              </h2>
              <ClipReveal delay={0.3}>
                <p className="text-muted-foreground font-body max-w-xl mx-auto text-[15px] leading-relaxed">
                  Whether it's gorillas in Bwindi or chimps in Kibale, here's everything you need to prepare for your trek.
                </p>
              </ClipReveal>
            </div>

            <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {infoCards.map(({ icon: Icon, title, description }) => (
                <StaggerItem key={title}>
                  <motion.div
                    className="group p-6 border border-border bg-card overflow-hidden h-full"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-3">{title}</h3>
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
              Ready to Trek?
            </h2>
            <p className="text-primary-foreground/70 font-body text-lg max-w-2xl mx-auto mb-10">
              We'll handle permits, logistics, and every detail so you can focus on the experience of a lifetime.
            </p>
            <Link to="/gorilla-trekking">
              <MagneticHover className="inline-block">
                <span className="group relative inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-12 py-5 text-sm font-body font-bold uppercase tracking-wider overflow-hidden">
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative flex items-center gap-3 group-hover:text-primary transition-colors duration-500">
                    View Gorilla Trekking Tours
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

export default TrekkingInfoPage;
