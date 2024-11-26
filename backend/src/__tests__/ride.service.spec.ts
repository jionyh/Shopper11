import { prisma } from "../libs/prisma";
import { mockEstimateRoute, mockRoutes } from "../mocks/estimateRouteMock";
import { mockFindDrivers, mockFindDriverById } from "../mocks/findDriversMock";
import driverService from "../services/driver.service";
import googleRouteService from "../services/googleRoute.service";
import rideService from "../services/ride.service";

describe("Estimate Service", () => {
  const mockGoogleRouteEstimateFn = jest.spyOn(googleRouteService, "estimateRoute").mockImplementation(mockEstimateRoute);
  const mockFindDriversFn = jest.spyOn(driverService, "findDrivers").mockImplementation(mockFindDrivers);
  const mockFindDriverByIdFn = jest.spyOn(driverService, "findDriverById").mockImplementation(mockFindDriverById);
  const mockPrismaCreateFn = jest.spyOn(prisma.ride, "create");

  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("Estimate Service ", () => {
    const data = {
      origin: "origin address",
      destination: "destination address",
      customer_id: "123",
    };

    const expectedError = {
      error_code: "INVALID_DATA",
      error_description: "Os dados fornecidos no corpo da requisição são inválidos",
    };

    describe("Validation Errors", () => {
      test.each([
        ["origin is invalid", { ...data, origin: "" }],
        ["destination is invalid", { ...data, destination: "" }],
        ["customer_id is invalid", { ...data, customer_id: "" }],
        ["origin and destination are equal", { ...data, origin: "same", destination: "same" }],
      ])("should return error when %s", async (_, data) => {
        const result = await rideService.estimate(data);
        expect(result).toEqual(expectedError);
      });
      it("should return error when driver is not found", async () => {
        mockFindDrivers.mockResolvedValue([]);
        const result = await rideService.estimate(data);
        expect(mockFindDrivers).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedError);
      });
    });

    /*     it("should successful estimate a ride", async () => {
      //Teste de sucesso com a opção de distance menor que 1km
      const dataRoute = {
        routes: mockRoutes.map((route) => ({ ...route, distanceMeters: 800 })),
      };
      mockGoogleRouteEstimateFn.mockResolvedValue(dataRoute);
      const result = await rideService.estimate(data);
      expect(mockGoogleRouteEstimateFn).toHaveBeenCalledTimes(1);
      expect(mockFindDriversFn).toHaveBeenCalledWith(800);
      expect(result).toBe(1);
    }); */
  });

  describe("Confirm Service", () => {
    const data = {
      origin: "Address 1",
      destination: "Address 2",
      customer_id: "123",
      driver: { id: 1, name: "Homer Simpsons" },
      distance: 1000,
      duration: "600s",
      value: 50,
    };

    const invalidDataError = {
      error_code: "INVALID_DATA",
      error_description: "Os dados fornecidos no corpo da requisição são inválidos",
    };

    const driverNotFoundError = {
      error_code: "DRIVER_NOT_FOUND",
      error_description: "Motorista não encontrado",
    };

    const invalidDistanceError = {
      error_code: "INVALID_DISTANCE",
      error_description: "Quilometragem inválida para o motorista",
    };

    describe("Validation Errors", () => {
      test.each([
        ["origin is empty", { ...data, origin: "" }],
        ["destination is empty", { ...data, destination: "" }],
        ["customer_id is empty", { ...data, customer_id: "" }],
        ["origin and destination are the same", { ...data, origin: "Address 1", destination: "Address 1" }],
      ])("should return error when %s", async (_, data) => {
        const result = await rideService.confirm(data);
        expect(result).toEqual(invalidDataError);
      });

      it("should return error when driver is not found", async () => {
        const result = await rideService.confirm({ ...data, driver: { id: 0, name: "invalid driver" } });
        expect(result).toEqual(driverNotFoundError);
      });

      it("should return error when distance is less than driver's minimum km", async () => {
        const result = await rideService.confirm({ ...data, driver: { id: 2, name: "invalid driver" } });
        expect(result).toEqual(invalidDistanceError);
      });
    });

    it("should create a ride and return success for valid data", async () => {
      const result = await rideService.confirm(data);
      expect(result).toEqual({ success: true });
      expect(mockPrismaCreateFn).toHaveBeenCalledTimes(1);
    });
  });
});
