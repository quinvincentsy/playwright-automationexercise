import { Page, Locator, expect } from '@playwright/test';
import path from 'path';

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
        this.fileUpload = page.locator('input[name="upload_file"]');
        this.submit = page.locator('[data-qa="submit-button"]');
        this.successMessage = page.locator('.status.alert-success');
    }

    async submitForm(data: { name: string; email: string; subject: string; message: string; filePath: string }) {
        await this.page.waitForLoadState('domcontentloaded');

        await this.name.fill(data.name);
        await this.email.fill(data.email);
        await this.subject.fill(data.subject);
        await this.message.fill(data.message);
        await this.fileUpload.setInputFiles(data.filePath);

        // Verify filename appears in the UI after selection
        await expect(this.fileUpload).toHaveValue(new RegExp(path.basename(data.filePath)));

        // Register dialog handler before clicking submit, otherwise it fires too late
        this.page.once('dialog', dialog => dialog.accept());
        await this.submit.click();
    }

    async verifySubmissionSuccess() {
        await this.successMessage.waitFor({ state: 'visible', timeout: 10_000 });
        await expect(this.successMessage).toContainText('Success! Your details have been submitted successfully.');
    }
}