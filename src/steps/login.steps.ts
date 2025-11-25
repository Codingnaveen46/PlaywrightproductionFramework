// src/steps/login.steps.ts
import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';
import { LoginPage } from '../pages/LoginPage';
import * as fs from 'fs';
import * as path from 'path';

Given('I am on the Facilio login page', async function (this: ICustomWorld) {
  const page = this.page!;
  const loginPage = new LoginPage(page);

  // optional: keep instance on world if you want
  (this as any).loginPage = loginPage;

  await loginPage.goto();
  await loginPage.assertOnLoginPage();
});

Then('I should see the login title {string}', async function (
  this: ICustomWorld,
  expectedTitle: string
) {
  const page = this.page!;
  const loginPage = new LoginPage(page);

  await expect(loginPage.title).toBeVisible();
  await expect(loginPage.title).toHaveText(expectedTitle);
});

Then('I should see the email address input field', async function (
  this: ICustomWorld
) {
  const page = this.page!;
  const loginPage = new LoginPage(page);

  await expect(loginPage.emailInput).toBeVisible();
  await expect(loginPage.emailInput).toBeEditable();
});

Then('I should see the submit button', async function (this: ICustomWorld) {
  const page = this.page!;
  const loginPage = new LoginPage(page);

  await expect(loginPage.submitButton).toBeVisible();
  await expect(loginPage.submitButton).toBeEnabled();
});

Then(
  'I should see SSO options for:',
  async function (this: ICustomWorld, dataTable) {
    const page = this.page!;
    const loginPage = new LoginPage(page);
    const providers: string[] = dataTable.raw().flat();

    for (const provider of providers) {
      switch (provider) {
        case 'Apple':
          await expect(loginPage.appleSsoButton).toBeVisible();
          break;
        case 'Microsoft':
          await expect(loginPage.microsoftSsoButton).toBeVisible();
          break;
        case 'Google':
          await expect(loginPage.googleSsoButton).toBeVisible();
          break;
        default:
          throw new Error(`Unknown SSO provider: ${provider}`);
      }
    }
  }
);

Then(
  'the login page URL should contain {string}',
  async function (this: ICustomWorld, pathFragment: string) {
    const page = this.page!;
    await expect(page).toHaveURL(new RegExp(pathFragment));
  }
);

Given('I enter the email {string}', async function (this: ICustomWorld, email: string) {
  const page = this.page!;
  const loginPage = new LoginPage(page);
  await loginPage.enterEmail(email);
});

Given('I enter the email from {string}', async function (this: ICustomWorld, userKey: string) {
  const page = this.page!;
  const loginPage = new LoginPage(page);
  
  // Load user data from users.json
  const usersDataPath = path.join(process.cwd(), 'src', 'data', 'users.json');
  const usersData = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'));
  
  const email = usersData[userKey]?.email;
  if (!email) {
    throw new Error(`User "${userKey}" not found in users.json or email is missing`);
  }
  
  await loginPage.enterEmail(email);
});

Given('I click the submit button', async function (this: ICustomWorld) {
  const page = this.page!;
  const loginPage = new LoginPage(page);
  await loginPage.clickSubmit();
});

Given('I enter the password {string}', async function (this: ICustomWorld, password: string) {
  const page = this.page!;
  const loginPage = new LoginPage(page);
  await loginPage.enterPassword(password);
});

Given('I enter the password from {string}', async function (this: ICustomWorld, userKey: string) {
  const page = this.page!;
  const loginPage = new LoginPage(page);
  
  // Load user data from users.json
  const usersDataPath = path.join(process.cwd(), 'src', 'data', 'users.json');
  const usersData = JSON.parse(fs.readFileSync(usersDataPath, 'utf-8'));
  
  const password = usersData[userKey]?.password;
  if (!password) {
    throw new Error(`User "${userKey}" not found in users.json or password is missing`);
  }
  
  await loginPage.enterPassword(password);
});

Given('I click the sign in button', async function (this: ICustomWorld) {
  const page = this.page!;
  const loginPage = new LoginPage(page);
  await loginPage.clickSignIn();
});

Then('I store the login data in the data folder', async function (this: ICustomWorld) {
  const page = this.page!;
  const dataDir = path.join(process.cwd(), 'data');
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  const loginData = {
    url: page.url(),
    title: await page.title(),
    timestamp: new Date().toISOString()
  };

  const filePath = path.join(dataDir, 'login_session.json');
  fs.writeFileSync(filePath, JSON.stringify(loginData, null, 2));
});
