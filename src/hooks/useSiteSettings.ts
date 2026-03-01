import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface HeroSettings {
    title: string;
    subtitle: string;
    cta_text: string;
    cta_link: string;
    image_url?: string;
}

export interface ContactSettings {
    email: string;
    phone: string;
    address: string;
    whatsapp: string;
}

export interface SiteImages {
    logo_main?: string;
    logo_footer?: string;
    about_image?: string;
    favicon?: string;
}

export interface AboutSettings {
    mission_title: string;
    mission_text: string;
    vision_title: string;
    vision_text: string;
}

export function useSiteSettings() {
    const [settings, setSettings] = useState<{
        hero: HeroSettings;
        contact: ContactSettings;
        images: SiteImages;
        about: AboutSettings;
    }>({
        hero: { title: "Gorilla Trekking", subtitle: "& Safari Tours", cta_text: "Discover Our Tours", cta_link: "/travel-topics" },
        contact: { email: "info@freshtracksafrica.com", phone: "+256 755 843097 / +256 746 718350", address: "", whatsapp: "" },
        images: { logo_main: "", logo_footer: "", about_image: "" },
        about: { mission_title: "Mission & Vision", mission_text: "We believe in responsible tourism...", vision_title: "", vision_text: "" }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const { data, error } = await supabase.from("site_settings").select("*");
                if (error) throw error;

                if (data) {
                    const newSettings = { ...settings };
                    data.forEach((row: any) => {
                        if (row.setting_key === "hero") newSettings.hero = { ...newSettings.hero, ...row.setting_value };
                        if (row.setting_key === "contact") newSettings.contact = { ...newSettings.contact, ...row.setting_value };
                        if (row.setting_key === "images") newSettings.images = { ...newSettings.images, ...row.setting_value };
                        if (row.setting_key === "about") newSettings.about = { ...newSettings.about, ...row.setting_value };
                    });
                    setSettings(newSettings);
                }
            } catch (err) {
                console.error("Error fetching site settings:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchSettings();
    }, []);

    return { settings, loading };
}
