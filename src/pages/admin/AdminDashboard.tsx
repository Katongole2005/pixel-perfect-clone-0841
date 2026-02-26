import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Map, Newspaper, MessageSquare, Handshake, Star, TrendingUp, Eye } from "lucide-react";

interface Stats {
  trips: number;
  news: number;
  messages: number;
  unreadMessages: number;
  partners: number;
  testimonials: number;
}

const statCards = [
  { key: "trips" as const, label: "Total Trips", icon: Map, color: "bg-secondary/10 text-secondary" },
  { key: "news" as const, label: "News Articles", icon: Newspaper, color: "bg-primary/10 text-primary" },
  { key: "messages" as const, label: "Total Messages", icon: MessageSquare, color: "bg-godka-sage/10 text-godka-sage" },
  { key: "unreadMessages" as const, label: "Unread Messages", icon: Eye, color: "bg-destructive/10 text-destructive" },
  { key: "partners" as const, label: "Partners", icon: Handshake, color: "bg-godka-amber/10 text-godka-amber" },
  { key: "testimonials" as const, label: "Testimonials", icon: Star, color: "bg-godka-gold/10 text-godka-gold" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ trips: 0, news: 0, messages: 0, unreadMessages: 0, partners: 0, testimonials: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [trips, news, messages, unread, partners, testimonials] = await Promise.all([
        supabase.from("managed_trips").select("id", { count: "exact", head: true }),
        supabase.from("managed_news").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("is_read", false),
        supabase.from("managed_partners").select("id", { count: "exact", head: true }),
        supabase.from("managed_testimonials").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        trips: trips.count ?? 0,
        news: news.count ?? 0,
        messages: messages.count ?? 0,
        unreadMessages: unread.count ?? 0,
        partners: partners.count ?? 0,
        testimonials: testimonials.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Welcome Back</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your site content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <card.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stats[card.key]}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              Quick Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Use the <strong>Trips</strong> section to add, edit, or remove safari packages.</p>
            <p>• Manage your <strong>News</strong> articles to keep visitors informed about latest updates.</p>
            <p>• Check <strong>Messages</strong> regularly for customer inquiries.</p>
            <p>• Update <strong>Site Settings</strong> to change hero content and general information.</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
