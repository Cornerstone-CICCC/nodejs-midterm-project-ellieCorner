import { Request, Response } from "express";
import * as messageRepository from "../data/message";

export async function getMessages(req: Request, res: Response) {
  const username = req.query.username as string | undefined;
  const data = await (username
    ? messageRepository.getAllByUsername(username)
    : messageRepository.getAll());
  res.status(200).json(data);
}

export async function getMessage(req: Request, res: Response) {
  const id = req.params.id;
  const message = await messageRepository.getById(id);
  if (message) {
    res.status(200).json(message);
  } else {
    res.status(404).json({ message: "Message not found" });
  }
}

export async function createMessage(req: Request, res: Response) {
  const newMessage = await messageRepository.create(req.body, req.userId!);
  res.status(201).json(newMessage);
}

export async function updateMessage(req: Request, res: Response) {
  const id = req.params.id;
  const { text } = req.body;

  const message = await messageRepository.getById(id);
  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  if (message.userId !== req.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const updatedMessage = await messageRepository.update(id, text);
  if (updatedMessage) {
    res.status(200).json(message);
  } else {
    res.status(404).json({ message: "Message not found" });
  }
}

export async function deleteMessage(req: Request, res: Response) {
  const id = req.params.id;

  const message = await messageRepository.getById(id);
  if (!message) {
    return res.status(404).json({ message: "Message not found" });
  }

  if (message.userId !== req.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await messageRepository.remove(id);
  res.status(204).end();
}
