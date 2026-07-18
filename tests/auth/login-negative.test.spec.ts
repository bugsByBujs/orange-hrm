import { testLogin as test } from '../../fixtures/login.fixture'
import { user, invalidUser } from '../../test-data/user_accounts.json'

test.describe('Login - Negative test cases', async () => {

    test('LOGIN-002 - Login with invalid username',
        { tag: ['@regression'] }, async ({ loginPage }) => {
            await loginPage.login(invalidUser.username, user.password);
            await loginPage.errorMessageContains('Invalid credentials');
        })

    test('LOGIN-003 - Login with invalid password',
        { tag: ['@regression'] }, async ({ loginPage }) => {
            await loginPage.login(user.username, invalidUser.password);
            await loginPage.errorMessageContains('Invalid credentials');
        })

    test('LOGIN-004 - Login with both invalid username and password',
        { tag: ['@regression'] }, async ({ loginPage }) => {
            await loginPage.login(invalidUser.username, invalidUser.password);
            await loginPage.errorMessageContains('Invalid credentials');
        })

    test('LOGIN-005 - Username empty',
        { tag: ['@regression'] }, async ({ loginPage }) => {
            await loginPage.login('', user.password);
            await loginPage.isRequiredErrorVisible('username')
        })

    test('LOGIN-006 - Password empty',
        { tag: ['@regression'] }, async ({ loginPage }) => {
            await loginPage.login(user.username, '');
            await loginPage.isRequiredErrorVisible('username');
        })
        
    test('LOGIN-007 - Both fields empty',
        { tag: ['@regression'] }, async ({ loginPage }) => {
            await loginPage.login('', '');
            await loginPage.isRequiredErrorVisible('username');
            await loginPage.isRequiredErrorVisible('password');
        })
});