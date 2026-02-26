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
import { Plus, Pencil, Trash2, Search } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category: string | null;
  is_published: boolean | null;
  published_at: string | null;
  created_at: string;
}

export default function AdminNews() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", image_url: "", category: "news", is_published: true });
  const { toast } = useToast();

  const fetch_ = async () => {
    const { data } = await supabase.from("managed_news").select("*").order("created_at", { ascending: false });
    if (data) setItems(data as NewsItem[]);
  };
  useEffect(() => { fetch_(); }, []);

  const openCreate = () => { setEditing(null); setForm({ title: "", excerpt: "", content: "", image_url: "", category: "news", is_published: true }); setDialogOpen(true); };
  const openEdit = (item: NewsItem) => {
    setEditing(item);
    setForm({ title: item.title, excerpt: item.excerpt || "", content: item.content || "", image_url: item.image_url || "", category: item.category || "news", is_published: item.is_published ?? true });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast({ title: "Title is required", variant: "destructive" }); return; }
    if (editing) {
      const { error } = await supabase.from("managed_news").update(form).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Article updated" });
    } else {
      const { error } = await supabase.from("managed_news").insert(form);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Article created" });
    }
    setDialogOpen(false);
    fetch_();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    await supabase.from("managed_news").delete().eq("id", id);
    toast({ title: "Article deleted" });
    fetch_();
  };

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-display font-bold text-foreground">Manage News</h1>
        <Button onClick={openCreate} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Plus className="h-4 w-4 mr-2" /> Add Article
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid gap-4">
        {filtered.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                {item.image_url && <img src={item.image_url} alt={item.title} className="w-20 h-14 rounded-md object-cover shrink-0" />}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{item.excerpt || "No excerpt"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${item.is_published ? "bg-godka-sage/10 text-godka-sage" : "bg-muted text-muted-foreground"}`}>
                    {item.is_published ? "Published" : "Draft"}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground">No articles found.</div>}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Article" : "Create Article"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Article title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
            <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Textarea placeholder="Excerpt / summary" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            <Textarea placeholder="Full content" rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            <div className="flex items-center gap-3">
              <Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
              <span className="text-sm text-foreground">Published</span>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">{editing ? "Update" : "Create"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
