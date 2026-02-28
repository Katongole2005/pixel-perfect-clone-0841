import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Star, CheckCircle2, MapPin, Search, Filter } from "lucide-react";

interface Review {
    id: string;
    author: string;
    location: string | null;
    date: string | null;
    rating: number;
    title: string;
    content: string;
    trip: string | null;
    trip_type: string | null;
    verified: boolean | null;
    helpful_count: number | null;
    is_published: boolean | null;
    sort_order: number | null;
}

const TRIP_TYPES = ["Gorilla Trekking", "Safari", "Wildlife", "Adventure", "Cultural", "Specialized"];
const EMPTY_FORM = {
    author: "", location: "", date: "", rating: 5, title: "", content: "",
    trip: "", trip_type: "Safari", verified: true, helpful_count: 0,
    is_published: true, sort_order: 0,
};

export default function AdminReviews() {
    const [items, setItems] = useState<Review[]>([]);
    const [filtered, setFiltered] = useState<Review[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState<Review | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const { toast } = useToast();

    const fetch_ = async () => {
        const { data } = await supabase
            .from("managed_reviews")
            .select("*")
            .order("sort_order");
        if (data) setItems(data as Review[]);
    };

    useEffect(() => { fetch_(); }, []);

    useEffect(() => {
        setFiltered(items.filter((r) => {
            const matchesType = typeFilter === "All" || r.trip_type === typeFilter;
            const matchesSearch =
                r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.content.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesType && matchesSearch;
        }));
    }, [items, searchQuery, typeFilter]);

    const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setDialogOpen(true); };
    const openEdit = (item: Review) => {
        setEditing(item);
        setForm({
            author: item.author, location: item.location || "", date: item.date || "",
            rating: item.rating, title: item.title, content: item.content,
            trip: item.trip || "", trip_type: item.trip_type || "Safari",
            verified: item.verified ?? true, helpful_count: item.helpful_count ?? 0,
            is_published: item.is_published ?? true, sort_order: item.sort_order ?? 0,
        });
        setDialogOpen(true);
    };

    const handleSave = async () => {
        if (!form.author.trim() || !form.title.trim() || !form.content.trim()) {
            toast({ title: "Author, title and content are required", variant: "destructive" });
            return;
        }
        if (editing) {
            await supabase.from("managed_reviews").update(form).eq("id", editing.id);
            toast({ title: "Review updated" });
        } else {
            await supabase.from("managed_reviews").insert(form);
            toast({ title: "Review added" });
        }
        setDialogOpen(false);
        fetch_();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this review?")) return;
        await supabase.from("managed_reviews").delete().eq("id", id);
        toast({ title: "Review deleted" });
        fetch_();
    };

    const handleTogglePublish = async (item: Review) => {
        await supabase.from("managed_reviews").update({ is_published: !item.is_published }).eq("id", item.id);
        fetch_();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Manage Reviews</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">{items.length} total reviews · {items.filter(r => r.is_published).length} published</p>
                </div>
                <Button onClick={openCreate} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <Plus className="h-4 w-4 mr-2" /> Add Review
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by author, title or content..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Trip type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        {TRIP_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            {/* Reviews List */}
            <div className="grid gap-3">
                {filtered.map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                        <Card className={!item.is_published ? "opacity-60 border-dashed" : ""}>
                            <CardContent className="p-4">
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold shrink-0">
                                        {item.author.charAt(0)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="font-semibold text-foreground">{item.author}</span>
                                            {item.verified && <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />}
                                            {item.location && (
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <MapPin className="h-3 w-3" />{item.location}
                                                </span>
                                            )}
                                            {item.trip_type && (
                                                <Badge variant="secondary" className="text-[10px] py-0 px-2 uppercase tracking-tight">
                                                    {item.trip_type}
                                                </Badge>
                                            )}
                                            {!item.is_published && (
                                                <Badge variant="outline" className="text-[10px] py-0 px-2 text-muted-foreground">
                                                    Draft
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex gap-0.5 mb-2">
                                            {Array.from({ length: item.rating }).map((_, j) => (
                                                <Star key={j} className="h-3 w-3 fill-secondary text-secondary" />
                                            ))}
                                        </div>

                                        <p className="font-medium text-sm text-foreground mb-1">{item.title}</p>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>

                                        {item.trip && (
                                            <p className="text-xs text-muted-foreground mt-1">Trip: {item.trip}</p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-1 shrink-0">
                                        <Switch
                                            checked={item.is_published ?? true}
                                            onCheckedChange={() => handleTogglePublish(item)}
                                            title="Toggle published"
                                        />
                                        <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <Star className="h-10 w-10 mx-auto mb-3 opacity-20" />
                        <p className="font-medium">No reviews found</p>
                        <p className="text-sm mt-1">Try adjusting your search or add your first review.</p>
                    </div>
                )}
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editing ? "Edit Review" : "Add Review"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <Input placeholder="Author name *" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
                            <Input placeholder="Location (e.g. USA)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Input placeholder="Date (e.g. Feb 12, 2024)" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground shrink-0">Rating:</span>
                                <Select value={String(form.rating)} onValueChange={(v) => setForm({ ...form, rating: parseInt(v) })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <SelectItem key={n} value={String(n)}>
                                                {n} {n === 1 ? "star" : "stars"}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Input placeholder="Review title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        <Textarea placeholder="Review content *" rows={5} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />

                        <div className="grid grid-cols-2 gap-3">
                            <Input placeholder="Trip name" value={form.trip} onChange={(e) => setForm({ ...form, trip: e.target.value })} />
                            <Select value={form.trip_type} onValueChange={(v) => setForm({ ...form, trip_type: v })}>
                                <SelectTrigger><SelectValue placeholder="Trip type" /></SelectTrigger>
                                <SelectContent>
                                    {TRIP_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <Input type="number" min={0} placeholder="Helpful count" value={form.helpful_count} onChange={(e) => setForm({ ...form, helpful_count: parseInt(e.target.value) || 0 })} />
                        <Input type="number" placeholder="Sort order" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />

                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <Switch checked={form.verified} onCheckedChange={(v) => setForm({ ...form, verified: v })} />
                                <span className="text-sm">Verified traveler</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
                                <span className="text-sm">Published</span>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end pt-2">
                            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSave} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                {editing ? "Update Review" : "Add Review"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
