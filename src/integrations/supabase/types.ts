export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_name: string | null
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean | null
          message: string
          name: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      managed_news: {
        Row: {
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          published_at: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      managed_partners: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          sort_order: number | null
          website_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          sort_order?: number | null
          website_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          sort_order?: number | null
          website_url?: string | null
        }
        Relationships: []
      }
      managed_reviews: {
        Row: {
          author: string
          content: string
          created_at: string
          date: string | null
          helpful_count: number | null
          id: string
          is_published: boolean | null
          location: string | null
          rating: number
          sort_order: number | null
          title: string
          trip: string | null
          trip_type: string | null
          verified: boolean | null
        }
        Insert: {
          author: string
          content: string
          created_at?: string
          date?: string | null
          helpful_count?: number | null
          id?: string
          is_published?: boolean | null
          location?: string | null
          rating?: number
          sort_order?: number | null
          title: string
          trip?: string | null
          trip_type?: string | null
          verified?: boolean | null
        }
        Update: {
          author?: string
          content?: string
          created_at?: string
          date?: string | null
          helpful_count?: number | null
          id?: string
          is_published?: boolean | null
          location?: string | null
          rating?: number
          sort_order?: number | null
          title?: string
          trip?: string | null
          trip_type?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      managed_testimonials: {
        Row: {
          author_name: string
          author_title: string | null
          content: string
          created_at: string
          id: string
          image_url: string | null
          is_published: boolean | null
          rating: number | null
          sort_order: number | null
        }
        Insert: {
          author_name: string
          author_title?: string | null
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          rating?: number | null
          sort_order?: number | null
        }
        Update: {
          author_name?: string
          author_title?: string | null
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          rating?: number | null
          sort_order?: number | null
        }
        Relationships: []
      }
      managed_travel_topics: {
        Row: {
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          slug: string | null
          sort_order: number | null
          title: string
          trip_count: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          slug?: string | null
          sort_order?: number | null
          title: string
          trip_count?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          slug?: string | null
          sort_order?: number | null
          title?: string
          trip_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      managed_trips: {
        Row: {
          available_months: string[] | null
          created_at: string
          description: string | null
          destination: string
          destination_label: string
          duration: number
          highlights: string[] | null
          id: string
          image_url: string | null
          is_published: boolean | null
          price: number
          rating: number | null
          review_count: number | null
          sort_order: number | null
          theme: string
          theme_label: string
          title: string
          updated_at: string
        }
        Insert: {
          available_months?: string[] | null
          created_at?: string
          description?: string | null
          destination: string
          destination_label: string
          duration?: number
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          price?: number
          rating?: number | null
          review_count?: number | null
          sort_order?: number | null
          theme: string
          theme_label: string
          title: string
          updated_at?: string
        }
        Update: {
          available_months?: string[] | null
          created_at?: string
          description?: string | null
          destination?: string
          destination_label?: string
          duration?: number
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          price?: number
          rating?: number | null
          review_count?: number | null
          sort_order?: number | null
          theme?: string
          theme_label?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      trip_requests: {
        Row: {
          animals: string[] | null
          budget_per_person: number
          created_at: string
          duration_days: number
          earliest_arrival: string
          email: string
          guide_language: string
          id: string
          is_read: boolean | null
          latest_arrival: string
          message: string | null
          name: string
          num_adults: number
          num_children: number
          other_destinations: string[] | null
          phone: string
          privacy_accepted: boolean
          travel_experience: string[] | null
          travel_types: string[] | null
        }
        Insert: {
          animals?: string[] | null
          budget_per_person: number
          created_at?: string
          duration_days: number
          earliest_arrival: string
          email: string
          guide_language?: string
          id?: string
          is_read?: boolean | null
          latest_arrival: string
          message?: string | null
          name: string
          num_adults?: number
          num_children?: number
          other_destinations?: string[] | null
          phone: string
          privacy_accepted?: boolean
          travel_experience?: string[] | null
          travel_types?: string[] | null
        }
        Update: {
          animals?: string[] | null
          budget_per_person?: number
          created_at?: string
          duration_days?: number
          earliest_arrival?: string
          email?: string
          guide_language?: string
          id?: string
          is_read?: boolean | null
          latest_arrival?: string
          message?: string | null
          name?: string
          num_adults?: number
          num_children?: number
          other_destinations?: string[] | null
          phone?: string
          privacy_accepted?: boolean
          travel_experience?: string[] | null
          travel_types?: string[] | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "user"],
    },
  },
} as const
