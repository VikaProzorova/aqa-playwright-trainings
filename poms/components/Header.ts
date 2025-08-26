import { BaseComponent } from "./BaseComponent";
import { BrowserContext, Page, Locator, expect } from "@playwright/test";

export class Header extends BaseComponent {
  selectors: Record<string, Locator>;

  constructor(page: Page, context: BrowserContext) {
    super(page, context);
    this.selectors = {
      myProfileMenu: this.page.locator('[id="userNavDropdown"]'),
      logoutButton: this.page.getByRole("button", { name: "Logout" }),
      signInButton: this.page.getByRole("button", { name: "Sign In" }),
    };
  }

  async isMyProfileMenuVisible() {
    await expect(this.selectors.myProfileMenu).toBeVisible();
  }

  async openMyProfileMenu() {
    await this.selectors.myProfileMenu.click();
  }

  async clickLogout() {
    await this.selectors.logoutButton.click();
  }

  async isSignInVisible() {
    await expect(this.selectors.signInButton).toBeVisible();
  }
}
