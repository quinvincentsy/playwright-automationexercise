import { test, expect } from '../fixtures/userFixtures';
import { HomePage } from '../pages/HomePage';
import { ContactUsPage } from '../pages/ContactUsPage';

test.describe('Contact Us Test', () => {
    test('Logged in user can submit contact form', async ({ userPage, userAccount }) => {
        const homePage = new HomePage(userPage);
        const contactUsPage = new ContactUsPage(userPage);

        await test.step('Verify user is logged in', async () => {
            await homePage.verifyLoggedIn(userAccount.name);
        });

        await test.step('Navigate to Contact Us', async () => {
            await homePage.clickContactUs();
        });

        await test.step('Submit contact form', async () => {
            await contactUsPage.submitForm({
                name: userAccount.name,
                email: userAccount.email,
                subject: 'Test Subject',
                message: 'Test message body',
            });
        });

        // await test.step('Verify success message', async () => {
        //     await contactUsPage.verifySubmissionSuccess();
        // });
    });

});