import {test as setup, expect} from '@playwright/test';

setup('login as standard_user', async ({ page }, testInfo) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button');

    await page.context().storageState({ path: 'tests/setup/auth.standard-user.json' });   
});
