import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly dashboardHeader: Locator;
  readonly createDashboardButton: Locator;
  readonly createFolderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboards' });
    this.createDashboardButton = page.getByRole('button', { name: 'Create Dashboard' });
    this.createFolderButton = page.getByRole('button', { name: 'Create Folder' });
  }

  async assertOnDashboardPage() {
    // Verify we're no longer on the login page
    await expect(this.page).toHaveURL(/.*app\.facilio\.com\/(?!identity)/, { timeout: 15000 });
  }

  async verifyDashboardElements() {
    await expect(this.createDashboardButton).toBeVisible();
    await expect(this.createFolderButton).toBeVisible();
  }
}
