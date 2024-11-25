export type RideListType = {
  customer_id: string;
  rides: Ride[];
};

export type Ride = {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
};
