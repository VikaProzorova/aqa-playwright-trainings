import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import errors from "../utils/errorMessages.json";
import { registrationFormSelectors as sel } from "../selectors/registrationForm";
import { navButtonsSelectors as selNav } from "../selectors/navigation";
import { checkValidationError, checkValidationErrorValidContent } from "../utils/validationHelpers";

const validUser = {
  name: "Harry",
  lastName: "Potter",
  email: faker.internet.email({ provider: "qauto.faker" }),
  password: "123Qwerty",
  repeatPassword: "123Qwerty",
};

test.describe("Registration form tests", () => {
  const { name, lastName, email, password, repeatPassword } = errors.registrationForm;

  test.beforeEach(async ({ page }) => {
    const signUpButton = page.getByRole("button", { name: selNav.signUpButtonName });
    await page.goto("/");
    await signUpButton.click();
  });

  test("Validates Name field", async ({ page }: { page: Page }) => {
    const selector: string = sel.nameInput;

    const invalidData = {
      tooShort: "Q",
      tooLong: "Q".repeat(21),
      cyrillic: "Саша",
      symbols: "@lex",
      numbers: "s1mple",
    };

    await checkValidationError(page, selector, "", name.empty);
    await checkValidationError(page, selector, invalidData.tooShort, name.invalidLength);
    await checkValidationError(page, selector, invalidData.tooLong, name.invalidLength);
    await checkValidationError(page, selector, invalidData.cyrillic, name.invalidData);
    await checkValidationError(page, selector, invalidData.symbols, name.invalidData);
    await checkValidationError(page, selector, invalidData.numbers, name.invalidData);
  });

  test("Validates Name field: valid content", async ({ page }: { page: Page }) => {
    await checkValidationErrorValidContent(page, sel.nameInput, validUser.name);
  });

  test("Validates Last name field", async ({ page }: { page: Page }) => {
    const selector: string = sel.lastNameInput;

    const invalidData = {
      tooShort: "W",
      tooLong: "W".repeat(21),
      cyrillic: "Стерненко",
      symbols: "$ternenko",
      numbers: "Sternenk0",
    };

    await checkValidationError(page, selector, "", lastName.empty);
    await checkValidationError(page, selector, invalidData.tooShort, lastName.invalidLength);
    await checkValidationError(page, selector, invalidData.tooLong, lastName.invalidLength);
    await checkValidationError(page, selector, invalidData.cyrillic, lastName.invalidData);
    await checkValidationError(page, selector, invalidData.symbols, lastName.invalidData);
    await checkValidationError(page, selector, invalidData.numbers, lastName.invalidData);
  });

  test("Validates Last name field: valid content", async ({ page }: { page: Page }) => {
    await checkValidationErrorValidContent(page, sel.lastNameInput, validUser.lastName);
  });

  test("Validates Email field", async ({ page }: { page: Page }) => {
    const selector: string = sel.emailInput;
    await checkValidationError(page, selector, "", email.empty);

    const invalidEmails = ["ab@", "@ab", "ab@cd", "ab@cd.", "ab@cd.e", "abcd.ef"];
    for (const invalidEmail of invalidEmails) {
      await checkValidationError(page, selector, invalidEmail, email.invalidData);
    }
  });

  test("Validates Email field: valid content", async ({ page }: { page: Page }) => {
    await checkValidationErrorValidContent(page, sel.emailInput, validUser.email);
  });

  test("Validates Password field", async ({ page }: { page: Page }) => {
    const selector: string = sel.passwordInput;
    await checkValidationError(page, selector, "", password.empty);

    const invalidPasswords = [
      "A".repeat(7),
      "B".repeat(16),
      "C".repeat(8),
      "d".repeat(8),
      "1".repeat(8),
      "%".repeat(8),
    ];
    for (const invalidPassword of invalidPasswords) {
      await checkValidationError(page, selector, invalidPassword, password.invalidData);
    }
  });

  test("Validates Password field: valid content", async ({ page }: { page: Page }) => {
    await checkValidationErrorValidContent(page, sel.passwordInput, validUser.password);
  });

  test("Validates Re-enter password field", async ({ page }: { page: Page }) => {
    const selector: string = sel.repeatPasswordInput;
    await checkValidationError(page, selector, "", repeatPassword.empty);

    await page.locator(sel.passwordInput).clear();
    await page.locator(sel.passwordInput).fill(validUser.password);
    await checkValidationError(page, selector, "Awerty12", repeatPassword.invalidMatch);
  });

  test("Validates Re-enter password field: valid content", async ({ page }: { page: Page }) => {
    await page.locator(sel.passwordInput).fill(validUser.password);
    await checkValidationErrorValidContent(page, sel.repeatPasswordInput, validUser.password);
  });
});

test.describe("Registration form Happy path", () => {
  test("Registration a new user", async ({ page }: { page: Page }) => {
    const registerButton = page.getByRole("button", { name: sel.submitButtonName });
    const logoutButton = page.getByRole("button", { name: selNav.logoutButtonName });
    const signInButton = page.getByRole("button", { name: selNav.signInButtonName });
    const signUpButton = page.getByRole("button", { name: selNav.signUpButtonName });
    const myProfileMenu = page.locator(selNav.myProfileMenu);

    await page.goto("/");
    await signUpButton.click();

    await page.locator(sel.nameInput).fill(validUser.name);
    await page.locator(sel.lastNameInput).fill(validUser.lastName);
    await page.locator(sel.emailInput).fill(validUser.email);
    await page.locator(sel.passwordInput).fill(validUser.password);
    await page.locator(sel.repeatPasswordInput).fill(validUser.repeatPassword);

    await expect(registerButton).toBeVisible();
    await registerButton.click();

    await expect(myProfileMenu).toBeVisible();
    await myProfileMenu.click();
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();
    await expect(signInButton).toBeVisible();
  });
});
