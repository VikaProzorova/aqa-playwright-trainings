import { test } from "@playwright/test";
import { Header, LandingPage, RegistrationModal } from "../poms";
import errors from "../utils/errorMessages.json";
import { validUserData, invalidUserData } from "../utils/testsContent";

test.describe("POM-based tests of Registration", () => {
  let landingPage: LandingPage;
  let registrationModal: RegistrationModal;
  let header: Header;

  const { name, lastName, email, password, repeatPassword } = errors.registrationForm;

  test.beforeEach(async ({ page, context }) => {
    landingPage = new LandingPage(page, context);
    header = new Header(page, context);
    await landingPage.open();
    await landingPage.isSignUpButtonVisible();
    registrationModal = await landingPage.clickSignUp();
    await registrationModal.isModalVisible();
    await registrationModal.isSubmitButtonVisible();
  });

  test("Validates Name field", async () => {
    await registrationModal.typeName("");
    await registrationModal.checkNameInputError(name.empty);

    for (const invalidData of invalidUserData.names.invalidLength) {
      await registrationModal.typeName(invalidData);
      await registrationModal.checkNameInputError(name.invalidLength);
    }

    for (const invalidData of invalidUserData.names.invalidData) {
      await registrationModal.typeName(invalidData);
      await registrationModal.checkNameInputError(name.invalidData);
    }
  });

  test("Validates Last name field", async () => {
    await registrationModal.typeLastName("");
    await registrationModal.checkLastNameInputError(lastName.empty);

    for (const invalidData of invalidUserData.lastNames.invalidLength) {
      await registrationModal.typeLastName(invalidData);
      await registrationModal.checkLastNameInputError(lastName.invalidLength);
    }

    for (const invalidData of invalidUserData.lastNames.invalidData) {
      await registrationModal.typeLastName(invalidData);
      await registrationModal.checkLastNameInputError(lastName.invalidData);
    }
  });

  test("Validates Email field", async () => {
    await registrationModal.typeEmail("");
    await registrationModal.checkEmailInputError(email.empty);

    for (const invalidData of invalidUserData.emails) {
      await registrationModal.typeEmail(invalidData);
      await registrationModal.checkEmailInputError(email.invalidData);
    }
  });

  test("Validates Password field", async () => {
    await registrationModal.typePassword("");
    await registrationModal.checkPasswordInputError(password.empty);

    for (const invalidData of invalidUserData.passwords) {
      await registrationModal.typePassword(invalidData);
      await registrationModal.checkPasswordInputError(password.invalidData);
    }
  });

  test("Validates Repeat password field", async () => {
    await registrationModal.typeRepeatPassword("");
    await registrationModal.checkRepeatPasswordInputError(repeatPassword.empty);

    await registrationModal.typePassword(validUserData.password);
    await registrationModal.typeRepeatPassword("Awerty12");
    await registrationModal.checkRepeatPasswordInputError(repeatPassword.invalidMatch);
  });

  test("Registration a new user", async () => {
    await registrationModal.executeRegistration(validUserData);
    await header.isMyProfileMenuVisible();
    await header.openMyProfileMenu();
    await header.clickLogout();
    await landingPage.isSignUpButtonVisible();
  });
});
