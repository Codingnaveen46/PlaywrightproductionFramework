import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/custom-world';
import { LoginPage } from '../pages/LoginPage';

Given('I am on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.navigateTo('https://www.saucedemo.com/');
});

When('I login with valid credentials', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.login('standard_user', 'secret_sauce');
});

Then('I should see the products page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  const title = await loginPage.getTitle();
  expect(title).toBe('Products');
});
