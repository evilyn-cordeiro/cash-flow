import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createService = async (req: any, res: any) => {
  const { meiId, name, description, duration, price } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: meiId } });

    if (!user || user.kind !== "MEI") {
      return res.status(403).json({ message: "Apenas usuários MEI podem criar serviços." });
    }

    const service = await prisma.service.create({
      data: { meiId, name, description, duration, price },
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar serviço.", error });
  }
};

export const listServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        mei: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar serviços.", error });
  }
};

export const listServicesByMei = async (req: Request, res: Response) => {
  const { meiId } = req.params;

  try {
    const services = await prisma.service.findMany({
      where: { meiId: Number(meiId) },
    });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar serviços do MEI.", error });
  }
};
