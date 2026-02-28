import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Map, Newspaper, MessageSquare, Handshake, Star, Eye, Plane,
  ArrowRight, Clock, Users, DollarSign, Mountain
} from "lucide-react";
import { format } from "date-fns";

interface Stats {
  trips: number;
  news: number;
  messages: number;
  unreadMessages: number;
  partners: number;
  testimonials: number;
  tripRequests: number;
  unreadTripRequests: number;
  reviews: number;
  travelTopics: number;
}

interface RecentTripRequest {
  id: string;
  name: string;
  email: string;
  duration_days: number;
  num_adults: number;
  num_children: number;
  budget_per_person: number;
  is_read: boolean | null;
  created_at: string;
}

interface RecentMessage {
  id: string;
  name: string;
  subject: string | null;
  is_read: boolean | null;
  created_at: string;
}

const statCards = [
  { key: "tripRequests" as const, label: "Trip Requests", icon: Plane, color: "bg-secondary/10 text-secondary", path: "/admin/trip-requests" },
  { key: "unreadTripRequests" as const, label: "Unread Requests", icon: Eye, color: "bg-destructive/10 text-destructive", path: "/admin/trip-requests" },
  { key: "trips" as const, label: "Total Trips", icon: Map, color: "bg-primary/10 text-primary", path: "/admin/trips" },
  { key: "news" as const, label: "News Articles", icon: Newspaper, color: "bg-muted-foreground/10 text-muted-foreground", path: "/admin/news" },
  { key: "messages" as const, label: "Contact Messages", icon: MessageSquare, color: "bg-primary/10 text-primary", path: "/admin/messages" },
  { key: "unreadMessages" as const, label: "Unread Messages", icon: Eye, color: "bg-destructive/10 text-destructive", path: "/admin/messages" },
  { key: "reviews" as const, label: "Reviews", icon: Star, color: "bg-secondary/10 text-secondary", path: "/admin/reviews" },
  { key: "travelTopics" as const, label: "Travel Topics", icon: Mountain, color: "bg-primary/10 text-primary", path: "/admin/travel-topics" },
  { key: "partners" as const, label: "Partners", icon: Handshake, color: "bg-secondary/10 text-secondary", path: "/admin/partners" },
  { key: "testimonials" as const, label: "Testimonials", icon: Star, color: "bg-secondary/10 text-secondary", path: "/admin/testimonials" },
];

const quickActions = [
  { label: "Trip Requests", desc: "View & manage incoming trip inquiries", icon: Plane, path: "/admin/trip-requests", accent: "bg-secondary/10 text-secondary" },
  { label: "Manage Trips", desc: "Add, edit or remove safari packages", icon: Map, path: "/admin/trips", accent: "bg-primary/10 text-primary" },
  { label: "Reviews", desc: "Manage guest reviews and ratings", icon: Star, path: "/admin/reviews", accent: "bg-secondary/10 text-secondary" },
  { label: "Travel Topics", desc: "Edit travel category cards", icon: Mountain, path: "/admin/travel-topics", accent: "bg-primary/10 text-primary" },
  { label: "News & Updates", desc: "Publish articles and press releases", icon: Newspaper, path: "/admin/news", accent: "bg-muted-foreground/10 text-muted-foreground" },
  { label: "Testimonials", desc: "Curate traveler testimonials", icon: Star, path: "/admin/testimonials", accent: "bg-secondary/10 text-secondary" },
  { label: "Partners", desc: "Manage partner logos & links", icon: Handshake, path: "/admin/partners", accent: "bg-primary/10 text-primary" },
  { label: "Contact Messages", desc: "Read customer inquiries", icon: MessageSquare, path: "/admin/messages", accent: "bg-muted-foreground/10 text-muted-foreground" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    trips: 0, news: 0, messages: 0, unreadMessages: 0,
    partners: 0, testimonials: 0, tripRequests: 0, unreadTripRequests: 0,
    reviews: 0, travelTopics: 0,
  });
  const [recentRequests, setRecentRequests] = useState<RecentTripRequest[]>([]);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [trips, news, messages, unread, partners, testimonials, tripReqs, unreadReqs, reviews, travelTopics, latestReqs, latestMsgs] =
        await Promise.all([
          supabase.from("managed_trips").select("id", { count: "exact", head: true }),
          supabase.from("managed_news").select("id", { count: "exact", head: true }),
          supabase.from("contact_messages").select("id", { count: "exact", head: true }),
          supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("is_read", false),
          supabase.from("managed_partners").select("id", { count: "exact", head: true }),
          supabase.from("managed_testimonials").select("id", { count: "exact", head: true }),
          supabase.from("trip_requests").select("id", { count: "exact", head: true }),
          supabase.from("trip_requests").select("id", { count: "exact", head: true }).eq("is_read", false),
          supabase.from("managed_reviews").select("id", { count: "exact", head: true }),
          supabase.from("managed_travel_topics").select("id", { count: "exact", head: true }),
          supabase.from("trip_requests").select("id, name, email, duration_days, num_adults, num_children, budget_per_person, is_read, created_at").order("created_at", { ascending: false }).limit(5),
          supabase.from("contact_messages").select("id, name, subject, is_read, created_at").order("created_at", { ascending: false }).limit(5),
        ]);

      setStats({
        trips: trips.count ?? 0,
        news: news.count ?? 0,
        messages: messages.count ?? 0,
        unreadMessages: unread.count ?? 0,
        partners: partners.count ?? 0,
        testimonials: testimonials.count ?? 0,
        tripRequests: tripReqs.count ?? 0,
        unreadTripRequests: unreadReqs.count ?? 0,
        reviews: reviews.count ?? 0,
        travelTopics: travelTopics.count ?? 0,
      });
      if (latestReqs.data) setRecentRequests(latestReqs.data as RecentTripRequest[]);
      if (latestMsgs.data) setRecentMessages(latestMsgs.data as RecentMessage[]);
    };
    fetchAll();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your site content and activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
          >
            <Card
              className="cursor-pointer hover:shadow-md hover:border-secondary/30 transition-all"
              onClick={() => navigate(card.path)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${card.color}`}>
                    <card.icon className="h-4 w-4" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">{stats[card.key]}</span>
                </div>
                <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h2 className="text-lg font-display font-semibold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Card
              key={action.path}
              className="cursor-pointer hover:shadow-md hover:border-secondary/30 transition-all group"
              onClick={() => navigate(action.path)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${action.accent} shrink-0`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm">{action.label}</h3>
                  <p className="text-xs text-muted-foreground">{action.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all shrink-0" />
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity - Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trip Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Plane className="h-4 w-4 text-secondary" />
                Recent Trip Requests
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-secondary hover:text-secondary text-xs"
                onClick={() => navigate("/admin/trip-requests")}
              >
                View All <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {recentRequests.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No trip requests yet.</p>
              ) : (
                recentRequests.map((req) => (
                  <div
                    key={req.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${!req.is_read ? "bg-secondary/5 border border-secondary/20" : "border border-transparent"
                      }`}
                    onClick={() => navigate("/admin/trip-requests")}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground truncate">{req.name}</span>
                        {!req.is_read && (
                          <Badge className="bg-secondary text-secondary-foreground text-[10px] px-1.5 py-0">New</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {req.duration_days}d · {req.num_adults + req.num_children} pax · ${req.budget_per_person}/pp
                      </p>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {format(new Date(req.created_at), "MMM d")}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Contact Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Recent Messages
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-secondary hover:text-secondary text-xs"
                onClick={() => navigate("/admin/messages")}
              >
                View All <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {recentMessages.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No messages yet.</p>
              ) : (
                recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${!msg.is_read ? "bg-secondary/5 border border-secondary/20" : "border border-transparent"
                      }`}
                    onClick={() => navigate("/admin/messages")}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground truncate">{msg.name}</span>
                        {!msg.is_read && (
                          <Badge className="bg-secondary text-secondary-foreground text-[10px] px-1.5 py-0">New</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {msg.subject || "No subject"}
                      </p>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {format(new Date(msg.created_at), "MMM d")}
                    </span>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
