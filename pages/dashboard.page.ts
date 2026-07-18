import { expect  } from "@playwright/test";
import { BasePage } from "./base.page";

export class DashboardPage extends BasePage {
    // locator 
    private headerTitle = this.page.getByRole('heading', { name: 'Dashboard' })
    
    // actions

    // asserts
    async isTitleVisible() {
        await this.isVisible(this.headerTitle);
        await expect.soft(this.headerTitle).toHaveText('Dashboard');
    }
}