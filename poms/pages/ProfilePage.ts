import { BasePage } from "./BasePage";
import { BrowserContext, Page, expect } from "@playwright/test";

export class ProfilePage extends BasePage {
  constructor(page: Page, context: BrowserContext) {
    super(page, "/panel/profile", context);
  }

  async isTitleVisible() {
    await expect(this.page.getByRole("heading", { name: "Profile" })).toBeVisible();
  }

  async isFullNameVisible(fullName: string) {
    await expect(this.page.locator('[class^="profile_name"]', { hasText: fullName })).toBeVisible();
  }
}
