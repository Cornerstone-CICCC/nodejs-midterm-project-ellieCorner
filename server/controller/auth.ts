import { Request, Response } from "express";
import * as userRepository from "../data/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config";

export async function signup(req: Request, res: Response) {
  const user = await userRepository.getByEmail(req.body.email);
  if (user) {
    return res.status(409).json({ message: "Email already in use" });
  }
  const hashed = await bcrypt.hash(req.body.password, config.bcrypt.saltRounds);
  const userId = await userRepository.create({
    ...req.body,
    password: hashed,
  });

  const token = createJwtToken(userId);
  res.status(201).json({ token });
}

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await userRepository.getByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isVaildPassword = await bcrypt.compare(password, user.password);
  if (!isVaildPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = createJwtToken(user.id);
  res.status(200).json({ message: "Sign-in successful", token });
}

export async function me(req: Request, res: Response) {
  const user = await userRepository.getById(req.userId!);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, userId: user.id });
}

function createJwtToken(userId: string) {
  return jwt.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
}
