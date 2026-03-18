import { Page, Locator, expect } from '@playwright/test';

export class SignupLoginPage {
    readonly page: Page;
    readonly signup_header: Locator;
    readonly signup_name: Locator;
    readonly signup_email: Locator;
    readonly signup_button: Locator;
    readonly account_info_name: Locator;
    readonly account_info_email: Locator;


    constructor(page: Page) {
        this.page = page;
        this.signup_header = page.getByRole('heading', { name: 'New User Signup!' });
        this.signup_name = page.locator('[data-qa="signup-name"]');
        this.signup_email = page.locator('[data-qa="signup-email"]');
        this.signup_button = page.locator('[data-qa="signup-button"]');
        this.account_info_name = page.locator('[data-qa="name"]');
        this.account_info_email = page.locator('[data-qa="email"]');
    }

    async goto() {
        await this.page.goto('/login');

        // Verify URL
        await expect(this.page).toHaveURL('https://automationexercise.com/login');
    }

    async verifySignupHeaderText() {
        await expect(this.signup_header).toBeVisible();
    }

    async enterNameAndEmail(name: string, email: string) {
        await this.signup_name.fill(name);
        await this.signup_email.fill(email);
        await this.signup_button.click();
    }

    async verifyEnteredNameAndEmail(name: string, email: string) {
        // verify entered name and email are visible
        await expect(this.account_info_name).toHaveValue(name);
        await expect(this.account_info_email).toHaveValue(email);
    }
    async filloutRegistrationForm() {

    }

}