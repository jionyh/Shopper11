import { EstimateResponse, ListRideResponse } from "../@types/Ride";
import { mockEstimateRoute, mockRoutes } from "../mocks/estimateRouteMock";
import { mockFindDrivers, mockFindDriverById } from "../mocks/findDriversMock";
import { mockPrismaFindMany } from "../mocks/rideMock";
import driverService from "../services/driver.service";
import googleRouteService from "../services/googleRoute.service";
import rideService from "../services/ride.service";
import { prismaMock } from "../singleton";

describe("Ride Service", () => {
  const mockGoogleRouteEstimateFn = jest.spyOn(googleRouteService, "estimateRoute").mockImplementation(mockEstimateRoute);
  const mockFindDriversFn = jest.spyOn(driverService, "findDrivers").mockImplementation(mockFindDrivers);
  const mockFindDriverByIdFn = jest.spyOn(driverService, "findDriverById").mockImplementation(mockFindDriverById);
  const mockPrismaCreateFn = jest.spyOn(prismaMock.ride, "create");
  const mockPrismaFindManyFn = jest.spyOn(prismaMock.ride, "findMany");

  describe("Estimate Service ", () => {
    const data = {
      origin: "origin address",
      destination: "destination address",
      customer_id: "123",
    };

    const expectedError = {
      status: 400,
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
        mockFindDriversFn.mockResolvedValueOnce([]);
        const result = await rideService.estimate(data);
        expect(mockFindDriversFn).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedError);
      });
    });

    it("should successful estimate a ride", async () => {
      //Teste de sucesso com a opção de distance de 1km
      const dataRoute = {
        routes: mockRoutes.map((route) => ({ ...route, distanceMeters: 1000 })),
      };
      mockGoogleRouteEstimateFn.mockResolvedValue(dataRoute);
      const result = (await rideService.estimate(data)) as EstimateResponse;
      expect(mockGoogleRouteEstimateFn).toHaveBeenCalledTimes(1);
      expect(mockFindDriversFn).toHaveBeenCalledWith(1);
      expect(result.destination).toEqual({
        latitude: expect.any(Number),
        longitude: expect.any(Number),
      });
      expect(result.options).toHaveLength(1); // Só tem 1 motorista que aceita 1km - Homer
      expect(result.options[0]).toHaveProperty("value", 2.5); // Verifica se o calculo está correto R$ 2.50 * 1
    });
  });

  describe("Confirm  Service", () => {
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
      status: 400,
      error_code: "INVALID_DATA",
      error_description: "Os dados fornecidos no corpo da requisição são inválidos",
    };

    const driverNotFoundError = {
      status: 404,
      error_code: "DRIVER_NOT_FOUND",
      error_description: "Motorista não encontrado",
    };

    const invalidDistanceError = {
      status: 406,
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

  describe("List Service", () => {
    const customer_id = "123";
    const driver_id = "1";

    const expectedErrorNoRidesFound = {
      status: 404,
      error_code: "NO_RIDES_FOUND",
      error_description: "Nenhum registro encontrado",
    };
    const expectedErrorInvalidDriver = {
      status: 400,
      error_code: "INVALID_DRIVER",
      error_description: "Motorista inválido",
    };

    describe("Validation Errors", () => {
      it("should return error when customer_id is invalid", async () => {
        const result = await rideService.list("", driver_id);
        expect(result).toEqual(expectedErrorNoRidesFound);
      });

      it("should return error when driver does not exist", async () => {
        const result = await rideService.list(customer_id, "99");
        expect(mockFindDriverByIdFn).toHaveBeenCalledWith(99);
        expect(result).toEqual(expectedErrorInvalidDriver);
      });

      it("should return error when no rides are found", async () => {
        mockPrismaFindManyFn.mockResolvedValueOnce([]);
        const result = await rideService.list(customer_id, driver_id);
        expect(mockPrismaFindManyFn).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedErrorNoRidesFound);
      });
    });

    it("Success", async () => {
      mockPrismaFindManyFn.mockImplementation(mockPrismaFindMany);
      const result = (await rideService.list("1", "1")) as ListRideResponse;
      expect(mockFindDriverByIdFn).toHaveBeenCalledWith(1);
      expect(mockPrismaFindManyFn).toHaveBeenCalledTimes(1);

      const result2 = (await rideService.list("1")) as ListRideResponse;
      expect(mockFindDriverByIdFn).toHaveBeenCalledWith(1);
      expect(mockPrismaFindManyFn).toHaveBeenCalledTimes(2);
      expect(result2.rides).toHaveLength(3);
    });
  });
});
