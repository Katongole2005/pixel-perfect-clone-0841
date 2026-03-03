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

const defaultSettings: {
    hero: HeroSettings;
    contact: ContactSettings;
    images: SiteImages;
    about: AboutSettings;
} = {
    hero: { title: "Gorilla Trekking", subtitle: "& Safari Tours", cta_text: "Discover Our Tours", cta_link: "/travel-topics" },
    contact: { email: "info@freshtracksafricatours&travelltd.com", phone: "+256 755 843097 / +256 746 718350", address: "", whatsapp: "" },
    images: { logo_main: "", logo_footer: "", about_image: "" },
    about: { mission_title: "Mission & Vision", mission_text: "We believe in responsible tourism...", vision_title: "", vision_text: "" },
};

const isJsonObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

export function useSiteSettings() {
    const [settings, setSettings] = useState(defaultSettings);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const { data, error } = await supabase.from("site_settings").select("*");
                if (error) throw error;

                if (data) {
                    const nextSettings = { ...defaultSettings };
                    data.forEach((row) => {
                        if (!isJsonObject(row.setting_value)) return;
                        if (row.setting_key === "hero") nextSettings.hero = { ...nextSettings.hero, ...(row.setting_value as Partial<HeroSettings>) };
                        if (row.setting_key === "contact") nextSettings.contact = { ...nextSettings.contact, ...(row.setting_value as Partial<ContactSettings>) };
                        if (row.setting_key === "images") nextSettings.images = { ...nextSettings.images, ...(row.setting_value as Partial<SiteImages>) };
                        if (row.setting_key === "about") nextSettings.about = { ...nextSettings.about, ...(row.setting_value as Partial<AboutSettings>) };
                    });
                    setSettings(nextSettings);
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
