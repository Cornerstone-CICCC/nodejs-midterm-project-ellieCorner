import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import * as userRepository from "../data/auth";
import { config } from "../config";

const AUTH_ERROR = {
  message: "Authentication failed",
};

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader || authHeader?.startsWith("Bearer "))) {
    return res.status(401).json(AUTH_ERROR);
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }
  jwt.verify(token, config.jwt.secret, async (error, decodedToken) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.getById((decodedToken as any).userId);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    req.token = token;
    next();
  });
};
