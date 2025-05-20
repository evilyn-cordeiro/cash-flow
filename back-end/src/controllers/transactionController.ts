import { Request, RequestHandler, Response } from "express";
import { prisma } from "../config/prisma";

export const createTransaction: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { userId, type, name, description, amount, pdfUrl } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    if (user.kind === "Customer") {
      res.status(403).json({
        message:
          "Usuários do tipo 'cliente' não podem realizar transações financeiras.",
      });
      return;
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        type,
        name,
        description,
        amount,
        pdfUrl,
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    res.status(500).json({ message: "Erro ao criar transação.", error });
  }
};

export const getAllTransactions: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: { user: true },
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar transações.", error });
  }
};

export const getTransactionById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });

    if (!transaction) {
      res.status(404).json({ message: "Lançamento não encontrado." });
      return;
    }

    res.status(200).json(transaction);
  } catch {
    console.log("teste");
  }
};

export const updateTransaction: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { type, name, description, amount, pdfUrl } = req.body;

  try {
    const updated = await prisma.transaction.update({
      where: { id: Number(id) },
      data: {
        type,
        name,
        description,
        amount,
        pdfUrl,
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar lançamento.", error });
  }
};

export const deleteTransaction: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    await prisma.transaction.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar lançamento.", error });
    return;
  }
};
