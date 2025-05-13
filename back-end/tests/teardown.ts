import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function globalTeardown() {
  console.log("Finalizando após os testes...");
  await prisma.$disconnect();
}
