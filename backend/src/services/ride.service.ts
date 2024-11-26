import { ErrorResponse } from "../@types/ErrorResponse";
import { ConfirmRideDto, ConfirmRideResponse, EstimateResponseDto, ListRideResponse, Ride, RideDto } from "../@types/Ride";
import { ERROR_MESSAGES } from "../constants/error";
import prisma from "../libs/prisma";
import { estimateRideMapper, listRideMapper } from "../mappers/ride.mapper";
import driverService from "./driver.service";
import googleRouteService from "./googleRoute.service";

async function estimate(data: RideDto): Promise<EstimateResponseDto | ErrorResponse> {
  const { origin, destination, customer_id } = data;

  if (!validateOriginAndDestination(origin, destination) || !customer_id) {
    return ERROR_MESSAGES.INVALID_DATA;
  }
  const estimate = await googleRouteService.estimateRoute({ origin, destination });

  if (typeof estimate === "object" && "error_code" in estimate) return estimate;

  const kmDistance = estimate.routes[0].distanceMeters / 1000 >= 1 ? estimate.routes[0].distanceMeters / 1000 : 1;

  const drivers = await driverService.findDrivers(kmDistance);
  if (!drivers || drivers.length === 0) {
    return ERROR_MESSAGES.INVALID_DATA;
  }
  return estimateRideMapper(estimate, drivers);
}

async function confirm(data: ConfirmRideDto): Promise<ConfirmRideResponse | ErrorResponse> {
  const { origin, destination, customer_id, distance, duration, driver, value } = data;

  if (!validateOriginAndDestination(origin, destination) || !customer_id) {
    return ERROR_MESSAGES.INVALID_DATA;
  }

  const driverExists = await driverService.findDriverById(driver.id);

  if (!driverExists) {
    return ERROR_MESSAGES.DRIVER_NOT_FOUND;
  }
  if (driverExists.min_km > distance / 1000) {
    return ERROR_MESSAGES.INVALID_DISTANCE;
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

async function list(customer_id: string, driver_id?: string): Promise<ListRideResponse | ErrorResponse> {
  if (!customer_id) {
    return ERROR_MESSAGES.NO_RIDES_FOUND;
  }
  if (driver_id) {
    const driverExists = await driverService.findDriverById(+driver_id);
    if (!driverExists) {
      return ERROR_MESSAGES.INVALID_DRIVER;
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
    return ERROR_MESSAGES.NO_RIDES_FOUND;
  }

  return {
    customer_id,
    rides: listRideMapper(rides),
  };
}

function validateOriginAndDestination(origin: string, destination: string) {
  const equal = areEqual(origin, destination);
  if (!origin || !destination || areEqual(origin, destination)) return false;
  return true;
}

function normalizeText(text: string): string {
  return (
    text
      // Converte todos os caracteres para minúsculos
      .toLowerCase()
      // Remove todos os espaços em branco (um ou mais) da string
      .replace(/\s+/g, "")
      // Remove espaços em branco no início e no fim da string
      .replace(/^\s+|\s+$/g, "")
      // Remove caracteres não alfanuméricos e não-espacos
      .replace(/[^\w\s]/g, "")
      // Remove os caracteres "-" e "_"
      .replace(/[-_]/g, "")
  );
}

function areEqual(origin: string, destination: string): boolean {
  const normalizedOrigin = normalizeText(origin);
  const normalizedDestination = normalizeText(destination);
  return normalizedOrigin === normalizedDestination;
}

export default { estimate, confirm, list };
