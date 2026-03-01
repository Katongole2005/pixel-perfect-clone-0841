import { motion } from "framer-motion";
import { MessageCircle, Bed, FileText, Compass } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { FaqAccordion } from "@/components/ui/faq-chat-accordion";
import { ShaderBackground } from "@/components/ui/background-paper-shaders";
import {
    SplitTextReveal,
    ClipReveal,
    FloatingParticles,
} from "@/components/animations/AnimationUtils";

/* ─── FAQ DATA — adapted from Uganda Trails FAQ ─── */

const aboutFAQ = [
    {
        id: 1,
        question: "Who is Fresh Tracks Africa?",
        answer:
            "Fresh Tracks Africa is your trusted local tour operator based in Kampala, Uganda. We specialise in gorilla trekking, wildlife safaris, chimpanzee tracking, and adventure travel across Uganda and Rwanda. All our tours are personally curated and led by UWA-certified guides.",
        icon: "🦍",
        iconPosition: "right" as const,
    },
    {
        id: 2,
        question: "How do I reach you if I need help during my trip?",
        answer:
            "Our team is reachable 24/7 via phone, WhatsApp, and email. Emergency contacts and your guide's direct number are included in your travel documents. You'll never be without support.",
    },
    {
        id: 3,
        question: "Are your guides certified and English-speaking?",
        answer:
            "Yes. All Fresh Tracks Africa guides are certified by the Uganda Wildlife Authority (UWA), experienced in the field, and fluent in English. Many also speak French and Swahili.",
    },
    {
        id: 4,
        question: "Is Fresh Tracks Africa a licensed operator?",
        answer:
            "Yes. Fresh Tracks Africa is fully licensed by the Uganda Tourism Board (UTB) and is a member of the Association of Uganda Tour Operators (AUTO). We work exclusively with partners who share our commitment to sustainability and responsible tourism.",
    },
    {
        id: 5,
        question: "Can I book a tailor-made itinerary?",
        answer:
            "Absolutely. We specialise in custom itineraries built around your travel dates, interests, group size, and budget. Contact us and we'll design your perfect Uganda adventure from scratch.",
    },
    {
        id: 6,
        question: "How do I confirm my booking?",
        answer:
            "Once we receive your booking request, you'll get an automatic confirmation email within a few hours. A deposit of 20–30% of the tour price plus the full gorilla permit fee is required to confirm your spot.",
        icon: "✅",
        iconPosition: "left" as const,
    },
    {
        id: 7,
        question: "Can I cancel or modify my booking?",
        answer:
            "Yes, changes and cancellations are possible within the terms of our booking conditions. Please note that gorilla permit fees are non-refundable once purchased, as they are set by the Uganda Wildlife Authority.",
    },
    {
        id: 8,
        question: "Are international flights included?",
        answer:
            "International flights are not included in our tour packages, but we're happy to advise you on the best routes and connections to Entebbe (EBB) or Kigali (KGL). Airport transfers are always included.",
    },
    {
        id: 9,
        question: "Does Fresh Tracks Africa offer group discounts?",
        answer:
            "Yes, we regularly offer early-bird and group pricing. Contact us with your travel dates and group size to get a tailored quote. Gorilla permit discounts are not available as prices are fixed by the UWA.",
    },
];

const accommodationFAQ = [
    {
        id: 10,
        question: "Is accommodation included in the tour price?",
        answer:
            "Yes — wherever accommodation is part of the tour, it is clearly stated in the itinerary. We partner with a range of lodges from comfortable mid-range to premium forest lodges near Bwindi and Queen Elizabeth National Park.",
    },
    {
        id: 11,
        question: "Can you cater to dietary requirements?",
        answer:
            "Yes. Please inform us of any dietary needs — vegetarian, vegan, gluten-free, allergies — at the time of booking, and we'll ensure both lodges and field meals are prepared accordingly.",
        icon: "🍃",
        iconPosition: "left" as const,
    },
    {
        id: 12,
        question: "What is the standard of lodges used?",
        answer:
            "We use carefully vetted lodges that balance comfort, character, and location. Each lodge is close to key activity areas so you're spending time in the wild, not on long road transfers.",
    },
];

const documentsFAQ = [
    {
        id: 13,
        question: "What travel documents do I need for Uganda?",
        answer:
            "You need a valid passport with at least 6 months validity beyond your departure date, plus a valid Yellow Fever vaccination certificate. A Uganda tourist visa is also required (available on arrival or via evisa.go.ug).",
        icon: "📋",
        iconPosition: "right" as const,
    },
    {
        id: 14,
        question: "Is a Yellow Fever vaccination compulsory?",
        answer:
            "Yes, the Yellow Fever vaccination is mandatory for entry into Uganda. We also recommend vaccinations for Hepatitis A, Typhoid, and up-to-date malaria prophylaxis. Consult your travel health clinic before departure.",
    },
    {
        id: 15,
        question: "What happens if my passport is lost during the trip?",
        answer:
            "Contact us immediately on our emergency line. We will assist you in reaching the nearest embassy and help navigate the replacement process. Always carry a certified photocopy of your passport separately from the original.",
    },
    {
        id: 16,
        question: "When will I receive my travel documents and vouchers?",
        answer:
            "After your final balance is received (at least 40 days before departure), we'll send your complete travel pack: itinerary, vouchers, emergency contacts, packing list, and all permits.",
    },
];

const trekkingFAQ = [
    {
        id: 17,
        question: "How far in advance should I book gorilla permits?",
        answer:
            "We strongly recommend booking at least 3–6 months ahead, especially for peak season (June–September and December–February). Permits are limited to 8 trekkers per gorilla family per day and sell out fast.",
        icon: "🌿",
        iconPosition: "left" as const,
    },
    {
        id: 18,
        question: "How physically demanding is gorilla trekking?",
        answer:
            "Treks can range from 1 to 8 hours through dense forest terrain. A moderate level of fitness is recommended. You'll be briefed by a UWA ranger before the trek and porters are available to help carry bags or support you on the trail.",
    },
    {
        id: 19,
        question: "Can I do chimpanzee tracking too?",
        answer:
            "Yes! Kibale Forest National Park offers the best chimpanzee tracking experience in the world. We can combine both gorilla and chimpanzee experiences in a single itinerary.",
    },
    {
        id: 20,
        question: "What should I pack for a gorilla or chimp trek?",
        answer:
            "Key items include sturdy waterproof hiking boots, long-sleeved shirts, lightweight rain jacket, garden gloves, insect repellent, a hat, and a small daypack. A full packing list is sent with your booking confirmation.",
        icon: "🎒",
        iconPosition: "right" as const,
    },
    {
        id: 21,
        question: "Can I book activities spontaneously while on the trip?",
        answer:
            "Some activities like Batwa cultural experiences, boat safaris, and golden monkey tracking can be booked on the spot. Gorilla and chimpanzee permits must be pre-arranged due to limited availability.",
    },
];

const categories = [
    {
        id: "about",
        icon: MessageCircle,
        label: "About Fresh Tracks Africa",
        emoji: "🦍",
        data: aboutFAQ,
        timestamp: "Questions about our company & bookings",
    },
    {
        id: "accommodation",
        icon: Bed,
        label: "Accommodation & Food",
        emoji: "🍃",
        data: accommodationFAQ,
        timestamp: "Questions about lodges, meals & dietary needs",
    },
    {
        id: "documents",
        icon: FileText,
        label: "Travel Documents & Entry",
        emoji: "📋",
        data: documentsFAQ,
        timestamp: "Questions about visas, vaccines & paperwork",
    },
    {
        id: "trekking",
        icon: Compass,
        label: "Trekking & Activities",
        emoji: "🌿",
        data: trekkingFAQ,
        timestamp: "Questions about gorilla & chimp treks",
    },
];

const FAQPage = () => {
    return (
        <>
            <Helmet>
                <title>Frequently Asked Questions | Fresh Tracks Africa</title>
                <meta name="description" content="Find answers to common questions about booking, trekking, permits, safety, and safari details with Fresh Tracks Africa." />
                <link rel="canonical" href="https://pixel-perfect-clone-0841.lovable.app/faq" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://pixel-perfect-clone-0841.lovable.app/faq" />
                <meta property="og:title" content="FAQ | Fresh Tracks Africa" />
                <meta property="og:description" content="Common questions about gorilla trekking, safari bookings, permits, and more — answered." />
                <meta property="og:site_name" content="Fresh Tracks Africa Tours & Travel" />
                <meta name="twitter:card" content="summary" />
            </Helmet>
            <div className="bg-background">
                {/* ── Hero Banner ── */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1600&auto=format&fit=crop"
                        alt="Fresh Tracks Africa FAQ - Uganda Safari"
                        className="w-full h-full object-cover animate-ken-burns"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85" />
                    <FloatingParticles count={12} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
                        <motion.p
                            className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            ── Your Questions, Answered
                        </motion.p>
                        <h1 className="text-white text-4xl md:text-6xl font-display font-semibold mb-4">
                            <SplitTextReveal delay={0.3}>Frequently Asked Questions</SplitTextReveal>
                        </h1>
                        <ClipReveal delay={0.7}>
                            <p className="text-white/60 font-body max-w-lg text-sm md:text-base">
                                Everything you need to know about booking a gorilla trek or safari with Fresh Tracks Africa.
                            </p>
                        </ClipReveal>
                    </div>
                </div>

                {/* ── Shader zone: Intro strip + FAQ Categories ── */}
                <div className="relative overflow-hidden">
                    {/* Full shader background covering both sections */}
                    <ShaderBackground
                        colors={["#0d1a30", "#1a2a4a", "#c26820", "#d4922e"]}
                        speed={0.5}
                    />
                    {/* Overlay to deepen richness without killing the gradient */}
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                    {/* ── Intro strip ── */}
                    <section className="relative z-10 py-10 px-4 border-b border-white/10">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.p
                                className="font-body text-white/75 leading-relaxed text-sm md:text-base"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                Can't find your answer below?{" "}
                                <a
                                    href="/contact"
                                    className="text-secondary font-semibold underline underline-offset-2 hover:text-secondary/70 transition-colors"
                                >
                                    Contact our team
                                </a>{" "}
                                — we reply within one business day.
                            </motion.p>
                        </div>
                    </section>

                    {/* ── FAQ Categories ── */}
                    <section className="relative z-10 py-16 px-4">
                        <div className="max-w-5xl mx-auto space-y-16">
                            {categories.map(({ id, icon: Icon, label, emoji, data, timestamp }, catIdx) => (
                                <motion.div
                                    key={id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.7, delay: catIdx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    {/* Category header */}
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/20">
                                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                                            <Icon className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h2 className="font-display font-bold text-white text-xl">{label}</h2>
                                            <p className="text-white/50 font-body text-xs">{emoji} {timestamp}</p>
                                        </div>
                                    </div>

                                    <FaqAccordion
                                        data={data}
                                        className="px-0"
                                        questionClassName="bg-white/10 hover:bg-white/15 text-white"
                                        answerClassName="bg-secondary text-white"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* ── CTA strip ── */}
                <section className="py-16 px-4 bg-primary relative overflow-hidden">
                    <FloatingParticles count={10} />
                    <div className="max-w-2xl mx-auto text-center relative">
                        <ClipReveal>
                            <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-5">
                                ── Still Have Questions?
                            </p>
                        </ClipReveal>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
                            <SplitTextReveal>We're Here to Help</SplitTextReveal>
                        </h2>
                        <ClipReveal delay={0.3}>
                            <p className="text-primary-foreground/55 font-body mb-8 text-sm md:text-base leading-relaxed">
                                Our team is available 24/7 during your trip and during office hours for pre-trip planning.
                                Don't hesitate to reach out.
                            </p>
                        </ClipReveal>
                        <motion.a
                            href="/contact"
                            className="group relative inline-flex items-center gap-3 px-10 py-4 overflow-hidden"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <span className="absolute inset-0 bg-secondary" />
                            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <span className="relative text-secondary-foreground group-hover:text-primary font-body font-bold uppercase tracking-widest text-sm transition-colors duration-500">
                                Contact Us Now
                            </span>
                        </motion.a>
                    </div>
                </section>
            </div>
        </>
    );
};

export default FAQPage;
