import { BaseModal } from "./BaseModal";

export class AddCarModal extends BaseModal {
  override get selectors() {
    return {
      ...super.selectors,
      brandDropdown: this.page.locator('[id="addCarBrand"]'),
      modelDropdown: this.page.locator('[id="addCarModel"]'),
      mileageInput: this.page.locator('[id="addCarMileage"]'),
    };
  }

  async selectBrand(brand: string) {
    await this.selectors.brandDropdown.selectOption(brand);
  }

  async selectModel(model: string) {
    await this.selectors.modelDropdown.selectOption(model);
  }

  async fillMileage(mileage: string) {
    await this.selectors.mileageInput.fill(mileage);
  }

  async executeAddCar(carTestData: Record<string, any>) {
    await this.selectBrand(carTestData.brand);
    await this.selectModel(carTestData.model);
    await this.fillMileage(carTestData.mileage);
    await this.clickSubmitButton();
  }
}
