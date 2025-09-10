import {test, expect} from '@playwright/test';
import { InventoryItemPage } from '../pages/inventory-item-page';
import { assert } from 'console';

let inventoryItemPage: InventoryItemPage;

test.beforeEach(async ({ page }, testInfo) => {
    inventoryItemPage = new InventoryItemPage(page);

    console.log(`Running ${testInfo.title}`);
    await page.goto('/inventory.html');
});

test.describe('Inventory Item function - Positive testcases', () => {

    test('@smoke - Verify Inventory Item details are visible', async ({ page }) => {
        //Get details from inventory page
        const InvItemNameInvPage = await inventoryItemPage.InventoryItemNameInventoryPage.innerText();
        console.log('Item Name: ' + InvItemNameInvPage);
        const InvItemDescInvPage = await inventoryItemPage.InventoryItemDescInventoryPage.innerText();
        console.log('Item Desc: ' + InvItemDescInvPage);
        const InvItemImageInvPage = await inventoryItemPage.InventoryItemImageInventoryPage.getAttribute('src');
        console.log('Item Image src: ' + InvItemImageInvPage);
        const InvItemPriceInvPage = await inventoryItemPage.InventoryItemPriceInventoryPage.innerText();
        console.log('Item Price: ' + InvItemPriceInvPage);
        const addToCartButtonInvPage = await inventoryItemPage.addToCartButtonInventoryPage.innerText();
        console.log('Add to Cart Button Text: ' + addToCartButtonInvPage);
        await expect(inventoryItemPage.addToCartButtonInventoryPage).toBeVisible();
        await inventoryItemPage.InventoryItemTitleLinkInventoryPage.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');

        //Get details from inside the inventory item page
        const InsideInveItemsDetailedName = await inventoryItemPage.insideInventoryItemsDetailedName.innerText();
        console.log('Detailed Item Name: ' + InsideInveItemsDetailedName);
        const InsideInveItemsDetailedDesc = await inventoryItemPage.insideInventoryItemsDetailedDesc.innerText();
        console.log('Detailed Item Desc: ' + InsideInveItemsDetailedDesc);
        const InsideInveItemsDetailedImage = await inventoryItemPage.insideInventoryItemsDetailedImage.getAttribute('src');
        console.log('Detailed Item Image src: ' + InsideInveItemsDetailedImage);
        const InsideInveItemsDetailedPrice = await inventoryItemPage.insideInventoryItemsDetailedPrice.innerText();
        console.log('Detailed Item Price: ' + InsideInveItemsDetailedPrice);
        const InsideInveItemsDetailedAddToCartButton = await inventoryItemPage.insideInventoryItemsDetailedAddToCartButton.innerText();
        console.log('Detailed Add to Cart Button Text: ' + InsideInveItemsDetailedAddToCartButton);
        await expect(inventoryItemPage.insideInventoryItemsDetailedAddToCartButton).toBeVisible();

        //Assertions
        expect(InsideInveItemsDetailedName).toBe(InvItemNameInvPage);
        expect(InsideInveItemsDetailedDesc).toBe(InvItemDescInvPage);
        expect(InsideInveItemsDetailedImage).toBe(InvItemImageInvPage);
        expect(InsideInveItemsDetailedPrice).toBe(InvItemPriceInvPage);
        expect(InsideInveItemsDetailedAddToCartButton).toBe(addToCartButtonInvPage);

    });

});

test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status - ${testInfo.status}`);
    await page.close();
});