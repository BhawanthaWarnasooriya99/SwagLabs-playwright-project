import {test, expect, type Page} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
});

test.describe('Login function - Positive testcases', () =>{
    
    test('@smoke - Verify the website launches successfully', async ({ page }) => {
        //check title of the page
        await expect(page).toHaveTitle('Swag Labs');
    });

    test('@smoke - Verify login page loads', async ({ page }) => {
        await expect(page.getByRole('textbox', {name: 'Username'})).toBeVisible();
        await expect(page.getByRole('textbox', {name: 'Password'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'Login'})).toBeVisible();
    });

    test('@smoke - Verify login with valid credentials', async ({ page }) => {
        await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
        await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Verify password field masks input', async ({ page }) => {
        await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
        await expect(page.getByRole('textbox', {name: 'Password'})).toHaveAttribute('type', 'password');
    })

});

test.describe('Login function - Negative testcases', () => {
    
    test('@smoke - Verify login with invalid username', async ({ page }) => {
        await page.getByRole('textbox', {name: 'Username'}).fill('test_admin');
        await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
        await page.waitForTimeout(3000);
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })

    test('@smoke - Verify login with invalid password', async ({ page }) => {
        await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
        await page.getByRole('textbox', {name: 'Password'}).fill('secret');
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    test('@smoke - Verify login with empty credentials', async ({ page }) => {
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Username is required');
    });

    test('@smoke - Verify login with only username', async ({ page }) => {
        await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Password is required');
    });

    test('@smoke - Verify login with only password', async ({ page }) => {
        await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Username is required');
    });

    test('Verify login fails with locked out user', async ({ page }) => {
        await page.getByRole('textbox', {name: 'Username'}).fill('locked_out_user');
        await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Verify error message dissappers after correcting credentials', async ({ page }) => {
        await page.getByRole('textbox', {name: 'Username'}).fill('standarduser');
        await page.getByRole('textbox', {name: 'Password'}).fill('secret');
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Username and password do not match any user in this service');
        await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
        await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

});

test.afterEach(async ({ page }) => {
    await page.close();
})