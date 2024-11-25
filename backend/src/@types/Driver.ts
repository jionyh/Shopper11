import { Review } from "./Review";

export type Driver = {
  id: Number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  value: number;
};
