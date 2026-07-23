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
    private employeeId = this.page.getByRole('textbox').nth(4);

    private createLoginDetailsToggle = this.page.locator('.oxd-switch-input');

    private userName = this.page.getByRole('textbox').nth(5);
    // Password inputs are type="password" — they have no ARIA "textbox" role,
    // so they can't be reached via getByRole('textbox').
    private password = this.page.locator('input[type="password"]').nth(0);
    private confirmPassword = this.page.locator('input[type="password"]').nth(1);

    private enableStaus = this.page.getByText('Enabled')
    private disabledStaus = this.page.getByText('Disabled')

    private saveBtn = this.page.getByRole('button', { name: 'Save' });

    private successToast = this.page.getByText('Successfully Saved');


    // Actions
    async clickAddBtn() {
        // await this.click(this.addBtn, "singleClick");
        await this.addBtn.click();
    }

    async fillEmployeeDetails(firstName: string, middleName: string, lastName: string, employeeId: string) {
        await this.fill(this.firstName, firstName);
        await this.fill(this.middleName, middleName);
        await this.fill(this.lastName, lastName);
        await this.employeeId.clear()
        await this.fill(this.employeeId, employeeId);
    }
    async createLoginDetails(userName: string, password: string, confirmPassword: string) {
        await this.fill(this.userName, userName);
        await this.fill(this.password, password);
        await this.fill(this.confirmPassword, confirmPassword);
    };

    async setCreateLoginDetails(enable: boolean) {
        // The toggle is a styled <span>; its CSS classes reflect focus/press
        // states, not the on/off state. The only reliable signal for "on" is
        // whether the login-details fields (username) are actually rendered.
        if ((await this.userName.isVisible()) !== enable) {
            await this.createLoginDetailsToggle.click();
        }
        if (enable) {
            await expect(this.userName).toBeVisible();
        } else {
            await expect(this.userName).toBeHidden();
        }
    }

    async clickSave() {
        await this.saveBtn.click();
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
        await expect(this.successToast).toBeVisible({ timeout: 10000 });
    }
}