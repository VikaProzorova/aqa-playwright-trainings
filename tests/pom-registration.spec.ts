import { test } from "@playwright/test";
import { Header, LandingPage } from "../poms";
import { validUserData } from "../utils/testsContent";

test.describe("POM-based tests of Registration", () => {
  let landingPage;
  let registrationModal;
  let header;

  test.beforeEach(async ({ page, context }) => {
    landingPage = new LandingPage(page, context);
    header = new Header(page, context);
    await landingPage.open();
    await landingPage.isSignUpButtonVisible();
    registrationModal = await landingPage.clickSignUp();
  });

  test.skip("Check validation Name field", async () => {
    await registrationModal.isModalVisible();
    await registrationModal.isSubmitButtonVisible();
    await registrationModal.typeName("");
    await registrationModal.isSubmitButtonDisabled();
  });

  test("Registration a new user", async () => {
    await registrationModal.isModalVisible();
    await registrationModal.isSubmitButtonVisible();
    await registrationModal.executeRegistration(validUserData);
    await header.isMyProfileMenuVisible();
    await header.openMyProfileMenu();
    await header.clickLogout();
    await landingPage.isSignUpButtonVisible();
  });
});
