import driverService from "../services/driver.service";
import { driversMock } from "../mocks/findDriversMock";
import { prismaMock } from "../singleton";

describe("Driver Service", () => {
  const mockPrismaFindFirstFn = jest.spyOn(prismaMock.driver, "findFirst");
  const mockPrismaFindManyFn = jest.spyOn(prismaMock.driver, "findMany");

  describe("findDrivers", () => {
    it("should return all drivers when no min_km is provided", async () => {
      mockPrismaFindManyFn.mockResolvedValue(driversMock);

      const result = await driverService.findDrivers(1);
      expect(prismaMock.driver.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(driversMock);
    });

    it("should return filtered drivers by min_km", async () => {
      const min_km = 1;
      const filteredDrivers = driversMock.filter((driver) => driver.min_km <= min_km);

      (prismaMock.driver.findMany as jest.Mock).mockResolvedValue(filteredDrivers);
      const result = await driverService.findDrivers(min_km);
      expect(prismaMock.driver.findMany).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(1); // Somente deve retornar homer
    });
  });

  describe("findDriverById", () => {
    it("should return a driver by ID", async () => {
      const driverId = 1;
      const driver = driversMock.find((d) => d.id === driverId);

      mockPrismaFindFirstFn.mockResolvedValue(driversMock[0]); // Homer
      const result = await driverService.findDriverById(driverId);
      expect(prismaMock.driver.findFirst).toHaveBeenCalledWith({
        where: {
          id: driverId,
        },
      });
      expect(result).toEqual(driver);
    });

    it("should return null if driver not found", async () => {
      const driverId = 99;
      mockPrismaFindFirstFn.mockResolvedValue(null);

      const result = await driverService.findDriverById(driverId);
      expect(prismaMock.driver.findFirst).toHaveBeenCalledWith({
        where: {
          id: driverId,
        },
      });
      expect(result).toBeNull();
    });
  });
});
