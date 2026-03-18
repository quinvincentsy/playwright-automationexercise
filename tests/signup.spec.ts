import { test } from '@playwright/test';
import { SignupLoginPage } from '../pages/SignupLoginPage';

test.describe('QVS: TC1 - Register User', () => {
    test('register user and verify account info', async ({ page }) => {
        const signuploginPage = new SignupLoginPage(page);
        
        const timestamp = Date.now();
        const randomNumber = Math.floor(Math.random() * 1000);
        const name = `User${randomNumber}`;
        const email = `user${timestamp}@test.com`;

        await signuploginPage.goto();
        await signuploginPage.verifySignupHeaderText();

        // Enter signup info and submit
        await signuploginPage.enterNameAndEmail(name, email);

        // Verify account info page shows entered name and email
        await signuploginPage.verifyEnteredNameAndEmail(name, email);
    });
});