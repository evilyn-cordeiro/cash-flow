// src/controllers/serviceController.ts
import { Request, RequestHandler, Response } from "express";
import { prisma } from "../config/prisma";

export const createService: RequestHandler = async (req, res) => {
  const { meiId, name, description, price } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: meiId } });

    if (!user || user.kind !== "MEI") {
      return res.status(403).json({ message: "Apenas usuários MEI podem criar serviços." });
    }

    const service = await prisma.service.create({
      data: { meiId, name, description, price },
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar serviço.", error });
  }
};

export const listServices: RequestHandler = async (_, res) => {
  try {
    const services = await prisma.service.findMany({ include: { mei: true } });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar serviços.", error });
  }
};
