export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bible_books: {
        Row: {
          code: string
          id: number
          name: string
          ordinal: number
          testament: string
        }
        Insert: {
          code: string
          id?: number
          name: string
          ordinal: number
          testament: string
        }
        Update: {
          code?: string
          id?: number
          name?: string
          ordinal?: number
          testament?: string
        }
        Relationships: []
      }
      bible_chapters: {
        Row: {
          book_id: number | null
          chapter_number: number
          id: number
        }
        Insert: {
          book_id?: number | null
          chapter_number: number
          id?: number
        }
        Update: {
          book_id?: number | null
          chapter_number?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "bible_chapters_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "bible_books"
            referencedColumns: ["id"]
          },
        ]
      }
      bible_verses: {
        Row: {
          chapter_id: number | null
          content: string
          id: number
          verse_number: number
        }
        Insert: {
          chapter_id?: number | null
          content: string
          id?: number
          verse_number: number
        }
        Update: {
          chapter_id?: number | null
          content?: string
          id?: number
          verse_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "bible_verses_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "bible_chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_verses: {
        Row: {
          created_at: string
          date: string
          id: string
          meditation: string
          reference: string
          source: string | null
          text: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          meditation: string
          reference: string
          source?: string | null
          text: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          meditation?: string
          reference?: string
          source?: string | null
          text?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          content_type: string
          created_at: string
          file_path: string
          file_type: string
          filename: string
          id: string
        }
        Insert: {
          content?: string | null
          content_type: string
          created_at?: string
          file_path: string
          file_type: string
          filename: string
          id?: string
        }
        Update: {
          content?: string | null
          content_type?: string
          created_at?: string
          file_path?: string
          file_type?: string
          filename?: string
          id?: string
        }
        Relationships: []
      }
      google_calendar_tokens: {
        Row: {
          access_token: string
          calendar_id: string | null
          created_at: string | null
          expires_at: string
          id: string
          refresh_token: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_token: string
          calendar_id?: string | null
          created_at?: string | null
          expires_at: string
          id?: string
          refresh_token: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string
          calendar_id?: string | null
          created_at?: string | null
          expires_at?: string
          id?: string
          refresh_token?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      weekly_bible_readings: {
        Row: {
          bible_books: string[]
          chapters: string
          created_at: string
          id: string
          week_end: string
          week_start: string
        }
        Insert: {
          bible_books: string[]
          chapters: string
          created_at?: string
          id?: string
          week_end: string
          week_start: string
        }
        Update: {
          bible_books?: string[]
          chapters?: string
          created_at?: string
          id?: string
          week_end?: string
          week_start?: string
        }
        Relationships: []
      }
      workbook_sections: {
        Row: {
          christian_life: string | null
          created_at: string
          description: string
          id: string
          image_url: string | null
          ministry: string | null
          period_end: string
          period_start: string
          song: string | null
          title: string
          treasures: string | null
        }
        Insert: {
          christian_life?: string | null
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          ministry?: string | null
          period_end: string
          period_start: string
          song?: string | null
          title: string
          treasures?: string | null
        }
        Update: {
          christian_life?: string | null
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          ministry?: string | null
          period_end?: string
          period_start?: string
          song?: string | null
          title?: string
          treasures?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
