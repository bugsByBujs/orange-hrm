import { expect } from "@playwright/test";
import { BasePage } from "./base.page";



export class LeavePage extends BasePage {
    // Locators
    // *  Main Page
    private pageTitle = this.page.getByRole('heading', { name: 'Leave', exact: true });

    //* Assign Leave Page
    private assignLeavePageBtn = this.page.getByRole('link', { name: 'Assign Leave' })
    private assignLeaveTitle = this.page.getByRole('heading', { name: 'Assign Leave' })

    //* assign leave fields
    private EmployeeName = this.page.getByRole('textbox', { name: 'Type for hints' });
    private leaveType = this.page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2);
    // private leaveTypeOption = this.page.getByRole('option',) //! put this in the action do it could be dynamic
    // private fromDate = this.page.getByRole('textbox', { name: 'yyyy-dd-mm' }).nth(0);
    // private fromDate = this.page.locator(`//div[@class='oxd-date-input']`).nth(0);
    // private toDate = this.page.locator(`//div[@class='oxd-date-input']`).nth(1);
    private fromDate = this.page.locator('.oxd-date-input').nth(0).locator('input');
    private toDate = this.page.locator('.oxd-date-input').nth(1).locator('input');

    private confirmLeaveModal = this.page.getByText('Confirm Leave');
    private confirm = this.page.getByRole('button', { name: 'Ok' });
    private cancel = this.page.getByRole('button', { name: 'Cancel' });
    private closeModal = this.page.getByRole('button', { name: '×' });

    private assignBtn = this.page.getByRole('button', { name: 'Assign' });

    private successToast = this.page.getByText('Successfully Saved');


    // Actions
    async gotoAssignLeave() {
        await this.assignLeavePageBtn.click()
    }
    async fillLeaveForm(employeeName: string, leaveType: string, fromDate: string, toDate: string) {
        await this.EmployeeName.fill(employeeName)
        await expect(this.page.getByRole('option', {name: employeeName}))
        await this.page.getByRole('option', {name: employeeName}).click()
        await this.leaveType.click();
        await expect(this.page.getByRole('option', { name: `CAN - ${leaveType}`})).toBeVisible()
        await this.page.getByRole('option', { name: `CAN - ${leaveType}`}).click()
        await this.fromDate.clear()
        await this.fromDate.fill(fromDate)
        await this.toDate.clear()
        await this.toDate.fill(toDate)
    }

    async submit() {
        await this.assignBtn.click()
    }

    async confirmLeave() {
        await this.confirm.click()
    }

    async cancelConfirm() {
        await this.cancel.click()
    }

    async closeConfirmModal() {
        await this.closeModal.click()
    }

    // Asserts
    async isPageTitleVisible() {
        await expect(this.pageTitle).toBeVisible()
    }

    async isAssignLeaveTitleVisible() {
        await expect(this.assignLeaveTitle).toBeVisible()
    }

    async expectConfirmModal() {
        await expect(this.confirmLeaveModal).toBeVisible()
    }

    async expectSuccessToastVisible() {
        await expect(this.successToast).toBeVisible({ timeout: 10000 })
    }
}