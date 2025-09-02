import { expect } from "@playwright/test";
import { BaseErrorModal } from "./BaseErrorModal";

export class RemoveCarModal extends BaseErrorModal {
  async isTitleVisible() {
    expect(this.page.getByRole("heading", { name: "Remove car" })).toBeVisible;
  }
  async clickRemoveCar() {
    await this.clickSubmitButton();
  }
}
