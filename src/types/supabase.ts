export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      reviews: {
        Row: {
          uuid: string;
          restaurant: string;
          review: string;
          created_at: string | null;
          image_url: string | null;
        };
        Insert: {
          uuid?: string;
          restaurant: string;
          review: string;
          created_at?: string | null;
          image_url?: string | null;
        };
        Update: {
          uuid?: string;
          restaurant?: string;
          review?: string;
          created_at?: string | null;
          image_url?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
