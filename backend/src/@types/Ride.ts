import { Driver } from "./Driver";
import { RouteResponse } from "./GoogleMapsApi";

export type RideDto = {
  origin: string;
  destination: string;
  customer_id?: string;
};
interface LatLng {
  latitude: number;
  longitude: number;
}

export type EstimateResponseDto = {
  origin: LatLng;
  destination: LatLng;
  distance: number;
  duration: string;
  options: Driver[];
  routeResponse: RouteResponse;
};

export type ConfirmRideDto = {
  origin: string;
  destination: string;
  customer_id: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
};

export type ConfirmRideResponse = {
  success: true;
};

export type ListRideResponse = {
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
