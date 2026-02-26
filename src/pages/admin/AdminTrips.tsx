import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

const destinations = [
  { value: "bwindi", label: "Bwindi Impenetrable National Park" },
  { value: "queen-elizabeth", label: "Queen Elizabeth National Park" },
  { value: "murchison", label: "Murchison Falls National Park" },
  { value: "kibale", label: "Kibale Forest National Park" },
  { value: "rwenzori", label: "Rwenzori Mountains National Park" },
  { value: "volcanoes", label: "Volcanoes National Park" },
  { value: "mgahinga", label: "Mgahinga National Park" },
  { value: "lake-mburo", label: "Lake Mburo National Park" },
  { value: "nyungwe", label: "Nyungwe Forest National Park" },
  { value: "akagera", label: "Akagera National Park" },
];

const themes = [
  { value: "gorilla-trekking", label: "Gorilla Trekking" },
  { value: "safari-tours", label: "Safari Tours" },
  { value: "trekking-hiking", label: "Trekking & Hiking" },
  { value: "fly-in-safari", label: "Fly-in Safari" },
  { value: "active-travel", label: "Active Travel" },
  { value: "bike-tours", label: "Bike & Mountain Bike Tours" },
];

interface Trip {
  id: string;
  title: string;
  destination: string;
  destination_label: string;
  theme: string;
  theme_label: string;
  duration: number;
  price: number;
  image_url: string | null;
  description: string | null;
  highlights: string[];
  available_months: string[];
  rating: number | null;
  review_count: number | null;
  is_published: boolean | null;
  sort_order: number | null;
}

const emptyTrip: Omit<Trip, "id"> = {
  title: "",
  destination: "",
  destination_label: "",
  theme: "",
  theme_label: "",
  duration: 3,
  price: 0,
  image_url: "",
  description: "",
  highlights: [],
  available_months: [],
  rating: 5,
  review_count: 0,
  is_published: true,
  sort_order: 0,
};

export default function AdminTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [form, setForm] = useState(emptyTrip);
  const [highlightsText, setHighlightsText] = useState("");
  const { toast } = useToast();

  const fetchTrips = async () => {
    const { data } = await supabase.from("managed_trips").select("*").order("sort_order");
    if (data) setTrips(data as Trip[]);
  };

  useEffect(() => { fetchTrips(); }, []);

  const openCreate = () => {
    setEditingTrip(null);
    setForm(emptyTrip);
    setHighlightsText("");
    setDialogOpen(true);
  };

  const openEdit = (trip: Trip) => {
    setEditingTrip(trip);
    setForm({ ...trip });
    setHighlightsText((trip.highlights || []).join("\n"));
    setDialogOpen(true);
  };

  const handleDestinationChange = (val: string) => {
    const dest = destinations.find((d) => d.value === val);
    setForm((f) => ({ ...f, destination: val, destination_label: dest?.label || val }));
  };

  const handleThemeChange = (val: string) => {
    const th = themes.find((t) => t.value === val);
    setForm((f) => ({ ...f, theme: val, theme_label: th?.label || val }));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.destination || !form.theme) {
      toast({ title: "Missing fields", description: "Title, destination, and theme are required.", variant: "destructive" });
      return;
    }
    const payload = {
      ...form,
      highlights: highlightsText.split("\n").map((h) => h.trim()).filter(Boolean),
    };

    if (editingTrip) {
      const { error } = await supabase.from("managed_trips").update(payload).eq("id", editingTrip.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Trip updated" });
    } else {
      const { error } = await supabase.from("managed_trips").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Trip created" });
    }
    setDialogOpen(false);
    fetchTrips();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this trip?")) return;
    await supabase.from("managed_trips").delete().eq("id", id);
    toast({ title: "Trip deleted" });
    fetchTrips();
  };

  const filtered = trips.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.destination_label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Manage Trips</h1>
          <p className="text-muted-foreground text-sm">{trips.length} trips total</p>
        </div>
        <Button onClick={openCreate} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" /> Add Trip
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search trips..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((trip, i) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                {trip.image_url && (
                  <img src={trip.image_url} alt={trip.title} className="w-20 h-14 rounded-md object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{trip.title}</h3>
                  <p className="text-sm text-muted-foreground">{trip.destination_label} • {trip.duration} days • ${trip.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${trip.is_published ? "bg-godka-sage/10 text-godka-sage" : "bg-muted text-muted-foreground"}`}>
                    {trip.is_published ? "Published" : "Draft"}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => openEdit(trip)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(trip.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No trips found. Create your first trip!</div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTrip ? "Edit Trip" : "Create New Trip"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Trip title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Destination</label>
                <Select value={form.destination} onValueChange={handleDestinationChange}>
                  <SelectTrigger><SelectValue placeholder="Select destination" /></SelectTrigger>
                  <SelectContent>
                    {destinations.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Theme</label>
                <Select value={form.theme} onValueChange={handleThemeChange}>
                  <SelectTrigger><SelectValue placeholder="Select theme" /></SelectTrigger>
                  <SelectContent>
                    {themes.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Duration (days)</label>
                <Input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) || 0 })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Price ($)</label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Rating</label>
                <Input type="number" step="0.1" min="0" max="5" value={form.rating ?? 5} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Image</label>
              <ImageUpload value={form.image_url || ""} onChange={(url) => setForm({ ...form, image_url: url })} folder="trips" />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
              <Textarea rows={3} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Highlights (one per line)</label>
              <Textarea rows={4} value={highlightsText} onChange={(e) => setHighlightsText(e.target.value)} placeholder={"Gorilla permit included\nLuxury lodge stay\nExpert guide"} />
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={form.is_published ?? true} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
              <span className="text-sm text-foreground">Published</span>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                {editingTrip ? "Update Trip" : "Create Trip"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
