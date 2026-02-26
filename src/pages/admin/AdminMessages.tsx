import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Search, Mail, MailOpen, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean | null;
  created_at: string;
}

export default function AdminMessages() {
  const [items, setItems] = useState<Message[]>([]);
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<Message | null>(null);
  const { toast } = useToast();

  const fetch_ = async () => {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    if (data) setItems(data as Message[]);
  };
  useEffect(() => { fetch_(); }, []);

  const markRead = async (msg: Message) => {
    await supabase.from("contact_messages").update({ is_read: true }).eq("id", msg.id);
    setViewing({ ...msg, is_read: true });
    fetch_();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    toast({ title: "Message deleted" });
    setViewing(null);
    fetch_();
  };

  const filtered = items.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    (m.subject || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Messages</h1>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search messages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid gap-3">
        {filtered.map((msg, i) => (
          <motion.div key={msg.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className={!msg.is_read ? "border-secondary/50 bg-secondary/5" : ""}>
              <CardContent className="p-4 flex items-center gap-4 cursor-pointer" onClick={() => { setViewing(msg); if (!msg.is_read) markRead(msg); }}>
                <div className={`p-2 rounded-full ${!msg.is_read ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"}`}>
                  {msg.is_read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold truncate ${!msg.is_read ? "text-foreground" : "text-muted-foreground"}`}>{msg.name}</h3>
                    {!msg.is_read && <Badge className="bg-secondary text-secondary-foreground text-xs">New</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{msg.subject || msg.message}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{format(new Date(msg.created_at), "MMM d, yyyy")}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground">No messages yet.</div>}
      </div>

      <Dialog open={!!viewing} onOpenChange={(open) => { if (!open) setViewing(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Message from {viewing?.name}</DialogTitle></DialogHeader>
          {viewing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{viewing.email}</span></div>
                {viewing.phone && <div><span className="text-muted-foreground">Phone:</span> <span className="text-foreground">{viewing.phone}</span></div>}
                {viewing.subject && <div className="col-span-2"><span className="text-muted-foreground">Subject:</span> <span className="text-foreground">{viewing.subject}</span></div>}
                <div className="col-span-2"><span className="text-muted-foreground">Date:</span> <span className="text-foreground">{format(new Date(viewing.created_at), "PPpp")}</span></div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-sm text-foreground whitespace-pre-wrap">{viewing.message}</div>
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => handleDelete(viewing.id)} className="text-destructive hover:text-destructive">
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
