import {type Locator, type Page} from "@playwright/test";

export class LoginPage {

    //variables
    readonly page: Page;
    readonly loginButton: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;


    //contructors
    constructor (page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.usernameInput = page.getByRole('textbox', {name: 'Username'});
        this.passwordInput = page.getByRole('textbox', {name: 'Password'});
    }

    //methods
    async clickLoginButton() {
        await this.loginButton.click();
    }


}

export default LoginPage;