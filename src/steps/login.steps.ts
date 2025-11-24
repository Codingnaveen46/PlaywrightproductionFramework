import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
import { LoginPage } from '../pages/LoginPage';

import { getEnv } from '../../config/environment';
import { DataLoader } from '../support/data-loader';

Given('I am on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.navigateTo(getEnv().baseUrl);
});

When('I login with valid credentials', async function (this: CustomWorld) {
  const users = DataLoader.load('users');
  const loginPage = new LoginPage(this.page!);
  await loginPage.login(users.validUser.username, users.validUser.password);
});

Then('I should see the products page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  const title = await loginPage.getTitle();
  expect(title).toBe('Products');
});
