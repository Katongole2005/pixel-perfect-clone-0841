import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Save, Image as ImageIcon, Layout, Phone, Info } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeroSettings {
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  image_url: string;
}

interface ContactSettings {
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
}

interface SiteImages {
  logo_main: string;
  logo_footer: string;
  about_image: string;
}

interface AboutSettings {
  mission_title: string;
  mission_text: string;
}

export default function AdminSettings() {
  const [hero, setHero] = useState<HeroSettings>({ title: "", subtitle: "", cta_text: "", cta_link: "", image_url: "" });
  const [contact, setContact] = useState<ContactSettings>({ email: "", phone: "", address: "", whatsapp: "" });
  const [images, setImages] = useState<SiteImages>({ logo_main: "", logo_footer: "", about_image: "" });
  const [about, setAbout] = useState<AboutSettings>({ mission_title: "", mission_text: "" });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetch_ = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        data.forEach((row: any) => {
          if (row.setting_key === "hero") setHero(row.setting_value as HeroSettings);
          if (row.setting_key === "contact") setContact(row.setting_value as ContactSettings);
          if (row.setting_key === "images") setImages(row.setting_value as SiteImages);
          if (row.setting_key === "about") setAbout(row.setting_value as AboutSettings);
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
    toast({ title: "Settings saved", description: `${key.charAt(0).toUpperCase() + key.slice(1)} settings updated successfully.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Site Settings</h1>
          <p className="text-muted-foreground mt-1">Manage global site content, images, and contact information.</p>
        </div>
      </div>

      <Tabs defaultValue="images" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="images" className="gap-2"><ImageIcon className="h-4 w-4" /> Images & Logos</TabsTrigger>
          <TabsTrigger value="hero" className="gap-2"><Layout className="h-4 w-4" /> Hero Section</TabsTrigger>
          <TabsTrigger value="about" className="gap-2"><Info className="h-4 w-4" /> About Us</TabsTrigger>
          <TabsTrigger value="contact" className="gap-2"><Phone className="h-4 w-4" /> Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="images">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Branding & Images</CardTitle>
                <CardDescription>Upload logos and main site imagery.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-medium">Main Navigation Logo</label>
                  <ImageUpload value={images.logo_main} onChange={(url) => setImages({ ...images, logo_main: url })} folder="branding" />
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-medium">Footer Logo</label>
                  <ImageUpload value={images.logo_footer} onChange={(url) => setImages({ ...images, logo_footer: url })} folder="branding" />
                </div>
                <div className="md:col-span-2">
                  <Button onClick={() => saveSetting("images", images)} disabled={saving} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <Save className="h-4 w-4 mr-2" /> Save Brand Assets
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="hero">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Modify the homepage headline and background image.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Main Title</label>
                      <Input placeholder="Hero title" value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subtitle / Slogan</label>
                      <Textarea placeholder="Hero subtitle" rows={3} value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CTA Button Text</label>
                        <Input placeholder="CTA text" value={hero.cta_text} onChange={(e) => setHero({ ...hero, cta_text: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CTA Link</label>
                        <Input placeholder="/travel-topics" value={hero.cta_link} onChange={(e) => setHero({ ...hero, cta_link: e.target.value })} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium">Background Image</label>
                    <ImageUpload value={hero.image_url} onChange={(url) => setHero({ ...hero, image_url: url })} folder="hero" className="h-[250px]" />
                  </div>
                </div>
                <Button onClick={() => saveSetting("hero", hero)} disabled={saving} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Save className="h-4 w-4 mr-2" /> Save Hero Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="about">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
                <CardDescription>Update your mission statement and vision.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Section Title</label>
                    <Input placeholder="Mission & Vision" value={about.mission_title} onChange={(e) => setAbout({ ...about, mission_title: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mission Text</label>
                    <Textarea placeholder="Enter mission statement..." rows={6} value={about.mission_text} onChange={(e) => setAbout({ ...about, mission_text: e.target.value })} />
                  </div>
                </div>
                <Button onClick={() => saveSetting("about", about)} disabled={saving} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Save className="h-4 w-4 mr-2" /> Save About Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="contact">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Global contact details shown in header and footer.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input placeholder="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="Phone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">WhatsApp Number</label>
                    <Input placeholder="WhatsApp number" value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Office Address</label>
                    <Input placeholder="Address" value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} />
                  </div>
                </div>
                <Button onClick={() => saveSetting("contact", contact)} disabled={saving} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Save className="h-4 w-4 mr-2" /> Save Contact Info
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

