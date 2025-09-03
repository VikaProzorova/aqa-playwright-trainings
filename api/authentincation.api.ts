import { ApiClient } from "./api-client";

export class AuthenticationAPI extends ApiClient {
  async login(email: string, password: string) {
    return this.post("/api/auth/signin", {
      data: {
        email,
        password,
      },
    });
  }
}
