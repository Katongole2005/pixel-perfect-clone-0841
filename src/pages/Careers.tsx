import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Briefcase, Heart, Globe } from "lucide-react";
import {
  SplitTextReveal,
  ClipReveal,
  FloatingParticles,
  MagneticHover,
  StaggerGrid,
  StaggerItem,
} from "@/components/animations/AnimationUtils";

const perks = [
  { icon: Globe, title: "Travel the World", description: "Experience East Africa's most incredible destinations as part of your work." },
  { icon: Heart, title: "Make an Impact", description: "Contribute to wildlife conservation and community development every day." },
  { icon: Briefcase, title: "Grow With Us", description: "Professional development opportunities and a supportive team environment." },
  { icon: MapPin, title: "Based in Kampala", description: "Our HQ is in the heart of Uganda's vibrant capital city." },
];

const CareersPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Careers at Fresh Tracks Africa | Join Our Team</title>
        <meta name="description" content="Join the Fresh Tracks Africa team. We're looking for passionate people who love travel, wildlife, and creating unforgettable experiences." />
      </Helmet>

      <div className="bg-background min-h-screen">
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-primary/5">
          <FloatingParticles count={15} className="opacity-10" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
              <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-4">── Join Our Team</p>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
                <SplitTextReveal>Careers</SplitTextReveal>
              </h1>
              <p className="text-xl text-muted-foreground font-body leading-relaxed">
                We're always looking for passionate individuals who share our love for East Africa and creating extraordinary travel experiences.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Perks */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                <SplitTextReveal>Why Work With Us</SplitTextReveal>
              </h2>
            </div>
            <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {perks.map(({ icon: Icon, title, description }) => (
                <StaggerItem key={title}>
                  <motion.div
                    className="group p-8 border border-border bg-card text-center"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-14 h-14 bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-3">{title}</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">{description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-24 px-4 bg-muted">
          <div className="max-w-4xl mx-auto text-center">
            <ClipReveal>
              <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-5">── Open Positions</p>
            </ClipReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              No Open Positions Right Now
            </h2>
            <p className="text-muted-foreground font-body text-lg mb-10 max-w-2xl mx-auto">
              We don't have any vacancies at the moment, but we're always interested in hearing from talented people.
              Send us your CV and a cover letter telling us why you'd be a great fit.
            </p>
            <Link to="/contact">
              <MagneticHover className="inline-block">
                <span className="group relative inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 text-sm font-body font-bold uppercase tracking-wider overflow-hidden">
                  <span className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative flex items-center gap-3 group-hover:text-secondary-foreground transition-colors duration-500">
                    Get in Touch
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

export default CareersPage;
