import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignupPage, SignupData } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage'

function generateUser(): SignupData & { name: string; email: string } {
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

test.describe('Signup Test', () => {
    test('Register user and verify account creation', async ({ page }) => {
        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);
        const user = generateUser();

        await test.step('Navigate to login page', async () => {
            await homePage.goto();
            await homePage.clickLogin();
        });

        await test.step('Complete signup form', async () => {
            await signupPage.verifySignupHeader();
            await signupPage.enterNameAndEmail(user.name, user.email);
            await signupPage.verifyEnteredNameAndEmail(user.name, user.email);
            await signupPage.fillRegistrationForm(user);
        });

        await test.step('Verify account created and clean up', async () => {
            await homePage.verifyAccountCreated();
            await homePage.verifyLoggedIn(user.name);
            await homePage.deleteAccountAndVerify();
        });
    });
});
