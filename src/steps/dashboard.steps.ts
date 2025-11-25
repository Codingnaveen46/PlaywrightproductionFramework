import { Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/custom-world';
import { DashboardPage } from '../pages/DashboardPage';

Then('I should be redirected to the dashboard page', async function (this: ICustomWorld) {
  const page = this.page!;
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.assertOnDashboardPage();
});

Then('I wait for {int} seconds to view the dashboard', async function (this: ICustomWorld, seconds: number) {
  const page = this.page!;
  await page.waitForTimeout(seconds * 1000);
});

Then('I should see the dashboard header', async function (this: ICustomWorld) {
  const page = this.page!;
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.assertOnDashboardPage();
});

Then('I should see the create dashboard buttons', async function (this: ICustomWorld) {
  const page = this.page!;
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.verifyDashboardElements();
});
