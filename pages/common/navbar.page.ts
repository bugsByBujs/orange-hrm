import { expect } from "@playwright/test";
import { BasePage } from "../base.page";

export class NavBarPage extends BasePage {
    // Locator
    private headerTitle = this.page.getByRole('heading', { name: 'Dashboard' });
    
    private searchBar = this.page.locator('.oxd-main-menu-search');
    private searchBarField = this.page.getByRole('textbox', { name: 'Search' });
    
    private expandBtn = this.page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('button');

    private pim = this.page.getByRole('link', { name: 'PIM' });
    /*
    private admin = this.page.getByRole('link', { name: 'Admin' }).click();
    private leave = this.page.getByRole('link', { name: 'Leave' }).click();
    private time = this.page.getByRole('link', { name: 'Time' }).click();
    private recruitment = this.page.getByRole('link', { name: 'Recruitment' }).click();
    private myInfo = this.page.getByRole('link', { name: 'My Info' }).click();
    private performance = this.page.getByRole('link', { name: 'Performance' }).click();
    private dashboard = this.page.getByRole('link', { name: 'Dashboard' }).click();
    private directory = this.page.getByRole('link', { name: 'Directory' }).click();
    private maintenance = this.page.getByRole('link', { name: 'Maintenance' }).click();
    private claim = this.page.getByRole('link', { name: 'Claim' }).click();
    private buzz = this.page.getByRole('link', { name: 'Buzz' }).click();
    */

    private navLinks = (name: string) => this.page.getByRole('link', { name });

    // action
    async gotoPage(name: string) {
        await this.click(this.navLinks(name), "singleClick");
        await this.page.waitForLoadState('networkidle');
    }
    async gotoPIM() {
        await this.click(this.pim, "singleClick");
    }
    async expandSidePanel() {
        await this.click(this.expandBtn, "singleClick");
    }
    async searchInMenu(term: string) {
        await this.fill(this.searchBarField, term);
    }
    

    // assert 


}