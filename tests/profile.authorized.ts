import { test } from "@playwright/test";
import { validUserData } from "../utils/testsContent";
import { ProfilePage } from "../poms";

test.describe("Profile response change", () => {
  let profilePage: ProfilePage;
  const newFirstName: string = validUserData.name;
  const newLastName: string = validUserData.lastName;

  test.beforeEach(async ({ page, context }) => {
    await page.route("**/api/users/profile", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      json.data.name = newFirstName;
      json.data.lastName = newLastName;
      await route.fulfill({ response, json });
    });

    profilePage = new ProfilePage(page, context);
    await profilePage.open();
  });

  test("Check the new name", async () => {
    await profilePage.isTitleVisible();
    await profilePage.isFullNameVisible(`${newFirstName} ${newLastName}`);
  });
});
