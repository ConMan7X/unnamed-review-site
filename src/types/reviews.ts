export interface Review {
  uuid: string;
  restaurant: string;
  review: string;
  rating: number;
  created_at: string;
  image_url?: string;
}
