import { Driver } from "./Driver";

export interface Step1Data extends EstimateResponseDto {
  customer_id: string;
  address: {
    origin: string;
    destination: string;
  };
}
export type Step1Form = {
  customer_id: string;
  origin: string;
  destination: string;
};
export type EstimateResponseDto = {
  origin: Coordinates;
  destination: Coordinates;
  distance: number;
  duration: string;
  options: Driver[];
  routeResponse: RouteResponse;
};
export type Coordinates = {
  latitude: number;
  longitude: number;
};
interface RouteResponse {
  routes: Route[];
}
interface Route {
  legs: Leg[];
  distanceMeters: number;
  duration: string;
}
interface Leg {
  startLocation: Location;
  endLocation: Location;
}
interface Location {
  latLng: Coordinates;
}
