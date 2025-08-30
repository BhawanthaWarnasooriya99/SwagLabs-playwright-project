import {test, expect} from '@playwright/test';
import { InventoryPage } from '../pages/inventory-page';
import { count } from 'console';

let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await page.goto('https://www.saucedemo.com/'); 
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    inventoryPage = new InventoryPage(page);
});


test.describe('Inventory function - Positive testcases', () => {

    test('@smoke - Verify Page load : User is redirected to /inventory.html and page loads successfully.', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('@smoke - Verify text Swag Labs logo visible', async ({ page }) => {
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
            console.log(`Checking Add to cart button for item ${i+1}`);
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
