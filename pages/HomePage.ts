import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly signup_login: Locator;
    readonly logout: Locator;
    readonly account_created: Locator;
    readonly continue_button: Locator;
    readonly logged_in_user: Locator;
    readonly delete_account: Locator;
    readonly delete_account_header: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signup_login = page.locator('a[href="/login"]');
        this.logout = page.locator('a[href="/logout"]');
        this.account_created = page.locator('[data-qa="account-created"]');
        this.continue_button = page.locator('[data-qa="continue-button"]');
        this.logged_in_user = page.locator('li:has-text("Logged in as")');
        this.delete_account = page.locator('a[href="/delete_account"]');
        this.delete_account_header = page.locator('[data-qa="account-deleted"]');
    }

    async goto() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL('https://automationexercise.com');
    }

    async click_Login() {
        await this.signup_login.click();
        await expect(this.page).toHaveURL('https://automationexercise.com/login');
    }

    async verify_account_created(name: string) {
        await expect(this.account_created).toBeVisible();
        await this.continue_button.click();
        await expect(this.logged_in_user).toContainText(`Logged in as ${name}`);
    }

    async deleteaccount() {
        await this.delete_account.click();
        await expect(this.delete_account_header).toBeVisible();
        await this.continue_button.click();
    }
}