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
      achievements: {
        Row: {
          category: string
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          points: number
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          icon: string
          id?: string
          name: string
          points?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          points?: number
        }
        Relationships: []
      }
      area_progress: {
        Row: {
          area_id: string | null
          best_streak: number | null
          created_at: string
          current_streak: number | null
          id: string
          last_completed_at: string | null
          total_completed: number | null
          user_id: string | null
        }
        Insert: {
          area_id?: string | null
          best_streak?: number | null
          created_at?: string
          current_streak?: number | null
          id?: string
          last_completed_at?: string | null
          total_completed?: number | null
          user_id?: string | null
        }
        Update: {
          area_id?: string | null
          best_streak?: number | null
          created_at?: string
          current_streak?: number | null
          id?: string
          last_completed_at?: string | null
          total_completed?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "area_progress_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "challenge_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "area_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
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
      challenge_areas: {
        Row: {
          color: string
          created_at: string
          description: string | null
          icon: string
          id: string
          name: string
        }
        Insert: {
          color: string
          created_at?: string
          description?: string | null
          icon: string
          id?: string
          name: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      daily_challenges: {
        Row: {
          area_id: string | null
          category: string
          created_at: string
          date: string | null
          description: string
          difficulty: string
          id: string
          is_completed: boolean | null
          title: string
          xp_reward: number
        }
        Insert: {
          area_id?: string | null
          category?: string
          created_at?: string
          date?: string | null
          description: string
          difficulty?: string
          id?: string
          is_completed?: boolean | null
          title: string
          xp_reward?: number
        }
        Update: {
          area_id?: string | null
          category?: string
          created_at?: string
          date?: string | null
          description?: string
          difficulty?: string
          id?: string
          is_completed?: boolean | null
          title?: string
          xp_reward?: number
        }
        Relationships: [
          {
            foreignKeyName: "daily_challenges_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "challenge_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_ratings: {
        Row: {
          created_at: string
          date: string
          id: string
          notes: string | null
          rating: number
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          notes?: string | null
          rating: number
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          rating?: number
        }
        Relationships: []
      }
      daily_thoughts: {
        Row: {
          content: string
          created_at: string
          date: string
          id: string
          source_url: string
        }
        Insert: {
          content: string
          created_at?: string
          date?: string
          id?: string
          source_url: string
        }
        Update: {
          content?: string
          created_at?: string
          date?: string
          id?: string
          source_url?: string
        }
        Relationships: []
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
      gratitude_entries: {
        Row: {
          created_at: string | null
          entry_1: string | null
          entry_2: string | null
          entry_3: string | null
          entry_date: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          entry_1?: string | null
          entry_2?: string | null
          entry_3?: string | null
          entry_date?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          entry_1?: string | null
          entry_2?: string | null
          entry_3?: string | null
          entry_date?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      habit_categories: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          name: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          name: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      habit_progress: {
        Row: {
          created_at: string
          date: string
          habit_id: string
          id: string
          notes: string | null
          reflection: string | null
          status: string | null
          value: number | null
        }
        Insert: {
          created_at?: string
          date: string
          habit_id: string
          id?: string
          notes?: string | null
          reflection?: string | null
          status?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          habit_id?: string
          id?: string
          notes?: string | null
          reflection?: string | null
          status?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "habit_progress_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      habit_reminders: {
        Row: {
          body: string
          created_at: string
          habit_id: string | null
          id: string
          scheduled_for: string
          sent_at: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          body: string
          created_at?: string
          habit_id?: string | null
          id?: string
          scheduled_for: string
          sent_at?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          habit_id?: string | null
          id?: string
          scheduled_for?: string
          sent_at?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "habit_reminders_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      habits: {
        Row: {
          best_streak: number
          category_id: string
          created_at: string
          current_streak: number
          energy_required: number | null
          frequency: string
          id: string
          name: string
          notes: string | null
          optimal_day_part: string | null
          optimal_time: string | null
          priority: number | null
          reminder_days: string[] | null
          reminder_time: string | null
          target_unit: string
          target_value: number
        }
        Insert: {
          best_streak?: number
          category_id: string
          created_at?: string
          current_streak?: number
          energy_required?: number | null
          frequency?: string
          id?: string
          name: string
          notes?: string | null
          optimal_day_part?: string | null
          optimal_time?: string | null
          priority?: number | null
          reminder_days?: string[] | null
          reminder_time?: string | null
          target_unit: string
          target_value: number
        }
        Update: {
          best_streak?: number
          category_id?: string
          created_at?: string
          current_streak?: number
          energy_required?: number | null
          frequency?: string
          id?: string
          name?: string
          notes?: string | null
          optimal_day_part?: string | null
          optimal_time?: string | null
          priority?: number | null
          reminder_days?: string[] | null
          reminder_time?: string | null
          target_unit?: string
          target_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "habits_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "habit_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      level_system: {
        Row: {
          created_at: string
          icon: string
          id: string
          level_number: number
          rewards: string[] | null
          title: string
          xp_required: number
        }
        Insert: {
          created_at?: string
          icon: string
          id?: string
          level_number: number
          rewards?: string[] | null
          title: string
          xp_required: number
        }
        Update: {
          created_at?: string
          icon?: string
          id?: string
          level_number?: number
          rewards?: string[] | null
          title?: string
          xp_required?: number
        }
        Relationships: []
      }
      meal_plans: {
        Row: {
          created_at: string
          id: string
          meals: Json
          shopping_list: Json | null
          user_id: string | null
          week_end: string
          week_start: string
        }
        Insert: {
          created_at?: string
          id?: string
          meals: Json
          shopping_list?: Json | null
          user_id?: string | null
          week_end: string
          week_start: string
        }
        Update: {
          created_at?: string
          id?: string
          meals?: Json
          shopping_list?: Json | null
          user_id?: string | null
          week_end?: string
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      moods: {
        Row: {
          created_at: string
          date: string
          id: string
          mood_type: string
          need_type: string | null
          notes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          mood_type: string
          need_type?: string | null
          notes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          mood_type?: string
          need_type?: string | null
          notes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          content: string | null
          created_at: string
          date: string
          id: string
          subtitle: string | null
          title: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          date?: string
          id?: string
          subtitle?: string | null
          title: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          date?: string
          id?: string
          subtitle?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          id: string
          scheduled_for: string
          sent_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          scheduled_for: string
          sent_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          scheduled_for?: string
          sent_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      personal_study_notes: {
        Row: {
          created_at: string
          id: string
          source: string
          thoughts: string
          user_id: string | null
          week_end: string
          week_start: string
        }
        Insert: {
          created_at?: string
          id?: string
          source?: string
          thoughts: string
          user_id?: string | null
          week_end: string
          week_start: string
        }
        Update: {
          created_at?: string
          id?: string
          source?: string
          thoughts?: string
          user_id?: string | null
          week_end?: string
          week_start?: string
        }
        Relationships: []
      }
      prayer_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      prayer_tips: {
        Row: {
          category: string
          created_at: string
          day_of_year: number
          id: string
          tip: string
        }
        Insert: {
          category: string
          created_at?: string
          day_of_year: number
          id?: string
          tip: string
        }
        Update: {
          category?: string
          created_at?: string
          day_of_year?: number
          id?: string
          tip?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          current_level: number | null
          current_xp: number | null
          email: string | null
          id: string
          notifications_enabled: boolean | null
          points: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_level?: number | null
          current_xp?: number | null
          email?: string | null
          id: string
          notifications_enabled?: boolean | null
          points?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_level?: number | null
          current_xp?: number | null
          email?: string | null
          id?: string
          notifications_enabled?: boolean | null
          points?: number
          updated_at?: string
        }
        Relationships: []
      }
      recipes: {
        Row: {
          created_at: string
          description: string | null
          difficulty: string
          id: string
          image_url: string | null
          ingredients: Json
          instructions: string[]
          name: string
          nutrition_info: Json | null
          preparation_time: number
          tags: string[] | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty?: string
          id?: string
          image_url?: string | null
          ingredients: Json
          instructions: string[]
          name: string
          nutrition_info?: Json | null
          preparation_time: number
          tags?: string[] | null
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty?: string
          id?: string
          image_url?: string | null
          ingredients?: Json
          instructions?: string[]
          name?: string
          nutrition_info?: Json | null
          preparation_time?: number
          tags?: string[] | null
        }
        Relationships: []
      }
      reward_claims: {
        Row: {
          claimed_at: string | null
          id: string
          reward_id: string
          user_id: string
        }
        Insert: {
          claimed_at?: string | null
          id?: string
          reward_id: string
          user_id: string
        }
        Update: {
          claimed_at?: string | null
          id?: string
          reward_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reward_claims_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          cost: number
          created_at: string
          description: string
          icon: string
          id: string
          name: string
        }
        Insert: {
          cost: number
          created_at?: string
          description: string
          icon: string
          id?: string
          name: string
        }
        Update: {
          cost?: number
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      sleep_records: {
        Row: {
          created_at: string
          date: string
          hours_slept: number
          id: string
          morning_mood: string | null
          notes: string | null
          quality_rating: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          hours_slept: number
          id?: string
          morning_mood?: string | null
          notes?: string | null
          quality_rating?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          hours_slept?: number
          id?: string
          morning_mood?: string | null
          notes?: string | null
          quality_rating?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_daily_progress: {
        Row: {
          created_at: string
          date: string | null
          energy_level: number | null
          id: string
          mood_score: number | null
          notes: string | null
          total_habits_completed: number | null
          total_tasks_completed: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          energy_level?: number | null
          id?: string
          mood_score?: number | null
          notes?: string | null
          total_habits_completed?: number | null
          total_tasks_completed?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          energy_level?: number | null
          id?: string
          mood_score?: number | null
          notes?: string | null
          total_habits_completed?: number | null
          total_tasks_completed?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_daily_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points: {
        Row: {
          id: string
          points: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          points?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          points?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_rewards: {
        Row: {
          claimed_at: string
          id: string
          reward_id: string
          user_id: string
        }
        Insert: {
          claimed_at?: string
          id?: string
          reward_id: string
          user_id: string
        }
        Update: {
          claimed_at?: string
          id?: string
          reward_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_rewards_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_rewards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_streaks: {
        Row: {
          best_streak: number | null
          created_at: string
          current_streak: number | null
          id: string
          last_update: string | null
          streak_type: string
          user_id: string | null
        }
        Insert: {
          best_streak?: number | null
          created_at?: string
          current_streak?: number | null
          id?: string
          last_update?: string | null
          streak_type: string
          user_id?: string | null
        }
        Update: {
          best_streak?: number | null
          created_at?: string
          current_streak?: number | null
          id?: string
          last_update?: string | null
          streak_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_streaks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      get_gratitude_streak: {
        Args: {
          user_uuid: string
        }
        Returns: number
      }
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
