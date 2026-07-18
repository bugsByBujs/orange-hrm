import { testE2E as test } from '../../fixtures/pages.fixture'
import { userAdmin } from '../../test-data/user_accounts.json'

test.describe('Happy Path - Full user journey',
    { tag: ['@happy-path'] }, async () => {

        test('E2E-001 - Create a new employee and give the new user a leave it should reflect with the user when they sign in',
            async ({ page, loginPage, dashboardPage, pimPage, navBar }) => {
            /**
             * admin logs in
             * admin clicks PIM from nav bar - navigates to Pim page
             * admin clicks add btn - navigates to Add Employee page
             * admin fills all fields
             * success toast pops up
             * admin click leave - navigates to leave page
             * admin click assign leave - navigates to assign leave page
             * user fills required fields (continue even without leave credits)
             * success toast pops up
             * admin logs out
             * new account logs in
             * new user clicks Leave from nav bar - navigates to my leave list
             * leave should show on the Record Found section with proper date set
             */
            test.step('Admin logs in to the site', async () => {
                await loginPage.login(userAdmin.username, userAdmin.password);
                await loginPage.isTitleVisible();
            })
            test.step('Navigate to PIM page', async () => {
                await navBar.
            })
        })
    })
