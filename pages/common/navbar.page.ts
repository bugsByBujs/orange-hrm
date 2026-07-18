import { expect } from "@playwright/test";
import { BasePage } from "../base.page";

export class NavBarPage extends BasePage {
    // Locator
    private searchBarField = this.page.getByRole('textbox', { name: 'Search' });
    
    private expandBtn = this.page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('button').click();
    private searchBar = this.page.locator('.oxd-main-menu-search').click();
    private admin = this.page.getByRole('link', { name: 'Admin' }).click();
    private pim = this.page.getByRole('link', { name: 'PIM' }).click();
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

    // action

    // assert 

}