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
import { testLogin as test } from '../../fixtures/login.fixture'
import { userAdmin } from '../../test-data/user_accounts.json'


test.describe('Login - Positive test cases',
    { tag: ['@regression', '@smoke'] }, async () => {
        test('LOGIN-001 - Login with valid credentials', async ({ loginPage, dashboardPage }) => {
            await loginPage.login(userAdmin.username, userAdmin.password)
            await dashboardPage.isTitleVisible()
        })
    });




