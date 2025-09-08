import {type Locator, type Page} from "@playwright/test";

export class InventoryPage {

    //variables
    readonly page: Page;
    readonly logoHeader: Locator;
    readonly inventoryItems: Locator;
    readonly addToCartButton: Locator;
    readonly cartIcon: Locator;
    readonly sortDropdown: Locator;
    readonly shoppingCartBadge: Locator;

    //constructors
    constructor (page: Page) {
        this.page = page;
        this.logoHeader = page.getByRole('heading', { name: 'Swag Labs' });
        this.inventoryItems = page.locator('.inventory_item');
        this.addToCartButton = page.getByRole('button', {name: 'Add to cart'});
        this.cartIcon = page.locator('.shopping_cart_link');
        this.sortDropdown = page.locator('.product_sort_container');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    }

    

    //methods



}