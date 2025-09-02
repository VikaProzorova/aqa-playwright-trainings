import { test as base } from "@playwright/test";
import { GaragePage } from "../poms";

export const garageTest = base.extend<{ garagePage: GaragePage }>({
  garagePage: async ({ page, context }, use) => {
    const garagePage = new GaragePage(page, context);
    await garagePage.open();
    await use(garagePage);
  },
});
