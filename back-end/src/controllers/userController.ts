import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";

const secret = process.env.JWT_SECRET || "segredo";

export const register: any = async (req: Request, res: Response) => {
  const { name, email, password, kind, cpfCnpj } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists)
      return res.status(400).json({ message: "Email já cadastrado." });

    if (kind === "MEI" && !cpfCnpj) {
      return res.status(400).json({ message: "CNPJ é obrigatório para MEI." });
    }

    if (kind === "Customer" && !cpfCnpj) {
      return res
        .status(400)
        .json({ message: "CPF é obrigatório para Clientes." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        kind,
        cpfCnpj,
      },
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      user: { id: newUser.id, name: newUser.name, kind: newUser.kind },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar usuário.", error });
  }
};

export const login: any = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Senha incorreta." });

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "2h" });

    return res.status(200).json({
      message: "Login realizado com sucesso.",
      token,
      user: {
        id: user.id,
        name: user.name,
        kind: user.kind,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro no login.", error });
  }
};
