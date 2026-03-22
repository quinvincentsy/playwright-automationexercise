import { test as base, Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignupPage, SignupData } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

// The full user shape needed for signup + login
type UserAccount = SignupData & { name: string; email: string };

type MyFixtures = {
    userPage: Page;
    userAccount: UserAccount; // expose credentials in case tests need them
};

function generateUser(): UserAccount {
    return {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        address1: faker.location.streetAddress(),
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobile: '09' + faker.string.numeric(9),
        dob_day: '1',
        dob_month: 'January',
        dob_year: '1990',
        country: 'United States',
    };
}

export const test = base.extend<MyFixtures>({
    // Expose the generated user data so tests can reference name, email, etc.
    userAccount: async ({}, use) => {
        const user = generateUser();
        await use(user);
    },

    // Provides a fully signed-up and logged-in page
    userPage: async ({ browser, userAccount }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);
        const loginPage = new LoginPage(page);

        // Step 1: Navigate and enter name + email
        await homePage.goto();
        await homePage.clickLogin();
        await signupPage.enterNameAndEmail(userAccount.name, userAccount.email);

        // Step 2: Fill full registration form
        await signupPage.fillRegistrationForm(userAccount);

        // Step 3: Confirm account created (clicks Continue internally)
        await homePage.verifyAccountCreated();

        // Now logged in — pass the page to the test
        await use(page);

        await context.close();
    },
});

export { expect } from '@playwright/test';