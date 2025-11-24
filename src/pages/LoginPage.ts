import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = '#user-name';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login-button';
  private readonly title = '.title';

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.fillText(this.usernameInput, username);
    await this.fillText(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async getTitle() {
    return await this.getText(this.title);
  }
}
