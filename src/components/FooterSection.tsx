import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, Send, ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.png";
import {
  SplitTextReveal,
  ClipReveal,
  LineDraw,
  MagneticHover,
  FloatingParticles,
} from "./animations/AnimationUtils";

const FooterSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgX = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const curtainY = useTransform(scrollYProgress, [0, 0.3], ["8%", "0%"]);

  return (
    <motion.footer ref={ref} className="relative overflow-hidden" style={{ y: curtainY }}>
      {/* Newsletter CTA */}
      <div className="bg-secondary relative overflow-hidden">
        {/* Animated pattern */}
        <motion.div
          style={{ x: bgX }}
          className="absolute inset-0 opacity-[0.06]"
        >
          <div
            className="w-[200%] h-full"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, hsl(var(--secondary-foreground)) 40px, hsl(var(--secondary-foreground)) 41px)`,
            }}
          />
        </motion.div>

        {/* Floating particles overlay */}
        <FloatingParticles count={12} />

        <div className="max-w-3xl mx-auto text-center py-24 px-4 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-secondary-foreground mb-4">
              <SplitTextReveal>Ready for Your Next</SplitTextReveal>
              <br />
              <span className="italic">
                <SplitTextReveal delay={0.3}>Adventure?</SplitTextReveal>
              </span>
            </h2>
            <ClipReveal delay={0.5}>
              <p className="text-secondary-foreground/60 font-body mb-12 text-[15px]">
                Subscribe for exclusive deals, travel tips, and destination guides
              </p>
            </ClipReveal>
            <motion.div
              className="flex gap-0 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-5 bg-secondary-foreground/10 border border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/30 font-body text-sm focus:outline-none focus:border-secondary-foreground/50 transition-colors"
              />
              <MagneticHover className="shrink-0">
                <button className="group relative bg-primary text-primary-foreground px-8 py-5 font-body font-bold text-sm uppercase tracking-wider overflow-hidden">
                  <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative flex items-center gap-2">
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </button>
              </MagneticHover>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-white pt-16 pb-12 px-4 relative">
        {/* Subtle animated glow */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--godka-gold) / 0.5), transparent)",
          }}
          animate={{ scaleX: [0.5, 1.5, 0.5], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto">
          {/* Top row: Logo + Social */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={logo}
              alt="Godka Tours and Travels Ltd."
              className="h-16 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <MagneticHover key={i} strength={0.4}>
                  <motion.a
                    href="#"
                    className="w-10 h-10 rounded-full border border-godka-navy/15 flex items-center justify-center text-godka-navy/50 hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300"
                    whileHover={{ rotate: 10 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                </MagneticHover>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <LineDraw className="h-px bg-godka-navy/10 mb-12" delay={0.2} />

          {/* Columns */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <h4 className="text-godka-navy font-body font-bold text-xs uppercase tracking-[0.2em] mb-6">
                About Us
              </h4>
              <p className="text-godka-warm-gray font-body text-sm leading-relaxed">
                Your trusted partner for unforgettable East African adventures since 2015. We specialize in gorilla trekking, wildlife safaris, and cultural tours across Uganda & Rwanda.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-godka-navy font-body font-bold text-xs uppercase tracking-[0.2em] mb-6">
                Quick Links
              </h4>
              {["Tours", "Destinations", "Gorilla Trekking", "National Parks", "Reviews"].map(
                (link, i) => (
                  <motion.a
                    key={link}
                    href="#"
                    className="group flex items-center gap-2 text-godka-warm-gray font-body text-sm py-2 hover:text-secondary transition-all duration-300 hover:pl-1"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link}
                  </motion.a>
                )
              )}
            </motion.div>

            {/* Top Destinations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-godka-navy font-body font-bold text-xs uppercase tracking-[0.2em] mb-6">
                Top Destinations
              </h4>
              {["Bwindi Forest", "Queen Elizabeth NP", "Murchison Falls", "Kibale Forest", "Lake Bunyonyi"].map(
                (link, i) => (
                  <motion.a
                    key={link}
                    href="#"
                    className="group flex items-center gap-2 text-godka-warm-gray font-body text-sm py-2 hover:text-secondary transition-all duration-300 hover:pl-1"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link}
                  </motion.a>
                )
              )}
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-godka-navy font-body font-bold text-xs uppercase tracking-[0.2em] mb-6">
                Get In Touch
              </h4>
              <div className="space-y-4">
                {[
                  { icon: Phone, text: "+256 753 171457", href: "tel:+256753171457" },
                  { icon: Mail, text: "info@godkatours.com", href: "mailto:info@godkatours.com" },
                  { icon: MapPin, text: "Kampala, Uganda", href: "#" },
                ].map(({ icon: Icon, text, href }, i) => (
                  <motion.a
                    key={text}
                    href={href}
                    className="flex items-center gap-3 group"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.08 }}
                  >
                    <div className="w-9 h-9 rounded-full bg-godka-navy/5 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-godka-warm-gray font-body text-sm group-hover:text-godka-navy transition-colors duration-300">
                      {text}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-white border-t border-godka-navy/[0.08] py-5 px-4">
        <motion.div
          className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-godka-warm-gray/60 font-body text-xs">
            © 2026 Godka Tours and Travels Ltd. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-godka-warm-gray/60 font-body text-xs hover:text-secondary transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default FooterSection;
