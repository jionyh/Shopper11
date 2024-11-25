export interface RouteResponse {
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
  latLng: LatLng;
}
interface LatLng {
  latitude: number;
  longitude: number;
}
