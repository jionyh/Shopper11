import { prisma } from "../libs/prisma";

async function findDrivers(min_km?: number) {
  try {
    return await prisma.driver.findMany({
      where: {
        min_km: {
          lte: min_km,
        },
      },
      orderBy: {
        tax: "asc",
      },
      include: {
        Review: true,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
async function findDriverById(id: number) {
  try {
    return await prisma.driver.findFirst({
      where: {
        id,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
export default { findDrivers, findDriverById };
