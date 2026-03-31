import { Page, Locator, expect } from '@playwright/test';

export class ContactUsPage {
    readonly page: Page;
    readonly name: Locator;
    readonly email: Locator;
    readonly subject: Locator;
    readonly message: Locator;
    readonly fileUpload: Locator;
    readonly submit: Locator;
    readonly successMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.name = page.locator('[data-qa="name"]');
        this.email = page.locator('[data-qa="email"]');
        this.subject = page.locator('[data-qa="subject"]');
        this.message = page.locator('[data-qa="message"]');
        this.fileUpload = page.locator('input[type="file"]');
        this.submit = page.locator('[data-qa="submit-button"]');
        this.successMessage = page.locator('.status.alert-success');
    }

    async submitForm(data: { name: string; email: string; subject: string; message: string }) {
        await this.page.waitForLoadState('domcontentloaded');

        await this.name.fill(data.name);
        await this.email.fill(data.email);
        await this.subject.fill(data.subject);
        await this.message.fill(data.message);

        await this.page.evaluate(() => {
            window.confirm = () => true;
            (window as any).$("#contact-us-form").trigger("submit");
        });
    }

    async verifySubmissionSuccess() {
        await this.successMessage.waitFor({ state: 'visible', timeout: 10_000 });
        await expect(this.successMessage).toContainText('Success! Your details have been submitted successfully.');
    }

}