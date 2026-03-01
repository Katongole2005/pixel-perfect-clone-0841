import { motion } from "framer-motion";
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon, Send } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { ContactCard } from "@/components/ui/contact-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    SplitTextReveal,
    ClipReveal,
    FloatingParticles,
} from "@/components/animations/AnimationUtils";

const ContactPage = () => {
    return (
        <>
            <Helmet>
                <title>Contact Us | Fresh Tracks Africa</title>
                <meta name="description" content="Get in touch with Fresh Tracks Africa to plan your next African safari adventure. Call, email, or fill out our contact form." />
                <link rel="canonical" href="https://pixel-perfect-clone-0841.lovable.app/contact" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://pixel-perfect-clone-0841.lovable.app/contact" />
                <meta property="og:title" content="Contact Us | Fresh Tracks Africa" />
                <meta property="og:description" content="Get in touch to plan your next African safari adventure." />
                <meta property="og:site_name" content="Fresh Tracks Africa Tours & Travel" />
                <meta name="twitter:card" content="summary" />
            </Helmet>
            <div className="bg-background">
                {/* ── Hero Banner ── */}
                <div className="relative h-72 md:h-96 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1600&auto=format&fit=crop"
                        alt="Contact Fresh Tracks Africa"
                        className="w-full h-full object-cover animate-ken-burns"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                    <FloatingParticles count={15} />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <motion.p
                            className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            ── We're Here to Help
                        </motion.p>
                        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-display font-semibold leading-tight">
                            <SplitTextReveal delay={0.4}>Get In Touch</SplitTextReveal>
                        </h1>
                        <ClipReveal delay={0.8}>
                            <p className="text-white/60 font-body mt-4 max-w-lg text-sm md:text-base">
                                Have a question about booking a safari or gorilla trek? Our team is ready to help plan your perfect adventure.
                            </p>
                        </ClipReveal>
                    </div>
                </div>

                {/* ── Contact Card Section ── */}
                <section className="py-20 px-4 bg-background">
                    <motion.div
                        className="max-w-5xl mx-auto"
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <ContactCard
                            title="Contact With Us"
                            description="Whether you're planning a gorilla trek, a safari tour, or simply want to learn more about East Africa, fill out the form and we'll get back to you within 1 business day."
                            contactInfo={[
                                {
                                    icon: MailIcon,
                                    label: "Email",
                                    value: "info@freshtracksafrica.com",
                                },
                                {
                                    icon: PhoneIcon,
                                    label: "Phone",
                                    value: "+256 755 843097 / +256 746 718350",
                                },
                                {
                                    icon: MapPinIcon,
                                    label: "Address",
                                    value: "Kampala, Uganda",
                                    className: "col-span-2",
                                },
                                {
                                    icon: ClockIcon,
                                    label: "Office Hours",
                                    value: "Mon–Sat, 8am–6pm EAT",
                                    className: "col-span-2",
                                },
                            ]}
                        >
                            {/* Contact Form */}
                            <form className="w-full space-y-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="contact-name" className="font-body text-sm font-semibold">
                                        Full Name
                                    </Label>
                                    <Input
                                        id="contact-name"
                                        type="text"
                                        placeholder="Jane Smith"
                                        className="font-body"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="contact-email" className="font-body text-sm font-semibold">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="contact-email"
                                        type="email"
                                        placeholder="jane@example.com"
                                        className="font-body"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="contact-phone" className="font-body text-sm font-semibold">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="contact-phone"
                                        type="tel"
                                        placeholder="+1 234 567 890"
                                        className="font-body"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="contact-message" className="font-body text-sm font-semibold">
                                        Message
                                    </Label>
                                    <Textarea
                                        id="contact-message"
                                        placeholder="Tell us about the trip you're planning..."
                                        className="font-body min-h-[100px] resize-none"
                                    />
                                </div>

                                <Button
                                    type="button"
                                    className="w-full group relative overflow-hidden bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-bold uppercase tracking-widest text-sm py-5"
                                >
                                    <span className="flex items-center gap-2">
                                        Send Message
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    </span>
                                </Button>
                            </form>
                        </ContactCard>
                    </motion.div>
                </section>

                {/* ── Map placeholder / extra info strip ── */}
                <section className="py-16 px-4 bg-muted">
                    <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: PhoneIcon, label: "Call Us", value: "+256 755 843097 / +256 746 718350", sub: "Mon–Sat, 8am–6pm EAT" },
                            { icon: MailIcon, label: "Email Us", value: "info@freshtracksafrica.com", sub: "We reply within 1 business day" },
                            { icon: MapPinIcon, label: "Find Us", value: "Kampala, Uganda", sub: "East Africa's safari capital" },
                        ].map(({ icon: Icon, label, value, sub }, i) => (
                            <motion.div
                                key={label}
                                className="flex flex-col items-center gap-3"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.7 }}
                            >
                                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                                    <Icon className="w-6 h-6 text-secondary" />
                                </div>
                                <p className="font-body font-bold text-xs uppercase tracking-widest text-secondary">{label}</p>
                                <p className="font-display font-semibold text-foreground text-lg">{value}</p>
                                <p className="text-muted-foreground font-body text-sm">{sub}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default ContactPage;
