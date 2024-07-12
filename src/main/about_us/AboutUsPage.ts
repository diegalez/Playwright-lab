import { Page } from 'playwright';
import { AboutUs } from '../userinterfaces/about_us';
import { expect } from '@playwright/test';

export class AboutUsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async enterFirstName(firstName: string) {
        await this.page.locator(AboutUs.FIRST_NAME_INPUT_ID).fill(firstName);
         
    }

    async enterLastName(lastName: string) {
        await this.page.locator(AboutUs.FIRST_LAST_NAME_INPUT_ID).fill(lastName);
    }

    async enterEmail(email: string) {
        await this.page.locator(AboutUs.EMAIL_INPUT_ID).fill(email);
    }

    async enterMessage(message: string) {
        await this.page.locator(AboutUs.MESSAGE_INPUT_ID).fill(message);
    }

    async checkValidMessage(xpath: string,messageToExpected: string) {
        await this.page.waitForLoadState('load');
        await this.page.locator(xpath).isVisible()
        .then(isVisible => expect(isVisible).toBe(true))
        .then(() => this.page.locator(xpath).textContent())
        .then((validMessage) => expect(validMessage).toEqual(messageToExpected));
    }

}
