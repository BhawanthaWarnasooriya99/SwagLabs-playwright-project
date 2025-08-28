import {type Locator, type Page} from "@playwright/test";

export class LoginPage {

    //variables
    readonly page: Page;
    readonly loginButton: Locator;


    //contructors
    constructor (page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', {name: 'Login'});
    }

    //methods
    async clickLoginButton() {
        await this.loginButton.click();
    }


}

export default LoginPage;