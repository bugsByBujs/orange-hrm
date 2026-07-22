import { test as baseTest } from '@playwright/test';
import { DashboardPage } from "../pages/dashboard.page"
import { LoginPage } from "../pages/login.page";
import { NavBarPage } from '../pages/common/navbar.page';
import { PimPage } from '../pages/pim.page';

type Fixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    navBar: NavBarPage;
    pimPage: PimPage;
}

const test = baseTest.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    pimPage: async ({page}, use) => {
        await use(new PimPage(page));
    },
    navBar: async ({page}, use) => {
        await use(new NavBarPage(page));
    }
})

export { test }

export const testE2E = test.extend({
    dashboardPage: async({page}, use) => {
        const dp = new DashboardPage(page);
        await dp.goto('/web/index.php/dashboard/index');
        await use(dp);
    }
})