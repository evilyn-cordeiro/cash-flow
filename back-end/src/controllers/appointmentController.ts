import { Request, RequestHandler, Response } from "express";
import { prisma } from "../config/prisma";

export const createAppointment: RequestHandler = async (req, res) => {
  const { customerId, serviceId, scheduledTime } = req.body;

  try {
    const [customer, service] = await Promise.all([
      prisma.user.findUnique({ where: { id: customerId } }),
      prisma.service.findUnique({ where: { id: serviceId }, include: { mei: true } }),
    ]);

    if (!customer || customer.kind !== "Customer") {
      return res.status(403).json({ message: "Somente clientes podem agendar." });
    }

    if (!service) {
      return res.status(404).json({ message: "Serviço não encontrado." });
    }

    const appointment = await prisma.appointment.create({
      data: {
        customerId,
        serviceId,
        scheduledTime: new Date(scheduledTime),
      },
      include: { customer: true, service: true },
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Erro ao agendar serviço.", error });
  }
};

export const listAppointmentsByMei: RequestHandler = async (req, res) => {
  const { meiId } = req.params;

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        service: { meiId: Number(meiId) },
      },
      include: {
        customer: true,
        service: true,
      },
    });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar agendamentos.", error });
  }
};
