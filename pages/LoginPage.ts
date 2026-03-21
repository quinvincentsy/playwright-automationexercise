import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginHeader: Locator;
    readonly loginEmail: Locator;
    readonly loginPassword: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginHeader = page.getByRole('heading', { name: 'Login to your account' });
        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.loginError = page.locator('p:has-text("Your email or password is incorrect!")');
    }

    async verifyLoginHeader() {
        await expect(this.loginHeader).toBeVisible();
        await expect(this.loginHeader).toHaveText('Login to your account');
    }

    async login(email: string, password: string) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginError() {
        await expect(this.loginError).toBeVisible();
    }
}