import { BaseModal } from "./BaseModal";

export class LoginModal extends BaseModal {
  override get selectors() {
    return {
      ...super.selectors,
      emailInput: this.page.locator("input#signinEmail"),
      passwordInput: this.page.locator("input#signinPassword"),
    };
  }

  async typeEmail(email: string) {
    await this.selectors.emailInput.fill(email);
  }

  async typePassword(password: string) {
    await this.selectors.passwordInput.fill(password);
  }

  async executeLogin(email: string, password: string) {
    await this.typeEmail(email);
    await this.typePassword(password);
    await this.clickSubmitButton();
  }
}
