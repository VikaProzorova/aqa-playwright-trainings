import { RegistrationModal, LoginModal } from "../modals";
import { BasePage } from "./BasePage";
import { BrowserContext, Page, Locator, expect } from "@playwright/test";

export class LandingPage extends BasePage {
  selectors: Record<string, Locator>;
  constructor(page: Page, context: BrowserContext) {
    super(page, "/", context);
    this.selectors = {
      signUpButton: this.page.getByRole("button", { name: "Sign up" }),
      signInButton: this.page.getByRole("button", { name: "Sign In" }),
    };
  }

  async isSignUpButtonVisible() {
    await expect(this.selectors.signUpButton).toBeVisible();
  }

  async clickSignUp() {
    this.selectors.signUpButton.click();
    return new RegistrationModal(this.page, this.context);
  }

  async clickSignIn() {
    this.selectors.signInButton.click();
    return new LoginModal(this.page, this.context);
  }
}
