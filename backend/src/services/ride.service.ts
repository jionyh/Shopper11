import { ErrorResponse } from "../@types/ErrorResponse";
import { ConfirmRideDto, ConfirmRideResponse, EstimateResponseDto, ListRideResponse, Ride, RideDto } from "../@types/Ride";
import { prisma } from "../libs/prisma";
import driverService from "./driver.service";
import { estimateRoute } from "./googleRoute.service";

async function estimate(data: RideDto): Promise<EstimateResponseDto | ErrorResponse> {
  const { origin, destination, customer_id } = data;
  const emptyFields = !origin || !destination || !customer_id;
  const addressIsEqual = origin === destination;

  if (emptyFields || addressIsEqual) {
    return { error_code: "INVALID_DATA", error_description: "Os dados fornecidos no corpo da requisição são inválidos" };
  }
  const estimate = await estimateRoute({ origin, destination });

  const drivers = await driverService.findDrivers(estimate.routes[0].distanceMeters / 1000);

  if (!drivers) {
    return { error_code: "INVALID_DATA", error_description: "Os dados fornecidos no corpo da requisição são inválidos" };
  }

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
    options: drivers.map((driver: { id: any; name: any; description: any; vehicle: any; Review: { comment: string,rating:number }[]; tax: number; }) => {
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
}

async function confirm(data: ConfirmRideDto): Promise<ConfirmRideResponse | ErrorResponse> {
  const { origin, destination, customer_id, distance, duration, driver, value } = data;

  if (!validateEmptyOriginAndDestination(origin, destination) || !customer_id) {
    return {
      error_code: "INVALID_DATA",
      error_description: "Os dados fornecidos no corpo da requisição são inválidos",
    };
  }

  const driverExists = await driverService.findDriverById(driver.id);

  if (!driverExists) {
    return {
      error_code: "DRIVER_NOT_FOUND",
      error_description: "Motorista não encontrado",
    };
  }
  if (driverExists.min_km > distance / 1000) {
    return {
      error_code: "INVALID_DISTANCE",
      error_description: "Quilometragem inválida para o motorista",
    };
  }

  await prisma.ride.create({
    data: {
      customer_id,
      date: new Date(),
      origin,
      destination,
      distance,
      duration,
      driverId: driver.id,
      value,
    },
  });
  return {
    success: true,
  };
}

async function list(customer_id: string, driver_id: string): Promise<ListRideResponse | ErrorResponse> {
  if (!customer_id) {
    return {
      error_code: "NO_RIDES_FOUND",
      error_description: "Nenhum registro encontrado",
    };
  }
  if (driver_id) {
    const driverExists = await driverService.findDriverById(+driver_id);
    if (!driverExists) {
      return {
        error_code: "INVALID_DRIVER",
        error_description: "Motorista inválido",
      };
    }
  }

  const rides = await prisma.ride.findMany({
    where: {
      customer_id: customer_id,
      driverId: driver_id ? +driver_id : undefined,
    },
    include: {
      driver: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  if (rides.length === 0) {
    return {
      error_code: "NO_RIDES_FOUND",
      error_description: "Nenhum registro encontrado",
    };
  }

  return {
    customer_id,
    rides: rides.map((ride:Ride) => {
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
    }),
  };
}

function validateEmptyOriginAndDestination(origin: string, destination: string) {
  if (!origin || !destination || origin === destination) return false;
  return true;
}

export default { estimate, confirm, list };
