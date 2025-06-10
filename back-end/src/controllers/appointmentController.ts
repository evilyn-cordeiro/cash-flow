import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createSchedule = async (req: any, res: any) => {
  const { customerId, serviceId, scheduledAt, notes } = req.body;

  try {
    const [customer, service] = await Promise.all([
      prisma.user.findUnique({ where: { id: customerId } }),
      prisma.service.findUnique({ where: { id: serviceId } }),
    ]);

    if (!customer || customer.kind !== "Customer") {
      return res.status(403).json({ message: "Apenas clientes podem agendar serviços." });
    }

    if (!service) {
      return res.status(404).json({ message: "Serviço não encontrado." });
    }

    const schedule = await prisma.schedule.create({
      data: {
        customerId,
        serviceId,
        scheduledAt: new Date(scheduledAt),
        notes,
      },
      include: {
        customer: true,
        service: true,
      },
    });

    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar agendamento.", error });
  }
};

export const listSchedulesByCustomer = async (req: Request, res: Response) => {
  const { customerId } = req.params;

  try {
    const schedules = await prisma.schedule.findMany({
      where: { customerId: Number(customerId) },
      include: {
        service: true,
      },
    });

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agendamentos do cliente.", error });
  }
};

export const listSchedulesByMei = async (req: Request, res: Response) => {
  const { meiId } = req.params;

  try {
    const schedules = await prisma.schedule.findMany({
      where: {
        service: {
          meiId: Number(meiId),
        },
      },
      include: {
        customer: true,
        service: true,
      },
    });

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agendamentos do MEI.", error });
  }
};

