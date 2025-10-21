export enum Rating {
  BAD,
  NOT_GOOD,
  ALRIGHT,
  GOOD,
  AMAZING,
}

export interface Review {
  uuid: string;
  restaurant: string;
  review: string;
  rating: Rating;
  created_at: string;
  image_url?: string;
}
