import { DriverResponse } from "./../@types/Driver";
import { RouteResponse } from "./../@types/GoogleMapsApi";
export const estimateRiderMapper = (estimate: RouteResponse, drivers: DriverResponse[]) => {
  return {
    origin: {
      latitude: estimate.routes[0].legs[0].startLocation.latLng.latitude,
      longitude: estimate.routes[0].legs[0].startLocation.latLng.longitude,
    },
    destination: {
      latitude: estimate.routes[0].legs[0].endLocation.latLng.latitude,
      longitude: estimate.routes[0].legs[0].endLocation.latLng.longitude,
    },
    distance: estimate.routes[0].distanceMeters,
    duration: estimate.routes[0].duration,
    options: drivers.map((driver: { id: any; name: any; description: any; vehicle: any; Review: { comment: string; rating: number }[]; tax: number }) => {
      return {
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: driver.Review[0].rating,
          comment: driver.Review[0].comment,
        },
        value: driver.tax * (estimate.routes[0].distanceMeters / 1000),
      };
    }),
    routeResponse: estimate,
  };
};
