import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Save } from "lucide-react";

interface HeroSettings {
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
}

interface ContactSettings {
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
}

export default function AdminSettings() {
  const [hero, setHero] = useState<HeroSettings>({ title: "", subtitle: "", cta_text: "", cta_link: "" });
  const [contact, setContact] = useState<ContactSettings>({ email: "", phone: "", address: "", whatsapp: "" });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetch_ = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        data.forEach((row: any) => {
          if (row.setting_key === "hero") setHero(row.setting_value as HeroSettings);
          if (row.setting_key === "contact") setContact(row.setting_value as ContactSettings);
        });
      }
    };
    fetch_();
  }, []);

  const saveSetting = async (key: string, value: any) => {
    setSaving(true);
    const { data: existing } = await supabase.from("site_settings").select("id").eq("setting_key", key).maybeSingle();
    if (existing) {
      await supabase.from("site_settings").update({ setting_value: value }).eq("setting_key", key);
    } else {
      await supabase.from("site_settings").insert({ setting_key: key, setting_value: value });
    }
    setSaving(false);
    toast({ title: "Settings saved" });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-display font-bold text-foreground">Site Settings</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader><CardTitle className="text-lg">Hero Section</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Hero title" value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} />
            <Textarea placeholder="Hero subtitle" rows={2} value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="CTA button text" value={hero.cta_text} onChange={(e) => setHero({ ...hero, cta_text: e.target.value })} />
              <Input placeholder="CTA button link" value={hero.cta_link} onChange={(e) => setHero({ ...hero, cta_link: e.target.value })} />
            </div>
            <Button onClick={() => saveSetting("hero", hero)} disabled={saving} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Save className="h-4 w-4 mr-2" /> Save Hero Settings
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader><CardTitle className="text-lg">Contact Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
            <Input placeholder="Phone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
            <Input placeholder="WhatsApp number" value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} />
            <Textarea placeholder="Address" rows={2} value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} />
            <Button onClick={() => saveSetting("contact", contact)} disabled={saving} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Save className="h-4 w-4 mr-2" /> Save Contact Info
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
