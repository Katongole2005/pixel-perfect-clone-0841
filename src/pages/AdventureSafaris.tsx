import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Bike, Mountain, Waves, Wind, Compass, Tent } from "lucide-react";
import adventureImg from "@/assets/adventure.jpg";
import {
  SplitTextReveal,
  ClipReveal,
  FloatingParticles,
  MagneticHover,
  StaggerGrid,
  StaggerItem,
} from "@/components/animations/AnimationUtils";

const adventures = [
  {
    icon: Waves,
    title: "White Water Rafting",
    description: "Tackle Grade 5 rapids on the mighty River Nile at Jinja — the adrenaline capital of East Africa.",
    duration: "1 Day",
  },
  {
    icon: Mountain,
    title: "Rwenzori Mountains Trek",
    description: "Summit the legendary Mountains of the Moon, Africa's third-highest peak with stunning alpine scenery.",
    duration: "7-9 Days",
  },
  {
    icon: Bike,
    title: "Mountain Biking Safaris",
    description: "Ride through tea plantations, crater lakes, and wildlife reserves on our custom eBike and MTB tours.",
    duration: "3-7 Days",
  },
  {
    icon: Wind,
    title: "Bungee Jumping",
    description: "Take the plunge over the Nile from a 44-meter platform — one of the most scenic bungee spots on Earth.",
    duration: "Half Day",
  },
  {
    icon: Compass,
    title: "Hiking & Nature Walks",
    description: "Explore crater lakes, waterfalls, and volcanic landscapes with expert local guides.",
    duration: "1-5 Days",
  },
  {
    icon: Tent,
    title: "Fly Camping",
    description: "Sleep under the stars in remote wilderness areas with our luxury fly-camping experience.",
    duration: "2-3 Days",
  },
];

const AdventureSafarisPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Adventure Safaris in Uganda | Fresh Tracks Africa</title>
        <meta name="description" content="Experience thrilling adventure safaris in Uganda — white water rafting, mountain biking, Rwenzori trekking, bungee jumping, and more. Book your adventure today." />
      </Helmet>

      <div className="bg-background">
        {/* Hero */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <img
            src={adventureImg}
            alt="Adventure safari in Uganda"
            className="w-full h-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
          <FloatingParticles count={20} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.p
              className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            >
              ── Thrilling Experiences
            </motion.p>
            <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-display font-semibold leading-tight">
              <SplitTextReveal delay={0.3}>Adventure</SplitTextReveal>
              <br />
              <span className="text-secondary italic">
                <SplitTextReveal delay={0.6}>Safaris</SplitTextReveal>
              </span>
            </h1>
            <motion.p
              className="text-white/60 text-base md:text-lg font-body max-w-xl mt-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            >
              Uganda is the ultimate playground for thrill-seekers and nature lovers
            </motion.p>
          </div>
        </section>

        {/* Adventures Grid */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <ClipReveal>
                <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-5">
                  ── Choose Your Thrill
                </p>
              </ClipReveal>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                <SplitTextReveal>Adventures That Await</SplitTextReveal>
              </h2>
            </div>

            <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {adventures.map(({ icon: Icon, title, description, duration }) => (
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
                    <div className="flex items-center justify-between mb-6">
                      <motion.div
                        className="w-14 h-14 bg-secondary/10 flex items-center justify-center"
                        whileHover={{ scale: 1.15, rotate: 8, backgroundColor: "hsl(var(--secondary))" }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon className="w-6 h-6 text-secondary group-hover:text-secondary-foreground transition-colors" />
                      </motion.div>
                      <span className="text-xs font-body font-bold text-muted-foreground uppercase tracking-wider bg-muted px-3 py-1">
                        {duration}
                      </span>
                    </div>
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
              Ready for the Adventure of a Lifetime?
            </h2>
            <p className="text-primary-foreground/70 font-body text-lg max-w-2xl mx-auto mb-10">
              Our adventure specialists will design a trip that matches your thrill level and fitness. Let's go!
            </p>
            <Link to="/plan-your-trip">
              <MagneticHover className="inline-block">
                <span className="group relative inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-12 py-5 text-sm font-body font-bold uppercase tracking-wider overflow-hidden">
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative flex items-center gap-3 group-hover:text-primary transition-colors duration-500">
                    Plan Your Adventure
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

export default AdventureSafarisPage;
