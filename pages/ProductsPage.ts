import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly allProductsH2: Locator;
  

    constructor(page: Page) {
        this.page = page;
        this.allProductsH2 = page.getByRole('heading', { name: 'All Products' })
       
    }

    async verifyAllProductsH2() {
        await expect(this.allProductsH2).toBeVisible();
    }

}