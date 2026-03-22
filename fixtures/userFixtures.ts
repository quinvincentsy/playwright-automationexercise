import { test as base, Page, APIRequestContext, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

type UserAccount = {
    name: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
};

type MyFixtures = {
    userPage: Page;
    userAccount: UserAccount;
};

function generateUser(): UserAccount {
    return {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
    };
}

async function getCsrfToken(request: APIRequestContext): Promise<string> {
    const response = await request.get('https://automationexercise.com/login');
    const body = await response.text();
    const match = body.match(/name="csrfmiddlewaretoken"\s+value="([^"]+)"/);
    if (!match) throw new Error('CSRF token not found');
    return match[1];
}

async function createUser(request: APIRequestContext, user: UserAccount) {
    const csrfToken = await getCsrfToken(request);

    const response = await request.post('https://automationexercise.com/signup', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': 'https://automationexercise.com/login',
        },
        form: {
            csrfmiddlewaretoken: csrfToken,
            title: 'Mr',
            name: user.name,
            email_address: user.email,
            password: user.password,
            days: '1',
            months: '1',
            years: '1990',
            newsletter: '1',
            first_name: user.firstname,
            last_name: user.lastname,
            company: '',
            address1: '123 Test Street',
            address2: '',
            country: 'United States',
            state: 'California',
            city: 'Los Angeles',
            zipcode: '90001',
            mobile_number: '1234567890',
            form_type: 'create_account',
        },
        maxRedirects: 0, // prevent following the 302 redirect
    });

    // 302 means account was created and redirecting — that's a success
    expect(response.status()).toBe(302);
}

export const test = base.extend<MyFixtures>({
    userAccount: async ({ }, use) => {
        await use(generateUser());
    },

    userPage: async ({ browser, request, userAccount }, use) => {
        // Create user via API — no UI signup needed
        await createUser(request, userAccount);

        // Log in via UI
        const context = await browser.newContext();
        const page = await context.newPage();
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        await homePage.goto();
        await homePage.clickLogin();
        await loginPage.login(userAccount.email, userAccount.password);

        await use(page);
        await context.close();
    },
});

export { expect } from '@playwright/test';