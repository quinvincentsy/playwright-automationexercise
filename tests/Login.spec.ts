import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import testdata from '../fixtures/testdata.json';

test.describe('Login Test', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await homePage.goto();
        await homePage.clickLogin();
        await loginPage.verifyLoginHeader();
    });

    test('Login with valid credentials', async () => {
        await test.step('Login with valid credentials', async () => {
            await loginPage.login(testdata.users.valid.email, testdata.users.valid.password);
        });

        await test.step('Verify user is logged in', async () => {
            await homePage.verifyLoggedIn(testdata.users.valid.name);
        });

        await test.step('Logout', async () => {
            await homePage.logout.click();
        });
    });

    for (const invalidUser of testdata.users.invalid) {
        test(`Login with invalid credentials (${invalidUser.email})`, async () => {
            await test.step('Attempt login with invalid credentials', async () => {
                await loginPage.login(invalidUser.email, invalidUser.password);
            });

            await test.step('Verify login error is shown', async () => {
                await loginPage.verifyLoginError();
            });
        });
    }
});