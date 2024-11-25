import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const drivers = [
  {
    name: "Homer Simpson",
    description: "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
    vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
    tax: 2.5,
    min_km: 1,
    reviews: {
      rating: 2,
      comment: "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
    },
  },
  {
    name: "Dominic Toretto",
    description: "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
    vehicle: "Dodge Charger R/T 1970 modificado",
    tax: 5,
    min_km: 5,
    reviews: {
      rating: 4,
      comment: "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
    },
  },
  {
    name: "James Bond",
    description: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
    vehicle: "Aston Martin DB5 clássico",
    tax: 10,
    min_km: 10,
    reviews: {
      rating: 5,
      comment: "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
    },
  },
];

async function main() {
  const driverPromises = drivers.map((driver) =>
    prisma.driver.create({
      data: {
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        tax: driver.tax,
        min_km: driver.min_km,
        Review: {
          create: {
            rating: driver.reviews.rating,
            comment: driver.reviews.comment,
          },
        },
      },
    })
  );

  await Promise.all(driverPromises);

  console.log("seed completa");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
