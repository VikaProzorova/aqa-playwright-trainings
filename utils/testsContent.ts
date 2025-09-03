import { faker } from "@faker-js/faker";

export interface RegistrationUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const validUserData: RegistrationUser = {
  name: faker.person.firstName().replace(/[^a-zA-Z]/g, ""),
  lastName: faker.person.lastName().replace(/[^a-zA-Z]/g, ""),
  email: faker.internet.email({ provider: "qauto.faker" }),
  password: "123Qwerty",
  repeatPassword: "123Qwerty",
};

export const invalidUserData = {
  names: {
    invalidData: ["Єть", "$aa", "1bb", "/cc", "(d)", "e`", "أحمد", "アーメド", "Frü", "Nák"],
    invalidLength: ["A", "B".repeat(21)],
  },
  lastNames: {
    invalidData: ["Єть", "$aa", "1bb", "/cc", "(d)", "e`", "أحمد", "アーメド", "Frü", "Nák"],
    invalidLength: ["A", "B".repeat(21)],
  },
  emails: ["ab@", "@ab", "ab@cd", "ab@cd.", "ab@cd.e", "abcd.ef"],
  passwords: [
    "A".repeat(7),
    "B".repeat(16),
    "C".repeat(8),
    "d".repeat(8),
    "1".repeat(8),
    "%".repeat(8),
  ],
};

export const carTestData = {
  brand: "Porsche",
  model: "Cayenne",
  mileage: "50",
};

export const validCarDataForApi = {
  createCar: {
    carBrandId: 3,
    carModelId: 12,
    mileage: 88,
  },
  updateCar: {
    carBrandId: 3,
    carModelId: 12,
    mileage: 200,
  },
};

export const invalidCarDataForApi = {
  invalidBrand: {
    carBrandId: 100500,
    carModelId: 1,
    mileage: 200,
  },
  invalidModel: {
    carBrandId: 3,
    carModelId: 9999,
    mileage: 2,
  },
  invalidMileage: {
    carBrandId: 3,
    carModelId: 12,
    mileage: -1,
  },
};
