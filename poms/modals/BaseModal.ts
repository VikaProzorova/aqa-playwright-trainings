import { BrowserContext, expect, Locator, Page } from "@playwright/test";

export class BaseModal {
  protected page: Page;
  protected context: BrowserContext;
  public selectors: Record<string, Locator>;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.selectors = {
      modalContent: this.page.locator('[class="modal-content"]'),
      modalHeader: this.page.locator('[class="modal-header"]'),
      submitButton: this.page.locator('[class="modal-footer"] [class$="primary"]'),
    };
  }

  async isModalVisible() {
    await expect(this.selectors.modalContent).toBeVisible();
  }

  async isSubmitButtonDisabled() {
    await expect(this.selectors.submitButton).toBeDisabled();
  }

  async isSubmitButtonVisible() {
    await expect(this.selectors.submitButton).toBeVisible();
  }

  async clickSubmitButton() {
    await this.selectors.submitButton.click();
  }
}
