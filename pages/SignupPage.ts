import { Page, Locator, expect } from '@playwright/test';

export type SignupData = {
    password: string;
    firstname: string;
    lastname: string;
    address1: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
    dob_day?: string;
    dob_month?: string;
    dob_year?: string;
    country?: string;
};

export class SignupPage {
    readonly page: Page;
    readonly signup_header: Locator;
    readonly signup_name: Locator;
    readonly signup_email: Locator;
    readonly signup_button: Locator;
    readonly account_info_name: Locator;
    readonly account_info_email: Locator;
    readonly mr: Locator;
    readonly password: Locator;
    readonly dob_day: Locator;
    readonly dob_month: Locator;
    readonly dob_year: Locator;
    readonly newsletter: Locator;
    readonly firstname: Locator;
    readonly lastname: Locator;
    readonly address1: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zip_code: Locator;
    readonly mobile_number: Locator;
    readonly create_account: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signup_header = page.getByRole('heading', { name: 'New User Signup!' });
        this.signup_name = page.locator('[data-qa="signup-name"]');
        this.signup_email = page.locator('[data-qa="signup-email"]');
        this.signup_button = page.locator('[data-qa="signup-button"]');
        this.account_info_name = page.locator('[data-qa="name"]');
        this.account_info_email = page.locator('[data-qa="email"]');
        this.mr = page.locator('#id_gender1');
        this.password = page.locator('[data-qa="password"]');
        this.dob_day = page.locator('[data-qa="days"]');
        this.dob_month = page.locator('[data-qa="months"]');
        this.dob_year = page.locator('[data-qa="years"]');
        this.newsletter = page.locator('#newsletter');
        this.firstname = page.locator('[data-qa="first_name"]');
        this.lastname = page.locator('[data-qa="last_name"]');
        this.address1 = page.locator('[data-qa="address"]');
        this.country = page.locator('[data-qa="country"]');
        this.state = page.locator('[data-qa="state"]');
        this.city = page.locator('[data-qa="city"]');
        this.zip_code = page.locator('[data-qa="zipcode"]');
        this.mobile_number = page.locator('[data-qa="mobile_number"]');
        this.create_account = page.locator('[data-qa="create-account"]');
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
        await expect(this.account_info_name).toHaveValue(name);
        await expect(this.account_info_email).toHaveValue(email);
    }

    async filloutRegistrationForm(data: SignupData) {
        await this.mr.check();
        await this.password.fill(data.password);
        await this.dob_day.selectOption(data.dob_day || '1');
        await this.dob_month.selectOption(data.dob_month || 'January');
        await this.dob_year.selectOption(data.dob_year || '1990');
        await this.newsletter.check();
        await this.firstname.fill(data.firstname);
        await this.lastname.fill(data.lastname);
        await this.address1.fill(data.address1);
        await this.country.selectOption(data.country || 'United States');
        await this.state.fill(data.state);
        await this.city.fill(data.city);
        await this.zip_code.fill(data.zipcode);
        await this.mobile_number.fill(data.mobile);
        await this.create_account.click();
    }
}