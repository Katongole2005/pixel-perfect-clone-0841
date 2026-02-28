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
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_read: boolean | null
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      managed_news: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          published_at: string | null
          slug: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      managed_partners: {
        Row: {
          created_at: string | null
          id: string
          is_published: boolean | null
          logo_url: string | null
          name: string
          sort_order: number | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          logo_url?: string | null
          name: string
          sort_order?: number | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          logo_url?: string | null
          name?: string
          sort_order?: number | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      managed_reviews: {
        Row: {
          author: string
          content: string
          created_at: string | null
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
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          author: string
          content: string
          created_at?: string | null
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
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          author?: string
          content?: string
          created_at?: string | null
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
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      managed_testimonials: {
        Row: {
          author_name: string
          author_title: string | null
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          rating: number | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          author_name: string
          author_title?: string | null
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          rating?: number | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          author_name?: string
          author_title?: string | null
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          rating?: number | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      managed_travel_topics: {
        Row: {
          created_at: string | null
          description: string | null
          icon_name: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          slug: string | null
          sort_order: number | null
          title: string
          trip_count: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          slug?: string | null
          sort_order?: number | null
          title: string
          trip_count?: number | null\n          updated_at ?: string | null
        }
Update: {
  created_at ?: string | null
  description ?: string | null
  icon_name ?: string | null
  id ?: string
  image_url ?: string | null
  is_published ?: boolean | null
  slug ?: string | null
  sort_order ?: number | null
  title ?: string
  trip_count ?: number | null
  updated_at ?: string | null
}
Relationships: []
      }
managed_trips: {
  Row: {
    category: string | null
    created_at: string | null
    description: string | null
    difficulty: string | null
    duration_days: number | null
    highlights: string[] | null
    id: string
    image_url: string | null
    is_featured: boolean | null
    is_published: boolean | null
    max_group_size: number | null
    price_per_person: number | null
    sort_order: number | null
    title: string
    updated_at: string | null
  }
  Insert: {
    category ?: string | null
    created_at ?: string | null
    description ?: string | null
    difficulty ?: string | null
    duration_days ?: number | null
    highlights ?: string[] | null
    id ?: string
    image_url ?: string | null
    is_featured ?: boolean | null
    is_published ?: boolean | null
    max_group_size ?: number | null
    price_per_person ?: number | null
    sort_order ?: number | null
    title: string
    updated_at ?: string | null
  }
  Update: {
    category ?: string | null
    created_at ?: string | null
    description ?: string | null
    difficulty ?: string | null
    duration_days ?: number | null
    highlights ?: string[] | null
    id ?: string
    image_url ?: string | null
    is_featured ?: boolean | null
    is_published ?: boolean | null
    max_group_size ?: number | null
    price_per_person ?: number | null
    sort_order ?: number | null
    title ?: string
    updated_at ?: string | null
  }
  Relationships: []
}
site_settings: {
  Row: {
    id: string
    setting_key: string
    setting_value: Json | null
    updated_at: string | null
  }
  Insert: {
    id ?: string
    setting_key: string
    setting_value ?: Json | null
    updated_at ?: string | null
  }
  Update: {
    id ?: string
    setting_key ?: string
    setting_value ?: Json | null
    updated_at ?: string | null
  }
  Relationships: []
}
trip_requests: {
  Row: {
    activities: string[] | null
    budget_per_person: number | null
    created_at: string | null
    duration_days: number | null
    email: string
    id: string
    is_read: boolean | null
    name: string
    num_adults: number | null
    num_children: number | null
    phone: string | null
    preferred_date: string | null
    special_requests: string | null
  }
  Insert: {
    activities ?: string[] | null
    budget_per_person ?: number | null
    created_at ?: string | null
    duration_days ?: number | null
    email: string
    id ?: string
    is_read ?: boolean | null
    name: string
    num_adults ?: number | null
    num_children ?: number | null
    phone ?: string | null
    preferred_date ?: string | null
    special_requests ?: string | null
  }
  Update: {
    activities ?: string[] | null
    budget_per_person ?: number | null
    created_at ?: string | null
    duration_days ?: number | null
    email ?: string
    id ?: string
    is_read ?: boolean | null
    name ?: string
    num_adults ?: number | null
    num_children ?: number | null
    phone ?: string | null
    preferred_date ?: string | null
    special_requests ?: string | null
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
    created_at ?: string
    id ?: string
    role ?: Database["public"]["Enums"]["app_role"]
    user_id: string
  }
  Update: {
    created_at ?: string
    id ?: string
    role ?: Database["public"]["Enums"]["app_role"]
    user_id ?: string
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
