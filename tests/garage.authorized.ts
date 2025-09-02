import { garageTest as test } from "../fixtures";
import { carTestData } from "../utils/testsContent";

test.describe("Garage page tests", () => {
  const carName = `${carTestData.brand} ${carTestData.model}`;

  test("Garage page step-by-step test", async ({ page, garagePage }) => {
    await test.step("Initial components check", async () => {
      await garagePage.isTitleVisible();
      await garagePage.isAddCarButtonVisible();
      await page.reload();
    });

    await test.step("Add car", async () => {
      const addCarModal = await garagePage.clickAddCar();
      await addCarModal.executeAddCar(carTestData);
    });

    await test.step("New car data check", async () => {
      await garagePage.isAddedCarVisible(carName, carTestData.mileage);
      await garagePage.isAddFuelExpenseButtonVisible();
    });

    await test.step("Remove car", async () => {
      await garagePage.removeCar(carName);
    });
  });
});
