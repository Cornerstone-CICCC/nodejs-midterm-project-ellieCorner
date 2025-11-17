import type TokenStorage from "~/db/token";
import type HttpClient from "~/fetch/http";
import type { User } from "~/types/user";

export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage
  ) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup({ username, name, email, password, url }: Omit<User, "id">) {
    const data = await this.http.fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, name, email, password, url }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async signin({ email, password }: Pick<User, "email" | "password">) {
    const data = await this.http.fetch("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    const data = await this.http.fetch("/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.tokenStorage.getToken()}`,
      },
    });
    return data;
  }

  async signout() {
    this.tokenStorage.clearToken();
  }
}
