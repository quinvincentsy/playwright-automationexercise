import { Page, Locator, expect } from '@playwright/test';

export class ContactUsPage {
    readonly page: Page;
    readonly name: Locator;
    readonly email: Locator;
    readonly subject: Locator;
    readonly message: Locator;
    readonly submit: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.locator('[data-qa="name"]');
        this.email = page.locator('[data-qa="email"]');
        this.subject = page.locator('[data-qa="subject"]');
        this.message = page.locator('[data-qa="message"]');
        this.submit = page.locator('[data-qa="submit-button"]');
    }

    async submitForm(data: { name: string; email: string; subject: string; message: string }) {
        await this.name.fill(data.name);
        await this.email.fill(data.email);
        await this.subject.fill(data.subject);
        await this.message.fill(data.message);
        await this.submit.click();

        // Listen for the dialog BEFORE clicking submit
        this.page.once('dialog', async dialog => {
            await dialog.accept(); // clicks OK
        });

        await this.submit.click();
    }

}