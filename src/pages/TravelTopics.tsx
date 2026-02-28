import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
    Trees,
    Mountain,
    Bike,
    Plane,
    Compass,
    Binoculars,
    ArrowRight,
    Map
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    TextShimmer,
    GlowCard,
    FloatingParticles
} from "@/components/animations/AnimationUtils";

import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, any> = {
    Trees,
    Mountain,
    Bike,
    Plane,
    Compass,
    Binoculars,
    Map
};

interface Topic {
    id: string;
    title: string;
    trip_count: number;
    description: string;
    icon_name: string;
    image_url: string;
    slug: string;
    path?: string;
}

const TravelTopicsPage: React.FC = () => {
    const [topics, setTopics] = React.useState<Topic[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchTopics = async () => {
            try {
                const { data, error } = await supabase
                    .from("managed_travel_topics")
                    .select("*")
                    .eq("is_published", true)
                    .order("sort_order", { ascending: true });

                if (error) throw error;
                if (data) setTopics(data);
            } catch (error) {
                console.error("Error fetching topics:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopics();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-godka-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }
    return (
        <>
            <Helmet>
                <title>Reisethemen & Adventures in Uganda & Rwanda | Godka Tours</title>
                <meta name="description" content="Discover the diversity of Uganda & Rwanda: Safari, Trekking, Gorilla-Trekking, Fly-in Safari, eBike Mountainbike Safari, Active and Nature Travel." />
            </Helmet>

            <div className="bg-background min-h-screen">
                {/* ══════════════════════════════════════════════
                    HERO SECTION
                ══════════════════════════════════════════════ */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-primary/5">
                    <FloatingParticles count={15} className="opacity-10" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <Badge className="bg-godka-gold/20 text-godka-gold border-godka-gold/30 mb-4 px-3 py-1">
                                Choose Your Adventure
                            </Badge>
                            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
                                <TextShimmer>Travel Topics</TextShimmer> & <br />
                                Specialized Tours
                            </h1>
                            <p className="text-xl text-muted-foreground font-body leading-relaxed mb-8">
                                Each traveler is unique. Whether you crave the pulse-pounding excitement of mountain biking among zebras or the serene luxury of a fly-in safari, we have a theme for you.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
                    TOPICS GRID
                ══════════════════════════════════════════════ */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {topics.map((topic, idx) => {
                                const IconComponent = iconMap[topic.icon_name || "Compass"] || Compass;
                                return (
                                    <motion.div
                                        key={topic.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    >
                                        <GlowCard className="group h-full bg-background border border-foreground/5 overflow-hidden rounded-3xl hover:border-godka-gold/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-godka-gold/10">
                                            <div className="relative h-64 overflow-hidden">
                                                <img
                                                    src={topic.image_url}
                                                    alt={topic.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                                                <div className="absolute top-4 right-4">
                                                    <Badge className="bg-primary/90 backdrop-blur-md text-primary-foreground border-none px-3 py-1 text-xs font-bold font-body animate-pulse-glow">
                                                        {topic.trip_count} TRIPS
                                                    </Badge>
                                                </div>
                                                <div className={`absolute bottom-6 left-6 w-12 h-12 rounded-2xl bg-godka-gold/10 flex items-center justify-center backdrop-blur-md`}>
                                                    <IconComponent className={`w-6 h-6 text-godka-gold`} />
                                                </div>
                                            </div>

                                            <div className="p-8">
                                                <h3 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-godka-gold transition-colors">
                                                    {topic.title}
                                                </h3>
                                                <p className="text-muted-foreground font-body leading-relaxed mb-8">
                                                    {topic.description}
                                                </p>
                                                <Link
                                                    to={topic.path || `/trip-search?topic=${topic.slug}`}
                                                    className="inline-flex items-center gap-2 text-sm font-body font-bold text-foreground group/link"
                                                >
                                                    <span>View All Journeys</span>
                                                    <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center group-hover/link:bg-godka-gold group-hover/link:text-primary transition-all duration-300">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </GlowCard>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
                    PERSONALIZATION CTA
                ══════════════════════════════════════════════ */}
                <section className="py-24 bg-primary relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                                Can't find your perfect theme?
                            </h2>
                            <p className="text-xl text-white/70 font-body mb-0">
                                Our trip planners are masters of the custom itinerary. Mix and match elements from any theme to create your ultimate Ugandan adventure.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <Link to="/plan-your-trip">
                                <Button size="lg" className="bg-godka-gold hover:bg-godka-gold/90 text-primary font-body font-bold rounded-full px-12 h-16 text-lg shadow-2xl shadow-godka-gold/20">
                                    Start Custom Planning
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/* Decorative map background */}
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none grayscale invert">
                        <Map className="w-full h-full" />
                    </div>
                </section>
            </div>
        </>
    );
};

export default TravelTopicsPage;
