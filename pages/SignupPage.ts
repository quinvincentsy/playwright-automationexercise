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
    readonly signupHeader: Locator;
    readonly signupName: Locator;
    readonly signupEmail: Locator;
    readonly signupButton: Locator;
    readonly accountInfoName: Locator;
    readonly accountInfoEmail: Locator;
    readonly genderMr: Locator;
    readonly password: Locator;
    readonly dobDay: Locator;
    readonly dobMonth: Locator;
    readonly dobYear: Locator;
    readonly newsletter: Locator;
    readonly firstname: Locator;
    readonly lastname: Locator;
    readonly address1: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipCode: Locator;
    readonly mobileNumber: Locator;
    readonly createAccount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signupHeader = page.getByRole('heading', { name: 'New User Signup!' });
        this.signupName = page.locator('[data-qa="signup-name"]');
        this.signupEmail = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
        this.accountInfoName = page.locator('[data-qa="name"]');
        this.accountInfoEmail = page.locator('[data-qa="email"]');
        this.genderMr = page.locator('#id_gender1');
        this.password = page.locator('[data-qa="password"]');
        this.dobDay = page.locator('[data-qa="days"]');
        this.dobMonth = page.locator('[data-qa="months"]');
        this.dobYear = page.locator('[data-qa="years"]');
        this.newsletter = page.locator('#newsletter');
        this.firstname = page.locator('[data-qa="first_name"]');
        this.lastname = page.locator('[data-qa="last_name"]');
        this.address1 = page.locator('[data-qa="address"]');
        this.country = page.locator('[data-qa="country"]');
        this.state = page.locator('[data-qa="state"]');
        this.city = page.locator('[data-qa="city"]');
        this.zipCode = page.locator('[data-qa="zipcode"]');
        this.mobileNumber = page.locator('[data-qa="mobile_number"]');
        this.createAccount = page.locator('[data-qa="create-account"]');
    }

    async verifySignupHeader() {
        await expect(this.signupHeader).toBeVisible();
        await expect(this.signupHeader).toHaveText('New User Signup!');
    }

    async enterNameAndEmail(name: string, email: string) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupButton.click();
    }

    async verifyEnteredNameAndEmail(name: string, email: string) {
        await expect(this.accountInfoName).toHaveValue(name);
        await expect(this.accountInfoEmail).toHaveValue(email);
    }

    async fillRegistrationForm(data: SignupData) {
        await this.genderMr.check();
        await this.password.fill(data.password);
        await this.dobDay.selectOption(data.dob_day ?? '1');
        await this.dobMonth.selectOption(data.dob_month ?? 'January');
        await this.dobYear.selectOption(data.dob_year ?? '1990');
        await this.newsletter.check();
        await this.firstname.fill(data.firstname);
        await this.lastname.fill(data.lastname);
        await this.address1.fill(data.address1);
        await this.country.selectOption(data.country ?? 'United States');
        await this.state.fill(data.state);
        await this.city.fill(data.city);
        await this.zipCode.fill(data.zipcode);
        await this.mobileNumber.fill(data.mobile);
        await this.createAccount.click();
    }
}