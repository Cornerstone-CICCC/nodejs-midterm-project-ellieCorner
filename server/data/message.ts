import { randomUUID } from "crypto";
import { Message } from "../types/message";
import * as userRepository from "./auth";

let messages: Message[] = [
  {
    id: "1",
    text: "Hello I'm Ellie",
    createdAt: new Date(),
    userId: "ellie123",
  },
  {
    id: "2",
    text: "Hello I'm Jung",
    createdAt: new Date(),
    userId: "jung123",
  },
];

export async function getAll() {
  return Promise.all(
    messages.map(async (msg) => {
      const user = await userRepository.getById(msg.userId);

      return {
        ...msg,
        username: user?.username,
        name: user?.name,
        url: user?.url,
      };
    })
  );
}

export async function getAllByUsername(username: string) {
  return getAll().then((messages) =>
    messages.filter((msg) => msg.username === username)
  );
}

export async function getById(id: string) {
  const found = messages.find((msg) => msg.id === id);
  if (!found) {
    return null;
  }
  const user = await userRepository.getById(found.userId);
  return {
    ...found,
    username: user?.username,
    name: user?.name,
    url: user?.url,
  };
}

export async function create(
  message: Omit<Message, "id" | "createdAt">,
  userId: string
) {
  const newMessage: Message = {
    id: randomUUID(),
    text: message.text,
    createdAt: new Date(),
    userId,
  };
  messages = [newMessage, ...messages];
  return getById(newMessage.id);
}

export async function update(id: string, text: string) {
  const message = messages.find((msg) => msg.id === id);
  if (message) {
    message.text = text;
    return message;
  }
  return null;
}

export async function remove(id: string) {
  messages = messages.filter((msg) => msg.id !== id);
}
