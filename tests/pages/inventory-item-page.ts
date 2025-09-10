import {type Locator, type Page} from '@playwright/test';

export class InventoryItemPage {
    //variables
    readonly page: Page;
    readonly InventoryItemNameInventoryPage: Locator;
    readonly InventoryItemTitleLinkInventoryPage: Locator;
    readonly InventoryItemDescInventoryPage: Locator;
    readonly InventoryItemPriceInventoryPage: Locator;
    readonly addToCartButtonInventoryPage: Locator;
    readonly InventoryItemImageInventoryPage: Locator;

    readonly insideInventoryItemsDetailedName: Locator;
    readonly insideInventoryItemsDetailedDesc: Locator;
    readonly insideInventoryItemsDetailedPrice: Locator;
    readonly insideInventoryItemsDetailedAddToCartButton: Locator;
    readonly insideInventoryItemsDetailedImage: Locator;

    //constructors
    constructor (page: Page) {
        this.page = page;
        this.InventoryItemNameInventoryPage = page.locator("a[id='item_4_title_link'] div[class='inventory_item_name ']");
        this.InventoryItemTitleLinkInventoryPage = page.locator('#item_4_title_link');
        this.InventoryItemDescInventoryPage = page.locator("//div[normalize-space()='carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.']");
        this.InventoryItemPriceInventoryPage = page.locator(".inventory_item_price").first();
        this.addToCartButtonInventoryPage = page.locator('#add-to-cart-sauce-labs-backpack');
        this.InventoryItemImageInventoryPage = page.locator("img[alt='Sauce Labs Backpack']");

        this.insideInventoryItemsDetailedName = page.locator('.inventory_details_name.large_size');
        this.insideInventoryItemsDetailedDesc = page.locator('.inventory_details_desc.large_size');
        this.insideInventoryItemsDetailedPrice = page.locator('.inventory_details_price');
        this.insideInventoryItemsDetailedAddToCartButton = page.locator('#add-to-cart');
        this.insideInventoryItemsDetailedImage = page.locator("img[alt='Sauce Labs Backpack']");

    }   

}