import { APIRequestContext } from "@playwright/test";

export class ApiClient {
  private apiRequest: APIRequestContext;
  constructor(apiRequest: APIRequestContext) {
    this.apiRequest = apiRequest;
  }

  protected async get(url: string, options = {}) {
    return this.apiRequest.get(url, options);
  }

  protected async post(url: string, options = {}) {
    return this.apiRequest.post(url, options);
  }

  protected async put(url: string, options = {}) {
    return this.apiRequest.put(url, options);
  }

  protected async delete(url: string, options = {}) {
    return this.apiRequest.delete(url, options);
  }
}
