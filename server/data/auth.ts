import { randomUUID } from "crypto";
import { User } from "../types/user";

let users: User[] = [
  {
    id: "ellie123",
    username: "ellie",
    name: "Ellie",
    email: "ellie@example.com",
    password: "ellie123",
  },
];

export async function create(user: Omit<User, "id">): Promise<string> {
  const newUser = { id: randomUUID(), ...user };
  users.push(newUser);
  return newUser.id;
}

export async function getById(id: string): Promise<User | undefined> {
  return users.find((user) => user.id === id);
}

export async function getByUsername(
  username: string
): Promise<User | undefined> {
  return users.find((user) => user.username === username);
}

export async function getByEmail(email: string): Promise<User | undefined> {
  return users.find((user) => user.email === email);
}

export async function update(
  id: string,
  updates: Partial<Omit<User, "id">>
): Promise<User | undefined> {
  const user = await getById(id);
  if (!user) {
    return;
  }
  Object.assign(user, updates);
  return user;
}
