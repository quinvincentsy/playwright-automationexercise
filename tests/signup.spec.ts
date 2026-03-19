import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { SignupPage, SignupData } from '../pages/SignupPage';
import { HomePage } from '../pages/HomePage';

// Helper to generate dynamic user data
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
        country: 'United States'
    };
}

test.describe('QVS: TC1 - Register User', () => {
    test('Register User and Verify Account Info', async ({ page }) => {
        const homePage = new HomePage(page);
        const signupPage = new SignupPage(page);
        const user = generateUser();

        await test.step('Navigate to Login', async () => {
            await homePage.goto();
            await homePage.click_Login();
        });

        await test.step('Fill Signup Form', async () => {
            await signupPage.verifySignupHeaderText();
            await signupPage.enterNameAndEmail(user.name, user.email);
            await signupPage.verifyEnteredNameAndEmail(user.name, user.email);
            await signupPage.filloutRegistrationForm(user);
        });

        await test.step('Verify Account Creation', async () => {
            await homePage.verify_account_created(user.name);
            await homePage.deleteaccount();
        });
    });
});