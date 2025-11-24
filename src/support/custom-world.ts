import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { BrowserContext, Page, PlaywrightTestOptions, APIRequestContext } from '@playwright/test';

export interface ICustomWorld extends World {
  context?: BrowserContext;
  page?: Page;
  testName?: string;
}

export class CustomWorld extends World implements ICustomWorld {
  context?: BrowserContext;
  page?: Page;
  testName?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
