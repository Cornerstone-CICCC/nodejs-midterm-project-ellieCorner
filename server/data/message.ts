import { randomUUID } from "crypto";
import { Message } from "../types/message";

let messages: Message[] = [
  {
    id: "1",
    text: "Hello I'm Ellie",
    createdAt: new Date(),
    name: "Ellie",
    username: "ellie123",
    url: "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/%EC%9E%A5%EB%82%9C%EA%B0%90%EC%9D%84-%EB%93%A4%EA%B3%A0-%EC%9E%94%EB%94%94%EB%B0%AD%EC%97%90-%EB%88%84%EC%9B%8C-%EC%9E%88%EB%8A%94-%ED%96%89%EB%B3%B5%ED%95%9C-%EC%BD%94%EA%B8%B0-%EA%B0%9C-cWG3tiwJL5s",
  },
  {
    id: "2",
    text: "Hello I'm Jung",
    createdAt: new Date(),
    name: "Jung",
    username: "jung123",
    url: "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/%EC%9E%A5%EB%82%9C%EA%B0%90%EC%9D%84-%EB%93%A4%EA%B3%A0-%EC%9E%94%EB%94%94%EB%B0%AD%EC%97%90-%EB%88%84%EC%9B%8C-%EC%9E%88%EB%8A%94-%ED%96%89%EB%B3%B5%ED%95%9C-%EC%BD%94%EA%B8%B0-%EA%B0%9C-cWG3tiwJL5s",
  },
];

export async function getAll() {
  return messages;
}

export async function getAllByUsername(username: string) {
  return messages.filter((msg) => msg.username === username);
}

export async function getById(id: string) {
  return messages.find((msg) => msg.id === id);
}

export async function create(
  message: Omit<Message, "id" | "createdAt" | "url">
) {
  const { text, name, username } = message;

  const newMessage: Message = {
    id: randomUUID(),
    text,
    name,
    username,
    createdAt: new Date(),
    url: `https://unsplash.com/ko/%EC%82%AC%EC%A7%84/%EC%9E%A5%EB%82%9C%EA%B0%90%EC%9D%84-%EB%93%A4%EA%B3%A0-%EC%9E%94%EB%94%94%EB%B0%AD%EC%97%90-%EB%88%84%EC%9B%8C-%EC%9E%88%EB%8A%94-%ED%96%89%EB%B3%B5%ED%95%9C-%EC%BD%94%EA%B8%B0-%EA%B0%9C-cWG3tiwJL5s`,
  };
  messages = [newMessage, ...messages];
  return newMessage;
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
