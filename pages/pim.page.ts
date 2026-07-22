import { expect } from "@playwright/test";
import { BasePage } from "./base.page";

type Status = 'Enabled' | 'Disabled';

export class PimPage extends BasePage {
    // Locators
    // PIM PAGE
    private pageTitle = this.page.getByRole('heading', { name: 'Employee Information' });

    private addBtn = this.page.getByRole('button', { name: ' Add' });

    // ADD EMPLOYEE PAGE
    private cardTitle = this.page.getByRole('heading', { name: 'Add Employee' });

    private firstName = this.page.getByRole('textbox', { name: 'First Name' });
    private middleName = this.page.getByRole('textbox', { name: 'Middle Name' });
    private lastName = this.page.getByRole('textbox', { name: 'Last Name' });

    private createLoginDetailsToggle = this.page.locator('.oxd-switch-input');

    private userName = this.page.getByRole('textbox').nth(5);
    private password = this.page.getByRole('textbox').nth(6);
    private confirmPassword = this.page.getByRole('textbox').nth(7);

    private enableStaus = this.page.getByText('Enabled')
    private disabledStaus = this.page.getByText('Disabled')

    private successToast = this.page.getByText('Successfully Saved');


    // Actions
    async clickAddBtn() {
        // await this.click(this.addBtn, "singleClick");
        await this.addBtn.click();
    }

    async fillEmployeeDetails(firstName: string, middleName: string, lastName: string) {
        await this.fill(this.firstName, firstName);
        await this.fill(this.middleName, middleName);
        await this.fill(this.lastName, lastName);
    }
    async createLoginDetails(userName: string, password: string, confirmPassword: string) {
        await this.fill(this.userName, userName);
        await this.fill(this.password, password);
        await this.fill(this.confirmPassword, confirmPassword);
    };

    async setCreateLoginDetails(enable: boolean) {
        if ((await this.createLoginDetailsToggle.isChecked()) != enable) {
            await this.createLoginDetailsToggle.click();
        }
        await expect(this.createLoginDetailsToggle).toHaveJSProperty('checked', enable);
    }

    async setStatus(type: Status) {
        if (type === 'Enabled') {
            this.enableStaus.click();
        } else {
            this.disabledStaus.click();
        }
    }


    // Asserts
    async isPageTitleVisible() {
        await this.page.waitForURL('**/pim/viewEmployeeList');
        await this.pageTitle.waitFor({ state: 'visible' });
        await expect(this.pageTitle).toBeVisible({
            timeout: 15000
        });
    }

    async isCardTitleVisible() {
        await expect(this.cardTitle).toBeVisible();
    }
    async isSuccessToastVisible() {
        await expect(this.successToast).toBeVisible();
    }
}