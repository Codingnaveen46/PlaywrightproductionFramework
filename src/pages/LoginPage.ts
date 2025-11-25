// src/pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';


export class LoginPage {
  readonly page: Page;
  readonly title: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly appleSsoButton: Locator;
  readonly microsoftSsoButton: Locator;
  readonly googleSsoButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByText('Welcome Back!', { exact: true });
    this.emailInput = page.locator('input').first();
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.passwordInput = page.locator('input[type="password"]');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });

    this.appleSsoButton = page.getByRole('button', { name: /Sign in with Apple/i });
    this.microsoftSsoButton = page.getByRole('button', { name: /Sign in with Microsoft/i });
    this.googleSsoButton = page.getByRole('button', { name: /Sign in with Google/i });
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async clickSubmit() {
    await this.emailInput.press('Enter');
    try {
      await this.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
    } catch (e) {
      // If Enter didn't work, try clicking the button
      await this.submitButton.click();
      await this.passwordInput.waitFor({ state: 'visible', timeout: 15000 });
    }
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async goto() {
    // Either hard-code, or better: keep in an env/config
    const url =
      process.env.FACILIO_LOGIN_URL ||
      'https://app.facilio.com/identity/login';
    await this.page.goto(url);
  }

  async assertOnLoginPage() {
    // Basic smoke assertion that we’re really on this page
    await expect(this.title).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
}
