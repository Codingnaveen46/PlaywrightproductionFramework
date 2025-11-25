import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly dashboardHeader: Locator;
  readonly createDashboardButton: Locator;
  readonly createFolderButton: Locator;
  readonly sidebarMenuIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboards' });
    this.createDashboardButton = page.getByRole('button', { name: 'Create Dashboard' });
    this.createFolderButton = page.getByRole('button', { name: 'Create Folder' });
    
    // Sidebar menu icon
    this.sidebarMenuIcon = page.locator('div.flex.justify-center.cursor-pointer.css-1onvxcm');
  }

  async assertOnDashboardPage() {
    // Verify we're no longer on the login page
    await expect(this.page).toHaveURL(/.*app\.facilio\.com\/(?!identity)/, { timeout: 15000 });
  }

  async goToDashboard() {
    // Click on Dashboard link in the header to navigate to dashboard
    await this.page.click('text=Dashboard');
    await this.page.waitForTimeout(2000);
  }

  async verifyDashboardElements() {
    await expect(this.createDashboardButton).toBeVisible();
    await expect(this.createFolderButton).toBeVisible();
  }

  async clickSidebarMenuIcon() {
    await this.sidebarMenuIcon.click();
    // Wait for sidebar to expand
    await this.page.waitForTimeout(500);
  }
}
