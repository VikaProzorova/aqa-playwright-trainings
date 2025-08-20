import { expect, Page } from "@playwright/test";

export const validationConfig = {
  borderColor: "rgb(220, 53, 69)",
  errorClass: "is-invalid",
  errorMessageSelector: ".invalid-feedback",
};

export async function checkValidationError(
  page: Page,
  selector: string,
  invalidContent: string,
  errorText: string
): Promise<void> {
  const input = page.locator(selector);
  const errorMessage = page.locator(
    `.form-group:has(${selector}) ${validationConfig.errorMessageSelector} >> text=${errorText}`
  );
  await input.clear();
  await input.fill(invalidContent);
  await input.blur();
  await expect(input).toHaveCSS("border-color", validationConfig.borderColor);
  await expect(errorMessage).toBeVisible();
}

export async function checkValidationErrorValidContent(
  page: Page,
  selector: string,
  validContent: string
): Promise<void> {
  const input = page.locator(selector);
  const errorMessage = page.locator(
    `.form-group:has(${selector}) ${validationConfig.errorMessageSelector}`
  );
  await input.clear();
  await input.fill(validContent);
  await input.blur();
  await expect(input).not.toContainClass(validationConfig.errorClass);
  await expect(errorMessage).not.toBeVisible();
}
