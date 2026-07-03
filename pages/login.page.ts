import { expect } from "@playwright/test";
import { BasePage } from "./base.page";

export type requiredFields = 'username' | 'password';

export class LoginPage extends BasePage {
    // locators
    private headerTitle = this.page.getByRole('heading', { name: 'Login' });

    private usernameField = this.page.getByRole('textbox', { name: 'Username' });
    private passwordField = this.page.getByRole('textbox', { name: 'Password' });
    private loginBtn = this.page.getByRole('button', { name: 'Login' });
    private forgetPassBtn = this.page.getByText('Forget your assword?' );

    private usernameErrorMessage = this.page.getByText('Required').nth(0);
    private passwordErrorMessage = this.page.getByText('Required').nth(1);

    private errorMessage = this.page.getByRole('alert');
    
    // actions
    async login(username: string, pass: string){
        await this.fill(this.usernameField, username);
        await this.fill(this.passwordField, pass)
        await this.click(this.loginBtn, "singleClick")
    }

    async gotoForgetPassword() {
        await this.click(this.forgetPassBtn, "singleClick");
    }

    // asserts

    // isTitleVisible
    async isTitleVisible() {
        await this.isVisible(this.headerTitle);
        await expect.soft(this.headerTitle).toHaveText('Login');
    }

    // check the required field
    async isRequiredErrorVisible(type: requiredFields){
        switch(type) {
            case "username":
                await this.isVisible(this.usernameErrorMessage)
                await expect(this.usernameErrorMessage).toHaveText('Required')
                break
            case "password":
                await this.isVisible(this.passwordErrorMessage)
                await expect(this.passwordErrorMessage).toHaveText('Required')
                break
        }
    }

    // invalid credentials
    async errorMessageContains(text: string) {
        await this.errorMessage.waitFor({
            state: 'visible'
        });
        await expect(this.resolve(this.errorMessage)).toContainText(text)
    }
}