import { faker } from "@faker-js/faker";

export const validUserData: Record<string, string> = {
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
