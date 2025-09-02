import { BasePage } from "./BasePage";
import { AddCarModal, EditCarModal } from "../modals";
import { BrowserContext, Page, Locator, expect } from "@playwright/test";

export class GaragePage extends BasePage {
  constructor(page: Page, context: BrowserContext) {
    super(page, "/panel/garage", context);
  }
  selectors = {
    title: this.page.getByRole("heading", { name: "Garage" }),
    addCarButton: this.page.getByRole("button", { name: "Add car", exact: true }),
    addFuelExpenseButton: this.page.getByRole("button", { name: "Add fuel expense" }),
  };

  getCarRow(carName: string): Locator {
    return this.page
      .getByRole("listitem")
      .filter({ has: this.page.locator(".car_name", { hasText: carName }) });
  }

  async isTitleVisible() {
    await expect(this.selectors.title).toBeVisible();
  }

  async isAddCarButtonVisible() {
    await expect(this.selectors.addCarButton).toBeVisible();
  }

  async clickAddCar() {
    await this.selectors.addCarButton.click();
    const modal = new AddCarModal(this.page, this.context);
    await modal.isModalVisible();
    return modal;
  }

  async isAddedCarVisible(carName: string, mileage: string) {
    const carRow = this.getCarRow(carName);
    await expect(carRow).toBeVisible();
    await expect(carRow.locator('input[name="miles"]')).toHaveValue(mileage);
  }

  async isAddFuelExpenseButtonVisible() {
    await expect(this.selectors.addFuelExpenseButton).toBeVisible();
  }

  async removeCar(carName: string) {
    const carRow = this.getCarRow(carName);
    const editButton = carRow.locator('button[class^="car_edit"]');
    await editButton.click();
    const editModal = new EditCarModal(this.page, this.context);
    await editModal.isTitleVisible();
    await editModal.clickRemoveCar();
    await this.isTitleVisible();
    await expect(carRow).not.toBeVisible();
  }
}
