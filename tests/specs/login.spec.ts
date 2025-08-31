import {test, expect, type Page} from '@playwright/test';
import{LoginPage} from '../pages/login-page';

let loginPage: LoginPage;

test.beforeEach(async ({ page }, testInfo) => {
    loginPage = new LoginPage(page);

    console.log(`Running ${testInfo.title}`);
    await page.goto('https://www.saucedemo.com/');
});

test.describe('Login function - Positive testcases', () =>{
    
    test('@smoke - Verify the website launches successfully', async ({ page }) => {
        //check title of the page
        await expect(page).toHaveTitle('Swag Labs');
    });

    test('@smoke - Verify login page loads', async () => {
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('@smoke - Verify login with valid credentials', async ({ page }) => {

        await loginPage.doLogin('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Verify password field masks input', async ({ page }) => {
        await loginPage.enterPassword('secret_sauce');
        await expect(page.getByRole('textbox', {name: 'Password'})).toHaveAttribute('type', 'password');
    });

});

test.describe('Login function - Negative testcases', () => {
    
    test('@smoke - Verify login with invalid username', async ({ page }) => {

        await loginPage.doLogin('test_admin', 'secret_sauce');
        await loginPage.checkInvalidCredentials();
        //await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })

    test('@smoke - Verify login with invalid password', async ({ page }) => {
        await loginPage.doLogin('standard_user', 'secret');
        await loginPage.checkInvalidCredentials();
        //await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    test('@smoke - Verify login with empty credentials', async ({ page }) => {
        await loginPage.clickLoginButton();
        await loginPage.checkedUsernameRequired();
        //await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Username is required');
    });

    test('@smoke - Verify login with only username', async ({ page }) => {
        await loginPage.enterUsername('standard_user');
        await loginPage.clickLoginButton();
        await loginPage.checkedPasswordRequired();
        //await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Password is required');
    });

    test('@smoke - Verify login with only password', async ({ page }) => {
        
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLoginButton();
        await loginPage.checkedUsernameRequired();
        //await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Username is required');
    });

    test('Verify login fails with locked out user', async ({ page }) => {
        await loginPage.doLogin('locked_out_user', 'secret_sauce');
        await loginPage.checkedLockedOutUser();
        //await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Verify error message dissappers after correcting credentials', async ({ page }) => {
        await loginPage.doLogin('standarduser', 'secret');
        await loginPage.checkInvalidCredentials();
        //await expect(page.locator("//div[@class='error-message-container error']")).toHaveText('Epic sadface: Username and password do not match any user in this service');
        await loginPage.doLogin('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

});

test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} with status - ${testInfo.status}`);
    await page.close();
})