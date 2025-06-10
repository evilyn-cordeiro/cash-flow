"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = globalTeardown;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function globalTeardown() {
    console.log("Finalizando após os testes...");
    await prisma.$disconnect();
}
