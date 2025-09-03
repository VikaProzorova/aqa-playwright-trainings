import { test, expect, request as apiRequest } from "@playwright/test";
import { AuthenticationAPI, GarageAPI } from "../../api";
import { validCarDataForApi, invalidCarDataForApi } from "../../utils/testsContent";
import errors from "../../utils/errorMessages.json";

test("E2E Garage testing by API", async () => {
  const apiClient = await apiRequest.newContext();
  const authAPI = new AuthenticationAPI(apiClient);
  const garageAPI = new GarageAPI(apiClient);
  const carData = validCarDataForApi.createCar;
  let carId: number;

  await test.step("Login via API", async () => {
    const respLogin = await authAPI.login(
      process.env.DEFAULT_USER_EMAIL as string,
      process.env.DEFAULT_USER_PASSWORD as string
    );
    garageAPI.setAuthHeaders({
      cookie: respLogin.headers()["set-cookie"],
    });
  });

  await test.step("Add a car", async () => {
    const resp = await garageAPI.postCar(carData);
    expect(resp.status()).toBe(201);

    const body = await resp.json();
    expect(body.status).toBe("ok");
    expect(body.data.id).toBeTruthy();
    expect(body.data.carBrandId).toBe(carData.carBrandId);
    expect(body.data.carModelId).toBe(carData.carModelId);
    expect(body.data.mileage).toBe(carData.mileage);
    carId = body.data.id;
  });

  await test.step("Check the car in list of cars", async () => {
    const resp = await garageAPI.getCars();
    expect(resp.status()).toBe(200);

    const body = await resp.json();
    expect(body.status).toBe("ok");
    const foundCar = body.data.find((item: any) => item.id === carId);
    expect(foundCar).toBeTruthy();
    expect(foundCar.carBrandId).toBe(carData.carBrandId);
    expect(foundCar.carModelId).toBe(carData.carModelId);
    expect(foundCar.mileage).toBe(carData.mileage);
  });

  await test.step("Update the car mileage", async () => {
    const newCarData = validCarDataForApi.updateCar;
    const resp = await garageAPI.updateCar(carId, newCarData);
    expect(resp.status()).toBe(200);

    const body = await resp.json();
    expect(body.data.id).toBe(carId);
    expect(body.data.mileage).toBe(newCarData.mileage);
  });

  await test.step("Delete the car", async () => {
    const resp = await garageAPI.deleteCar(carId);
    expect(resp.status()).toBe(200);

    const body = await resp.json();
    expect(body.data.carId).toBe(carId);
  });
});

test("Negative scenarios of Garage API", async () => {
  const apiClient = await apiRequest.newContext();
  const authAPI = new AuthenticationAPI(apiClient);
  const garageAPI = new GarageAPI(apiClient);
  const { carNotFound, invalidMileage, modelNotFound, brandNotFound } = errors.apiGarage;

  await test.step("Login via API", async () => {
    const respLogin = await authAPI.login(
      process.env.DEFAULT_USER_EMAIL as string,
      process.env.DEFAULT_USER_PASSWORD as string
    );
    garageAPI.setAuthHeaders({
      cookie: respLogin.headers()["set-cookie"],
    });
  });

  await test.step("Add a car with invalid brand", async () => {
    const resp = await garageAPI.postCar(invalidCarDataForApi.invalidBrand);
    expect(resp.status()).toBe(404);

    const body = await resp.json();
    expect(body.status).toBe("error");
    expect(body.message).toBe(brandNotFound);
  });

  await test.step("Add a car with invalid model", async () => {
    const resp = await garageAPI.postCar(invalidCarDataForApi.invalidModel);
    expect(resp.status()).toBe(404);

    const body = await resp.json();
    expect(body.status).toBe("error");
    expect(body.message).toBe(modelNotFound);
  });

  await test.step("Add a car with invalid mileage", async () => {
    const resp = await garageAPI.postCar(invalidCarDataForApi.invalidMileage);
    expect(resp.status()).toBe(400);

    const body = await resp.json();
    expect(body.status).toBe("error");
    expect(body.message).toBe(invalidMileage);
  });

  await test.step("Update the car with invalid ID", async () => {
    const invalidId = 0;
    const resp = await garageAPI.updateCar(invalidId, validCarDataForApi.createCar);
    const body = await resp.json();

    expect(resp.status()).toBe(404);
    expect(body.status).toBe("error");
    expect(body.message).toBe(carNotFound);
  });

  await test.step("Delete the car with invalid ID", async () => {
    const invalidId = 0;
    const resp = await garageAPI.deleteCar(invalidId);
    const body = await resp.json();

    expect(resp.status()).toBe(404);
    expect(body.status).toBe("error");
    expect(body.message).toBe(carNotFound);
  });
});
