import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Clock, Star } from "lucide-react";
import { trips } from "@/data/trips";
import {
  SplitTextReveal,
  ClipReveal,
} from "@/components/animations/AnimationUtils";

interface Destination {
  id: string;
  label: string;
  country: "uganda" | "rwanda";
  cx: number;
  cy: number;
  tripCount: number;
}

const destinations: Destination[] = [
  { id: "murchison", label: "Murchison Falls", country: "uganda", cx: 200, cy: 115, tripCount: 0 },
  { id: "kibale", label: "Kibale Forest", country: "uganda", cx: 155, cy: 265, tripCount: 0 },
  { id: "rwenzori", label: "Rwenzori Mountains", country: "uganda", cx: 125, cy: 235, tripCount: 0 },
  { id: "queen-elizabeth", label: "Queen Elizabeth", country: "uganda", cx: 160, cy: 310, tripCount: 0 },
  { id: "bwindi", label: "Bwindi Impenetrable", country: "uganda", cx: 175, cy: 365, tripCount: 0 },
  { id: "mgahinga", label: "Mgahinga", country: "uganda", cx: 195, cy: 395, tripCount: 0 },
  { id: "lake-mburo", label: "Lake Mburo", country: "uganda", cx: 230, cy: 320, tripCount: 0 },
  { id: "volcanoes", label: "Volcanoes NP", country: "rwanda", cx: 295, cy: 420, tripCount: 0 },
  { id: "akagera", label: "Akagera", country: "rwanda", cx: 380, cy: 450, tripCount: 0 },
  { id: "nyungwe", label: "Nyungwe Forest", country: "rwanda", cx: 310, cy: 510, tripCount: 0 },
];

const DestinationMap = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const enrichedDestinations = useMemo(() => {
    return destinations.map((d) => ({
      ...d,
      tripCount: trips.filter((t) => t.destination === d.id).length,
    }));
  }, []);

  const activeTrips = useMemo(() => {
    if (!activeId) return [];
    return trips.filter((t) => t.destination === activeId).slice(0, 3);
  }, [activeId]);

  const activeDest = enrichedDestinations.find((d) => d.id === activeId);

  return (
    <section className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <ClipReveal>
            <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-secondary mb-4">
              Explore Destinations
            </span>
          </ClipReveal>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            <SplitTextReveal>Choose Your Adventure</SplitTextReveal>
          </h2>
          <ClipReveal delay={0.2}>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Click on a destination to discover available safari packages
            </p>
          </ClipReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Map */}
          <div className="relative">
            <svg
              viewBox="0 0 480 580"
              className="w-full max-w-lg mx-auto"
              style={{ filter: "drop-shadow(0 4px 20px hsl(var(--foreground) / 0.05))" }}
            >
              {/* Uganda outline (simplified) */}
              <path
                d="M120,60 L280,50 L340,80 L350,120 L330,180 L340,240 L310,300 L280,340 L240,370 L200,400 L170,390 L140,360 L120,320 L100,260 L90,200 L100,140 Z"
                fill="hsl(var(--primary) / 0.08)"
                stroke="hsl(var(--primary) / 0.3)"
                strokeWidth="1.5"
                className="transition-all duration-500"
              />
              <text x="220" y="200" textAnchor="middle" className="fill-primary/30 text-[14px] font-serif tracking-widest uppercase">
                Uganda
              </text>

              {/* Rwanda outline (simplified) */}
              <path
                d="M240,400 L280,390 L350,400 L390,420 L400,460 L380,510 L340,530 L290,530 L260,510 L240,470 Z"
                fill="hsl(var(--secondary) / 0.08)"
                stroke="hsl(var(--secondary) / 0.3)"
                strokeWidth="1.5"
                className="transition-all duration-500"
              />
              <text x="320" y="470" textAnchor="middle" className="fill-secondary/30 text-[14px] font-serif tracking-widest uppercase">
                Rwanda
              </text>

              {/* Destination pins */}
              {enrichedDestinations.map((dest) => {
                const isActive = activeId === dest.id;
                return (
                  <g
                    key={dest.id}
                    className="cursor-pointer"
                    onClick={() => setActiveId(isActive ? null : dest.id)}
                  >
                    {/* Pulse ring */}
                    <circle
                      cx={dest.cx}
                      cy={dest.cy}
                      r={isActive ? 22 : 14}
                      fill={isActive ? "hsl(var(--secondary) / 0.15)" : "hsl(var(--secondary) / 0.08)"}
                      className="transition-all duration-500"
                    >
                      {!isActive && (
                        <animate
                          attributeName="r"
                          values="14;18;14"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      )}
                      {!isActive && (
                        <animate
                          attributeName="opacity"
                          values="1;0.3;1"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      )}
                    </circle>

                    {/* Pin dot */}
                    <circle
                      cx={dest.cx}
                      cy={dest.cy}
                      r={isActive ? 8 : 5}
                      fill={isActive ? "hsl(var(--secondary))" : "hsl(var(--primary))"}
                      stroke="white"
                      strokeWidth="2"
                      className="transition-all duration-300"
                    />

                    {/* Trip count badge */}
                    {dest.tripCount > 0 && (
                      <>
                        <circle
                          cx={dest.cx + 10}
                          cy={dest.cy - 10}
                          r="8"
                          fill="hsl(var(--secondary))"
                        />
                        <text
                          x={dest.cx + 10}
                          y={dest.cy - 6}
                          textAnchor="middle"
                          className="fill-secondary-foreground text-[9px] font-bold"
                        >
                          {dest.tripCount}
                        </text>
                      </>
                    )}

                    {/* Label */}
                    <text
                      x={dest.cx}
                      y={dest.cy + (isActive ? 32 : 22)}
                      textAnchor="middle"
                      className={`text-[10px] font-semibold transition-all duration-300 ${
                        isActive ? "fill-secondary" : "fill-foreground/60"
                      }`}
                    >
                      {dest.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Trip details panel */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeDest && activeTrips.length > 0 ? (
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Destination header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-foreground">
                        {activeDest.label}
                      </h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {activeDest.country} · {activeDest.tripCount} trip{activeDest.tripCount !== 1 ? "s" : ""} available
                      </p>
                    </div>
                  </div>

                  {/* Trip cards */}
                  <div className="space-y-4">
                    {activeTrips.map((trip, i) => (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          to={`/trip-search?destination=${trip.destination}`}
                          className="group flex gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-secondary/40 hover:shadow-lg hover:shadow-secondary/5 transition-all duration-300"
                        >
                          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={trip.image}
                              alt={trip.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground group-hover:text-secondary transition-colors line-clamp-1">
                              {trip.title}
                            </h4>
                            <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {trip.duration} days
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                                {trip.rating}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm font-bold text-foreground">
                                From ${trip.price.toLocaleString()}
                              </span>
                              <ArrowRight className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* View all link */}
                  <Link
                    to={`/trip-search?destination=${activeId}`}
                    className="inline-flex items-center gap-2 mt-6 text-secondary font-semibold text-sm hover:gap-3 transition-all"
                  >
                    View all trips in {activeDest.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <MapPin className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    Select a Destination
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Click on any pin on the map to explore available safari packages for that destination
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationMap;
