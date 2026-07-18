import { expect } from '@playwright/test';
import { testLogin } from "../fixtures/login.fixture";
import { userAdmin } from "../test-data/user_accounts.json"

testLogin('Login setup', async ({page, loginPage, dashboardPage}) => {
    await loginPage.login(userAdmin.username, userAdmin.password);
    await dashboardPage.isTitleVisible()
    await page.context().storageState({ path: '.auth/user.json' });
})