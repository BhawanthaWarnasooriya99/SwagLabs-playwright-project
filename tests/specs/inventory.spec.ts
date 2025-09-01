import {test, expect} from '@playwright/test';
import { InventoryPage } from '../pages/inventory-page';
import LoginPage from '../pages/login-page';

let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }, testInfo) => {
    inventoryPage = new InventoryPage(page);

    console.log(`Running ${testInfo.title}`);
    await page.goto('/inventory.html');
    
});


test.describe('Inventory function - Positive testcases', () => {

    // test('@smoke - Verify Page load : User is redirected to /inventory.html and page loads successfully.', async ({ page }) => {
    //     await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    // });

    test('@smoke - Verify text Swag Labs logo visible', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await inventoryPage.logoHeader.isVisible();
    });

    test('@smoke - Verify 6 inventory products items are displayed', async ({ page }) => {
        await inventoryPage.inventoryItems.count().then(async (count) =>{
            console.log(`count : ${count}`);
            expect(count).toBe(6);
        });
    });

    test('@smoke - Verify every product has a "Add to cart" button presence', async ({ page }) => {
        const itemCount =  await inventoryPage.inventoryItems.count();
        console.log(`itemCount : ${itemCount}`);

        for(let i=0; i<itemCount; i++){
            const product = inventoryPage.inventoryItems.nth(i);
            console.log(`Checking Add to cart button for item ${i+1}`);
            const addToCartButton = page.getByRole('button', {name: 'Add to cart'});
            await expect(inventoryPage.addToCartButton.nth(i)).toBeVisible();
        }
    });

    test('@smoke - Verify Cart icon is visible', async ({ page }) => {
        await expect(inventoryPage.cartIcon).toBeVisible();
    });

    test('@smoke - Verify Sort dropdown is visible', async ({ page }) => {
        await expect(inventoryPage.sortDropdown).toBeVisible();
        await expect(inventoryPage.sortDropdown).toHaveText('Name (A to Z)Name (Z to A)Price (low to high)Price (high to low)');        
    });

});




test.describe('Inventory function - Negative testcases', () => {

    // test('@smoke - ', async ({ page }) =>{

    // });
});

test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status - ${testInfo.status}`);
    await page.close();
});
