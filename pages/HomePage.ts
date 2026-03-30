import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly signupLogin: Locator;
    readonly logout: Locator;
    readonly accountCreated: Locator;
    readonly continueButton: Locator;
    readonly loggedInUser: Locator;
    readonly deleteAccount: Locator;
    readonly deleteAccountHeader: Locator;
    readonly contactUsHeader: Locator;
    readonly productsHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signupLogin = page.locator('a[href="/login"]');
        this.logout = page.locator('a[href="/logout"]');
        this.accountCreated = page.locator('[data-qa="account-created"]');
        this.continueButton = page.locator('[data-qa="continue-button"]');
        this.loggedInUser = page.locator('li:has-text("Logged in as")');
        this.deleteAccount = page.locator('a[href="/delete_account"]');
        this.deleteAccountHeader = page.locator('[data-qa="account-deleted"]');
        this.contactUsHeader = page.locator('a[href="/contact_us"]');
        this.productsHeader = page.locator('a[href="/products"]');
    }

    async goto() {
        await this.page.goto('/');
        await expect(this.page).toHaveURL(/automationexercise\.com/);
    }

    async clickLogin() {
        await this.signupLogin.click();
        await expect(this.page).toHaveURL(/\/login/);
    }

    async clickContactUs() {
        await this.contactUsHeader.click();
        await expect(this.page).toHaveURL(/\/contact_us/);
    }

    async clickProducts() {
        await this.productsHeader.click();
        await expect(this.page).toHaveURL(/\/products/);
    }

    async verifyAccountCreated() {
        await expect(this.accountCreated).toBeVisible({ timeout: 10000 }); // waits up to 10 seconds
        await this.continueButton.click();
    }

    async verifyLoggedIn(name: string) {
        await expect(this.loggedInUser).toContainText(`Logged in as ${name}`);
    }

    async deleteAccountAndVerify() {
        await this.deleteAccount.click();
        await expect(this.deleteAccountHeader).toBeVisible();
        await this.continueButton.click();
    }
}