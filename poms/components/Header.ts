import { expect } from "@playwright/test";
import { BaseComponent } from "./BaseComponent";

export class Header extends BaseComponent {
  selectors = {
    myProfileMenu: this.page.locator('[id="userNavDropdown"]'),
    logoutButton: this.page.getByRole("button", { name: "Logout" }),
    signInButton: this.page.getByRole("button", { name: "Sign In" }),
  };
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
