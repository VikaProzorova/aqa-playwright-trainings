import { ApiClient } from "./api-client";

export class GarageAPI extends ApiClient {
  private headers: Record<string, string> = {};

  setAuthHeaders(headers: Record<string, string>) {
    this.headers = headers;
  }

  async postCar(data: { carBrandId: number; carModelId: number; mileage: number }) {
    return this.post("/api/cars", {
      data,
      headers: this.headers,
    });
  }

  async getCars() {
    return this.get("/api/cars", { headers: this.headers });
  }

  async updateCar(id: number, data: { carBrandId: number; carModelId: number; mileage: number }) {
    return this.put(`/api/cars/${id}`, {
      data,
      headers: this.headers,
    });
  }

  async deleteCar(id: number) {
    return this.delete(`/api/cars/${id}`, {
      headers: this.headers,
    });
  }
}
