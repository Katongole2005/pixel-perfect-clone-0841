import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Star } from "lucide-react";

interface Testimonial {
  id: string;
  author_name: string;
  author_title: string | null;
  content: string;
  rating: number | null;
  image_url: string | null;
  is_published: boolean | null;
  sort_order: number | null;
}

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ author_name: "", author_title: "", content: "", rating: 5, image_url: "", is_published: true, sort_order: 0 });
  const { toast } = useToast();

  const fetch_ = async () => {
    const { data } = await supabase.from("managed_testimonials").select("*").order("sort_order");
    if (data) setItems(data as Testimonial[]);
  };
  useEffect(() => { fetch_(); }, []);

  const openCreate = () => { setEditing(null); setForm({ author_name: "", author_title: "", content: "", rating: 5, image_url: "", is_published: true, sort_order: 0 }); setDialogOpen(true); };
  const openEdit = (item: Testimonial) => { setEditing(item); setForm({ author_name: item.author_name, author_title: item.author_title || "", content: item.content, rating: item.rating ?? 5, image_url: item.image_url || "", is_published: item.is_published ?? true, sort_order: item.sort_order ?? 0 }); setDialogOpen(true); };

  const handleSave = async () => {
    if (!form.author_name.trim() || !form.content.trim()) { toast({ title: "Name and content required", variant: "destructive" }); return; }
    if (editing) {
      await supabase.from("managed_testimonials").update(form).eq("id", editing.id);
      toast({ title: "Testimonial updated" });
    } else {
      await supabase.from("managed_testimonials").insert(form);
      toast({ title: "Testimonial added" });
    }
    setDialogOpen(false); fetch_();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("managed_testimonials").delete().eq("id", id);
    toast({ title: "Deleted" }); fetch_();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Manage Testimonials</h1>
        <Button onClick={openCreate} className="bg-secondary text-secondary-foreground hover:bg-secondary/90"><Plus className="h-4 w-4 mr-2" /> Add</Button>
      </div>
      <div className="grid gap-4">
        {items.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-4 flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{item.author_name}</h3>
                    {item.author_title && <span className="text-sm text-muted-foreground">— {item.author_title}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: item.rating ?? 5 }).map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {items.length === 0 && <div className="text-center py-12 text-muted-foreground">No testimonials yet.</div>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Author name" value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} />
            <Input placeholder="Author title (optional)" value={form.author_title} onChange={(e) => setForm({ ...form, author_title: e.target.value })} />
            <Textarea placeholder="Testimonial content" rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            <Input type="number" min={1} max={5} placeholder="Rating (1-5)" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} />
            <Input placeholder="Image URL (optional)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
            <div className="flex items-center gap-3">
              <Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
              <span className="text-sm">Published</span>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">{editing ? "Update" : "Add"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
