import { Prisma } from "@prisma/client";
import { Review } from "./Review";

export type Driver = {
  id: Number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  value: number;
};

export interface DriverResponse extends Prisma.DriverGetPayload<{ include: { Review: true } }> {}
