import { BaseModal } from "./BaseModal";

export class RegistrationModal extends BaseModal {
  selectors = {
    // @ts-ignore
    ...this.selectors,
    nameInput: this.page.locator("input#signupName"),
    lastNameInput: this.page.locator("input#signupLastName"),
    emailInput: this.page.locator("input#signupEmail"),
    passwordInput: this.page.locator("input#signupPassword"),
    repeatPasswordInput: this.page.locator("input#signupRepeatPassword"),
  };

  async typeName(name: string) {
    await this.selectors.nameInput.fill(name);
  }

  //async getErrorMessage() {}

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
}
