import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Mountain, Image as ImageIcon } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface TravelTopic {
    id: string;
    title: string;
    description: string | null;
    icon_name: string | null;
    image_url: string | null;
    trip_count: number | null;
    slug: string | null;
    is_published: boolean | null;
    sort_order: number | null;
}

const EMPTY_FORM = {
    title: "", description: "", icon_name: "Mountain",
    image_url: "", trip_count: 0, slug: "",
    is_published: true, sort_order: 0,
};

const ICON_OPTIONS = [
    "Mountain", "Binoculars", "Footprints", "Camera", "Trees",
    "Bike", "Leaf", "Bird", "Fish", "Tent",
];

export default function AdminTravelTopics() {
    const [items, setItems] = useState<TravelTopic[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState<TravelTopic | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const { toast } = useToast();

    const fetch_ = async () => {
        const { data } = await supabase
            .from("managed_travel_topics")
            .select("*")
            .order("sort_order");
        if (data) setItems(data as TravelTopic[]);
    };

    useEffect(() => { fetch_(); }, []);

    const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setDialogOpen(true); };
    const openEdit = (item: TravelTopic) => {
        setEditing(item);
        setForm({
            title: item.title, description: item.description || "",
            icon_name: item.icon_name || "Mountain", image_url: item.image_url || "",
            trip_count: item.trip_count ?? 0, slug: item.slug || "",
            is_published: item.is_published ?? true, sort_order: item.sort_order ?? 0,
        });
        setDialogOpen(true);
    };

    const generateSlug = (title: string) =>
        title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const handleTitleChange = (title: string) => {
        setForm((f) => ({ ...f, title, slug: f.slug || generateSlug(title) }));
    };

    const handleSave = async () => {
        if (!form.title.trim()) {
            toast({ title: "Title is required", variant: "destructive" });
            return;
        }
        const payload = { ...form, slug: form.slug || generateSlug(form.title) };
        if (editing) {
            await supabase.from("managed_travel_topics").update(payload).eq("id", editing.id);
            toast({ title: "Travel topic updated" });
        } else {
            await supabase.from("managed_travel_topics").insert(payload);
            toast({ title: "Travel topic added" });
        }
        setDialogOpen(false);
        fetch_();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this travel topic?")) return;
        await supabase.from("managed_travel_topics").delete().eq("id", id);
        toast({ title: "Deleted" });
        fetch_();
    };

    const handleTogglePublish = async (item: TravelTopic) => {
        await supabase
            .from("managed_travel_topics")
            .update({ is_published: !item.is_published })
            .eq("id", item.id);
        fetch_();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Manage Travel Topics</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {items.length} topics · {items.filter((t) => t.is_published).length} published
                    </p>
                </div>
                <Button onClick={openCreate} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <Plus className="h-4 w-4 mr-2" /> Add Topic
                </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                    >
                        <Card className={`group overflow-hidden ${!item.is_published ? "opacity-60 border-dashed" : ""}`}>
                            {/* Image */}
                            <div className="relative h-36 bg-muted overflow-hidden">
                                {item.image_url ? (
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                                        <ImageIcon className="h-12 w-12" />
                                    </div>
                                )}
                                {/* Overlay badges */}
                                <div className="absolute top-2 left-2 right-2 flex justify-between">
                                    <Badge className="bg-secondary/90 text-secondary-foreground text-xs">
                                        {item.trip_count ?? 0} trips
                                    </Badge>
                                    {!item.is_published && (
                                        <Badge variant="outline" className="bg-background/80 text-muted-foreground text-xs">
                                            Draft
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-display font-bold text-foreground truncate">{item.title}</h3>
                                        {item.description && (
                                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                                        )}
                                        {item.slug && (
                                            <p className="text-xs text-muted-foreground/60 mt-1 font-mono">/{item.slug}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-1 shrink-0">
                                        <Switch
                                            checked={item.is_published ?? true}
                                            onCheckedChange={() => handleTogglePublish(item)}
                                            title="Toggle published"
                                        />
                                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(item)}>
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive hover:text-destructive"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

                {items.length === 0 && (
                    <div className="col-span-full text-center py-16 text-muted-foreground">
                        <Mountain className="h-10 w-10 mx-auto mb-3 opacity-20" />
                        <p className="font-medium">No travel topics yet</p>
                        <p className="text-sm mt-1">Add your first topic to get started.</p>
                    </div>
                )}
            </div>

            {/* Add/Edit dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editing ? "Edit Travel Topic" : "Add Travel Topic"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Input
                            placeholder="Topic title *"
                            value={form.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                        />
                        <Textarea
                            placeholder="Short description"
                            rows={3}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                        <Input
                            placeholder="URL slug (auto-generated)"
                            value={form.slug}
                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                type="number"
                                min={0}
                                placeholder="Number of trips"
                                value={form.trip_count}
                                onChange={(e) => setForm({ ...form, trip_count: parseInt(e.target.value) || 0 })}
                            />
                            <Input
                                placeholder="Icon name"
                                value={form.icon_name}
                                onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
                                list="icon-options"
                            />
                            <datalist id="icon-options">
                                {ICON_OPTIONS.map((ico) => <option key={ico} value={ico} />)}
                            </datalist>
                        </div>

                        <Input
                            type="number"
                            placeholder="Sort order"
                            value={form.sort_order}
                            onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                        />

                        <ImageUpload
                            value={form.image_url}
                            onChange={(url) => setForm({ ...form, image_url: url })}
                            folder="travel-topics"
                        />

                        <div className="flex items-center gap-3">
                            <Switch
                                checked={form.is_published}
                                onCheckedChange={(v) => setForm({ ...form, is_published: v })}
                            />
                            <span className="text-sm">Published</span>
                        </div>

                        <div className="flex gap-3 justify-end pt-2">
                            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSave} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                {editing ? "Update" : "Add Topic"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
