import { expect } from "@playwright/test";
import { BasePage } from "./base.page";

type Status = 'Enabled' | 'Disabled';

export class PimPage extends BasePage {
    // Locators
    private addBtn = this.page.getByRole('button', {name: 'Add'}).click();

    private cardTitle = this.page.getByRole('heading', { name: 'Add Employee' });

    private firstName = this.page.getByRole('textbox', { name: 'First Name'});
    private middleName = this.page.getByRole('textbox', { name: 'Middle Name'});
    private lastName = this.page.getByRole('textbox', { name: 'Last Name'});

    private createLoginDetailsToggle = this.page.locator('.oxd-switch-input');

    private userName = this.page.getByRole('textbox').nth(5);
    private password = this.page.getByRole('textbox').nth(6);
    private confirmPassword = this.page.getByRole('textbox').nth(7);

    private enableStaus = this.page.getByText('Enabled')
    private disabledStaus = this.page.getByText('Disabled')


    // Actions
    async setCreateLoginDetails(enable: boolean) {
        if((await this.createLoginDetailsToggle.isChecked()) != enable) {
            await this.createLoginDetailsToggle.click();
        }
    }

    async setStatus(type: Status) {
        if(type === 'Enabled') {
            this.enableStaus.click();
        } else {
            this.disabledStaus.click();
        }
    }


    // Asserts 


}