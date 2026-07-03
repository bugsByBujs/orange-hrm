import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboad.page';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage
}

const test = baseTest.extend<Fixtures> ({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async({page}, use) => {
        await use(new DashboardPage(page));
    }
});

export { test };

export const testLogin = test.extend({
    loginPage: async({page}, use) => {
        const lp = new LoginPage(page);
        await lp.goto('/web/index.php/auth/login');
        await use(lp);
    }
})