import { test } from '../fixtures/userFixtures';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import testdata from '../fixtures/testdata.json';

test.describe('Product Tests', () => {
    test('User can view all products and product detail page', async ({ userPage, userAccount }) => {
        const homePage = new HomePage(userPage);
        const productsPage = new ProductsPage(userPage);

        await test.step('Verify user is logged in', async () => {
            await homePage.verifyLoggedIn(userAccount.name);
        });

        await test.step('Navigate to Products Page', async () => {
            await homePage.clickProducts();
        });

        await test.step('Verify All Products label is displayed', async () => {
            await productsPage.verifyAllProductsH2();
        });
    });
});