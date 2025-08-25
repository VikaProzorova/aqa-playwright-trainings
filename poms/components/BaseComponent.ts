import { BrowserContext, Page, Locator } from "@playwright/test";

export class BaseComponent {
  protected page: Page;
  protected context: BrowserContext;
  public selectors: Record<string, Locator>;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }
}
