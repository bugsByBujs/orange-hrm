import { testE2E as test } from '../../fixtures/pages.fixture'
import { userAdmin } from '../../test-data/user_accounts.json'
import { new_employee } from '../../test-data/new_employee.json'
import { faker } from '@faker-js/faker'

test.describe('Happy Path - Full user journey', async () => {

    test('E2E-001 - Create a new employee and give the new user a leave it should reflect with the user when they sign in',
        { tag: ['@happy-path'] }, async ({ page, loginPage, dashboardPage, pimPage, navBar, leavePage }) => {
            /**
             ** admin logs in
             ** admin clicks PIM from nav bar - navigates to Pim page
             ** admin clicks add btn - navigates to Add Employee page
             ** admin fills all fields for the new employee
             ** success toast pops up
             ** admin click leave - navigates to leave page
             ** admin click assign leave - navigates to assign leave page
             ** user fills required fields (continue even without leave credits)
             ** success toast pops up
             * admin logs out
             * new account logs in
             * new user clicks Leave from nav bar - navigates to my leave list
             * leave should show on the Record Found section with proper date set
             */
            const firstName = faker.person.firstName();
            const middleName = faker.person.middleName();
            const lastName = faker.person.lastName();
            const fullName =  firstName + " " + middleName + " "  + lastName;
            const employeeId = (lastName.slice(0, 5) + faker.string.numeric(5)).slice(0, 10);

            const username = faker.internet.username({ firstName, lastName: lastName })
            const password = faker.internet.password({ length: 10, pattern: /[A-Za-z0-9]/ });

            console.log('name: ', firstName + " " + middleName + " "  + lastName)
            console.log('User & Pass: ', username, " & ", password )
            console.log('Id: ', employeeId)

            // test.step('Admin logs in to the site', async () => {
            // await loginPage.login(userAdmin.username, userAdmin.password);
            await dashboardPage.isTitleVisible();
            // });

            await test.step('Navigate to PIM page', async () => {
                await navBar.gotoPage('PIM');
                // await navBar.gotoPIM()
                await pimPage.isPageTitleVisible();
            });

            await test.step('Add a new employee', async () => {
                await pimPage.clickAddBtn();
                await pimPage.isCardTitleVisible();
                await test.step('Fill the user name', async () => {
                    await pimPage.fillEmployeeDetails(
                        firstName,
                        middleName,
                        lastName,
                        employeeId
                    );
                })
                await test.step('Create login details for the new employee', async () => {
                    await test.step('Enable the create login details toggle', async () => {
                        await pimPage.setCreateLoginDetails(true);
                    })
                    await test.step('Fill the login details', async () => {
                        await pimPage.createLoginDetails(
                            username,
                            password,
                            password
                        );
                    })
                    await test.step('Save the new employee', async () => {
                        await pimPage.clickSave();
                    })
                    await pimPage.isSuccessToastVisible();
                })
            })

            await test.step('Admin gives employeee a leave', async () => [
                await test.step('Navigate to leave page', async() => {
                    await navBar.gotoPage('Leave');
                    await leavePage.isPageTitleVisible()
                }),

                await test.step('Go to Assing Leave', async() => {
                    await leavePage.gotoAssignLeave();
                    await leavePage.isAssignLeaveTitleVisible()
                }),

                await test.step('Fill up leave form', async() => {
                    //! use the date format yyyy-mm-dd
                    await leavePage.fillLeaveForm(
                        fullName, 
                        "Personal",
                        "2026-09-09",
                        "2026-09-09",
                    )
                    await leavePage.submit()
                    await leavePage.expectConfirmModal()
                    await leavePage.confirmLeave()
                    await leavePage.expectSuccessToastVisible()
                })
            ])

        });
});
