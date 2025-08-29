import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await page.goto('https://www.saucedemo.com/');  
});


test.describe('Inventory function - Positive testcases', () => {

    test('@smoke - ', async ({ page }) => {

    });


});

test.describe('Inventory function - Negative testcases', () => {

    test('@smoke - ', async ({ page }) =>{

    });
});