import { EstimateResponseDto, Ride } from "../@types/Ride";
import { calculateValue } from "../utils/calculateValue";
import { DriverResponse } from "./../@types/Driver";
import { RouteResponse } from "./../@types/GoogleMapsApi";
export const estimateRideMapper = (estimate: RouteResponse, drivers: DriverResponse[]): EstimateResponseDto => {
  const { routes } = estimate;
  const { legs } = routes[0];
  return {
    origin: {
      latitude: legs[0].startLocation.latLng.latitude,
      longitude: legs[0].startLocation.latLng.longitude,
    },
    destination: {
      latitude: legs[0].endLocation.latLng.latitude,
      longitude: legs[0].endLocation.latLng.longitude,
    },
    distance: routes[0].distanceMeters,
    duration: routes[0].duration,
    options: drivers.map((driver: DriverResponse) => {
      return {
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
          rating: driver.Review[0].rating,
          comment: driver.Review[0].comment,
        },
        value: calculateValue(routes[0].distanceMeters, driver.tax),
      };
    }),
    routeResponse: estimate,
  };
};

export const listRideMapper = (rides: Ride[]) => {
  return rides.map((ride: Ride) => {
    return {
      id: ride.id,
      date: ride.date,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver.id,
        name: ride.driver.name,
      },
      value: ride.value,
    };
  });
};
