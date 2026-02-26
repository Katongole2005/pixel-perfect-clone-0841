import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Search, Mail, MailOpen, Trash2, Calendar, Users, DollarSign, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";

interface TripRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  num_adults: number;
  num_children: number;
  budget_per_person: number;
  duration_days: number;
  earliest_arrival: string;
  latest_arrival: string;
  guide_language: string;
  travel_types: string[] | null;
  travel_experience: string[] | null;
  animals: string[] | null;
  other_destinations: string[] | null;
  message: string | null;
  is_read: boolean | null;
  created_at: string;
}

export default function AdminTripRequests() {
  const [items, setItems] = useState<TripRequest[]>([]);
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<TripRequest | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const { toast } = useToast();

  const fetchItems = async () => {
    const { data } = await supabase
      .from("trip_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setItems(data as TripRequest[]);
  };

  useEffect(() => { fetchItems(); }, []);

  const markRead = async (item: TripRequest) => {
    await supabase.from("trip_requests").update({ is_read: true }).eq("id", item.id);
    setViewing({ ...item, is_read: true });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this trip request?")) return;
    await supabase.from("trip_requests").delete().eq("id", id);
    toast({ title: "Trip request deleted" });
    setViewing(null);
    fetchItems();
  };

  const filtered = items
    .filter((m) => {
      if (filter === "unread") return !m.is_read;
      if (filter === "read") return m.is_read;
      return true;
    })
    .filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
    );

  const unreadCount = items.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Trip Requests</h1>
          <p className="text-muted-foreground text-sm">
            {items.length} total · {unreadCount} unread
          </p>
        </div>
        <div className="flex gap-2">
          {(["all", "unread", "read"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className={filter === f ? "bg-secondary text-secondary-foreground" : ""}
            >
              {f === "all" ? "All" : f === "unread" ? `Unread (${unreadCount})` : "Read"}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-3">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card
              className={`cursor-pointer transition-colors hover:border-secondary/30 ${
                !item.is_read ? "border-secondary/50 bg-secondary/5" : ""
              }`}
              onClick={() => {
                setViewing(item);
                if (!item.is_read) markRead(item);
              }}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div
                  className={`p-2 rounded-full shrink-0 ${
                    !item.is_read
                      ? "bg-secondary/10 text-secondary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.is_read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-semibold truncate ${
                        !item.is_read ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </h3>
                    {!item.is_read && (
                      <Badge className="bg-secondary text-secondary-foreground text-xs">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {item.duration_days} days · {item.num_adults + item.num_children} travelers · $
                    {item.budget_per_person}/person
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-muted-foreground block">
                    {format(new Date(item.created_at), "MMM d, yyyy")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(item.created_at), "h:mm a")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {filter === "unread" ? "No unread trip requests." : "No trip requests yet."}
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!viewing} onOpenChange={(open) => { if (!open) setViewing(null); }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Trip Request from {viewing?.name}
              {viewing && !viewing.is_read && (
                <Badge className="bg-secondary text-secondary-foreground text-xs">Unread</Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          {viewing && (
            <div className="space-y-5">
              {/* Contact Info */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                  Contact Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>{" "}
                    <span className="text-foreground font-medium">{viewing.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    <a href={`mailto:${viewing.email}`} className="text-secondary hover:underline">
                      {viewing.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone:</span>{" "}
                    <a href={`tel:${viewing.phone}`} className="text-secondary hover:underline">
                      {viewing.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Language:</span>{" "}
                    <span className="text-foreground">{viewing.guide_language}</span>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <Clock className="h-4 w-4 mx-auto text-secondary mb-1" />
                  <p className="text-lg font-bold text-foreground">{viewing.duration_days}</p>
                  <p className="text-xs text-muted-foreground">Days</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <Users className="h-4 w-4 mx-auto text-secondary mb-1" />
                  <p className="text-lg font-bold text-foreground">
                    {viewing.num_adults}+{viewing.num_children}
                  </p>
                  <p className="text-xs text-muted-foreground">Adults+Kids</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <DollarSign className="h-4 w-4 mx-auto text-secondary mb-1" />
                  <p className="text-lg font-bold text-foreground">${viewing.budget_per_person}</p>
                  <p className="text-xs text-muted-foreground">Per Person</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3 text-center">
                  <Calendar className="h-4 w-4 mx-auto text-secondary mb-1" />
                  <p className="text-sm font-bold text-foreground">
                    {format(new Date(viewing.earliest_arrival), "MMM d")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    – {format(new Date(viewing.latest_arrival), "MMM d")}
                  </p>
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-3">
                {viewing.travel_types && viewing.travel_types.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Travel Types
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {viewing.travel_types.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {viewing.animals && viewing.animals.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Animals of Interest
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {viewing.animals.map((a) => (
                        <Badge key={a} variant="outline" className="text-xs">
                          {a}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {viewing.other_destinations && viewing.other_destinations.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Other Destinations
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {viewing.other_destinations.map((d) => (
                        <Badge key={d} variant="outline" className="text-xs">
                          {d}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {viewing.travel_experience && viewing.travel_experience.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Travel Experience
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {viewing.travel_experience.map((e) => (
                        <Badge key={e} variant="outline" className="text-xs">
                          {e}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Message */}
              {viewing.message && (
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Additional Message
                  </h4>
                  <div className="bg-muted/50 rounded-xl p-4 text-sm text-foreground whitespace-pre-wrap">
                    {viewing.message}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  Submitted {format(new Date(viewing.created_at), "PPpp")}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(viewing.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
