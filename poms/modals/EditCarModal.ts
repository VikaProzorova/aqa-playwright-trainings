import { expect } from "@playwright/test";
import { BaseModal } from "./BaseModal";
import { RemoveCarModal } from "../modals";

export class EditCarModal extends BaseModal {
  override get selectors() {
    return {
      ...super.selectors,
      removeCarButton: this.page.getByRole("button", { name: "Remove car" }),
    };
  }

  async isTitleVisible() {
    expect(this.page.getByRole("heading", { name: "Edit a car" })).toBeVisible;
  }

  async clickRemoveCar() {
    await this.selectors.removeCarButton.click();
    const removeModal = new RemoveCarModal(this.page, this.context);
    await removeModal.isTitleVisible();
    await removeModal.clickRemoveCar();
  }
}
