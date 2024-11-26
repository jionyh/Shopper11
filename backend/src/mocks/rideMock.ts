export const mockRides = [
  {
    id: 1,
    customer_id: "1",
    date: new Date("2024-11-26T10:00:00Z"),
    origin: "Rua A, Cidade X",
    destination: "Rua B, Cidade Y",
    distance: 80,
    duration: "60s",
    driverId: 1,
    driver: {
      id: 1,
      name: "Homer Simpson",
    },
    value: 2,
  },
  {
    id: 2,
    customer_id: "1",
    date: new Date("2024-11-25T14:30:00Z"),
    origin: "Avenida C, Cidade Z",
    destination: "Avenida D, Cidade W",
    distance: 30000,
    duration: "2400s",
    driverId: 2,
    driver: {
      id: 2,
      name: "Dominic Toretto",
    },
    value: 150,
  },
  {
    id: 3,
    customer_id: "1",
    date: new Date("2024-11-24T16:45:00Z"),
    origin: "Praça E, Cidade V",
    destination: "Avenida F, Cidade U",
    distance: 25000,
    duration: "2100s",
    driverId: 3,
    driver: {
      id: 3,
      name: "James Bond",
    },
    value: 250,
  },
];

export const mockPrismaFindMany = jest.fn().mockImplementation(({ where }: { where: { customer_id: string; driverId?: number } }) => {
  if (where.driverId) {
    return mockRides.filter((ride) => ride.customer_id === where.customer_id && ride.driver.id === where.driverId);
  }
  return mockRides.filter((ride) => ride.customer_id === where.customer_id);
});
