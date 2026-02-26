import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number | null;
  is_active: boolean | null;
}

export default function AdminPartners() {
  const [items, setItems] = useState<Partner[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [form, setForm] = useState({ name: "", logo_url: "", website_url: "", sort_order: 0, is_active: true });
  const { toast } = useToast();

  const fetch_ = async () => {
    const { data } = await supabase.from("managed_partners").select("*").order("sort_order");
    if (data) setItems(data as Partner[]);
  };
  useEffect(() => { fetch_(); }, []);

  const openCreate = () => { setEditing(null); setForm({ name: "", logo_url: "", website_url: "", sort_order: 0, is_active: true }); setDialogOpen(true); };
  const openEdit = (item: Partner) => { setEditing(item); setForm({ name: item.name, logo_url: item.logo_url || "", website_url: item.website_url || "", sort_order: item.sort_order ?? 0, is_active: item.is_active ?? true }); setDialogOpen(true); };

  const handleSave = async () => {
    if (!form.name.trim()) { toast({ title: "Name is required", variant: "destructive" }); return; }
    if (editing) {
      await supabase.from("managed_partners").update(form).eq("id", editing.id);
      toast({ title: "Partner updated" });
    } else {
      await supabase.from("managed_partners").insert(form);
      toast({ title: "Partner added" });
    }
    setDialogOpen(false); fetch_();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this partner?")) return;
    await supabase.from("managed_partners").delete().eq("id", id);
    toast({ title: "Partner deleted" }); fetch_();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-foreground">Manage Partners</h1>
        <Button onClick={openCreate} className="bg-secondary text-secondary-foreground hover:bg-secondary/90"><Plus className="h-4 w-4 mr-2" /> Add Partner</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-4 text-center space-y-3">
                {item.logo_url && <img src={item.logo_url} alt={item.name} className="h-16 mx-auto object-contain" />}
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <div className="flex justify-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      {items.length === 0 && <div className="text-center py-12 text-muted-foreground">No partners yet.</div>}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Partner" : "Add Partner"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Partner name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Logo URL" value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} />
            <Input placeholder="Website URL" value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} />
            <Input type="number" placeholder="Sort order" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
            <div className="flex items-center gap-3">
              <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
              <span className="text-sm">Active</span>
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
