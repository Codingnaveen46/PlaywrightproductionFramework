import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
});

Before(async function (this: CustomWorld, { pickle }) {
  this.testName = pickle.name.replace(/\W/g, '-');
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED) {
    const image = await this.page?.screenshot();
    if (image) {
      await this.attach(image, 'image/png');
    }
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
});
