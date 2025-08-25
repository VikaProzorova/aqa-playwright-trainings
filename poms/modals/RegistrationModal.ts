import { expect, Locator } from "@playwright/test";
import { BaseModal } from "./BaseModal";

export const errorBorderColor: string = "rgb(220, 53, 69)";

export class RegistrationModal extends BaseModal {
  selectors = {
    // @ts-ignore
    ...this.selectors,
    nameInput: this.page.locator("input#signupName"),
    lastNameInput: this.page.locator("input#signupLastName"),
    emailInput: this.page.locator("input#signupEmail"),
    passwordInput: this.page.locator("input#signupPassword"),
    repeatPasswordInput: this.page.locator("input#signupRepeatPassword"),
    errorMessage: (errorText: string) =>
      this.page.locator(".invalid-feedback", { hasText: errorText }),
  };

  async typeName(name: string) {
    await this.selectors.nameInput.fill(name);
  }

  async typeLastName(lastName: string) {
    await this.selectors.lastNameInput.fill(lastName);
  }

  async typeEmail(email: string) {
    await this.selectors.emailInput.fill(email);
  }

  async typePassword(password: string) {
    await this.selectors.passwordInput.fill(password);
  }

  async typeRepeatPassword(repeatPassword: string) {
    await this.selectors.repeatPasswordInput.fill(repeatPassword);
  }

  async executeRegistration(user: Record<string, string>) {
    await this.typeName(user.name);
    await this.typeLastName(user.lastName);
    await this.typeEmail(user.email);
    await this.typePassword(user.password);
    await this.typeRepeatPassword(user.repeatPassword);
    await this.clickSubmitButton();
  }

  async isErrorMessageVisible(errorMsg: string) {
    await expect(this.selectors.errorMessage(errorMsg)).toBeVisible();
  }

  async isInputBorderedRed(locator: Locator) {
    await expect(locator).toHaveCSS("border-color", errorBorderColor);
  }

  async checkNameInputError(errorMsg: string) {
    await this.selectors.nameInput.blur();
    await this.isSubmitButtonDisabled();
    await this.isInputBorderedRed(this.selectors.nameInput);
    await this.isErrorMessageVisible(errorMsg);
  }

  async checkLastNameInputError(errorMsg: string) {
    await this.selectors.lastNameInput.blur();
    await this.isSubmitButtonDisabled();
    await this.isInputBorderedRed(this.selectors.lastNameInput);
    await this.isErrorMessageVisible(errorMsg);
  }

  async checkEmailInputError(errorMsg: string) {
    await this.selectors.emailInput.blur();
    await this.isSubmitButtonDisabled();
    await this.isInputBorderedRed(this.selectors.emailInput);
    await this.isErrorMessageVisible(errorMsg);
  }

  async checkPasswordInputError(errorMsg: string) {
    await this.selectors.passwordInput.blur();
    await this.isSubmitButtonDisabled();
    await this.isInputBorderedRed(this.selectors.passwordInput);
    await this.isErrorMessageVisible(errorMsg);
  }

  async checkRepeatPasswordInputError(errorMsg: string) {
    await this.selectors.repeatPasswordInput.blur();
    await this.isSubmitButtonDisabled();
    await this.isInputBorderedRed(this.selectors.repeatPasswordInput);
    await this.isErrorMessageVisible(errorMsg);
  }
}
