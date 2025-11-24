import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async clickElement(selector: string) {
    await this.page.click(selector);
  }

  async fillText(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string> {
    return await this.page.innerText(selector);
  }

  async waitForElement(selector: string) {
    await this.page.waitForSelector(selector);
  }
}
