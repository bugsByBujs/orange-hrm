/*
todo:
* LOGIN-001		Login with valid credentials	                	Smoke, Regression
* LOGIN-002		Login with invalid username	                    	Regression
* LOGIN-003		Login with invalid password                 		Regression
* LOGIN-004		Login with both invalid username and password		Regression
* LOGIN-005		Username empty	                                	Regression
* LOGIN-006		Password empty	                                	Regression
* LOGIN-007		Both fields empty	                            	Regression
? LOGIN-008		Password is masked	                            	Regression
? LOGIN-009		Press Enter submits login	                    	Regression
*/
import { expect } from '@playwright/test';
import { testLogin as test } from '../../fixtures/login.fixture'
import { userAdmin, user, invalidUser } from '../../test-data/user_accounts.json'

test.describe('Regression testing for login', async () => {
    test('LOGIN-001 - Login with valid credentials', async ({ page, loginPage, dashboardPage }) => {
        await loginPage.login(userAdmin.username, userAdmin.password)
        // await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
        await dashboardPage.isTitleVisible()
    })
    test('LOGIN-002 - Login with invalid username', async ({ page, loginPage }) => {
        await loginPage.login(invalidUser.username, user.password);
        await loginPage.errorMessageContains('Invalid credentials');
    })
    test('LOGIN-003 - Login with invalid password', async ({ page, loginPage }) => {
        await loginPage.login(user.username, invalidUser.password);
        await loginPage.errorMessageContains('Invalid credentials');
    })
    test('LOGIN-004 - Login with both invalid username and password', async ({ page, loginPage }) => {
        await loginPage.login(invalidUser.username, invalidUser.password);
        await loginPage.errorMessageContains('Invalid credentials');
    })
    test('LOGIN-005 - Username empty', async ({ page, loginPage }) => {
        await loginPage.login('', user.password);
        await loginPage.isRequiredErrorVisible('username')
    })
    test('LOGIN-006 - Password empty', async ({ page, loginPage }) => {
        await loginPage.login(user.username, '');
        await loginPage.isRequiredErrorVisible('username');
    })
    test('LOGIN-007 - Both fields empty', async ({ page, loginPage }) => {
        await loginPage.login('', '');
        await loginPage.isRequiredErrorVisible('username');
        await loginPage.isRequiredErrorVisible('password');
    })
})