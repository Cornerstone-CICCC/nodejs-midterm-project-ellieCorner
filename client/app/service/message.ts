import type TokenStorage from "~/db/token";
import type HttpClient from "~/fetch/http";
import type { Message } from "~/types/message";

export default class MessageService {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage
  ) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${this.tokenStorage.getToken()}`,
    };
  }

  async getMessages(username: string): Promise<Message[]> {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/messages${query}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  async postMessage(text: string): Promise<Message> {
    return this.http.fetch(`/messages`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  async deleteMessage(id: string): Promise<void> {
    return this.http.fetch(`/messages/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  async updateMessage(id: string, newText: string): Promise<Message | null> {
    return this.http.fetch(`/messages/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({ text: newText }),
    });
  }
}
