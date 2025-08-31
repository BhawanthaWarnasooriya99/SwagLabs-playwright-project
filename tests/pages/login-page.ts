import {expect, type Locator, type Page} from "@playwright/test";
import messages from "../utils/messages";

export class LoginPage {

    //variables
    readonly page: Page;
    readonly loginButton: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly errorMessage: Locator;


    //contructors
    constructor (page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.usernameInput = page.getByRole('textbox', {name: 'Username'});
        this.passwordInput = page.getByRole('textbox', {name: 'Password'});
        this.errorMessage = page.locator("//div[@class='error-message-container error']");
    }

    //methods
    async doLogin(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }   

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async checkInvalidCredentials() {
        await expect(this.errorMessage).toHaveText(messages.login.invalidUsernameAndPassword);
    }

    async checkedLockedOutUser() {
        await expect(this.errorMessage).toHaveText(messages.login.lockedOutUser);
    }

    async checkedUsernameRequired() {
        await expect(this.errorMessage).toHaveText(messages.login.usernameRequired);
    }

    async checkedPasswordRequired() {
        await expect(this.errorMessage).toHaveText(messages.login.passwordRequired);
    }

}

export default LoginPage;