import { test, expect } from '@playwright/test';
import { AboutUs } from '../src/main/userinterfaces/about_us';
import { RANDOM_ID, NAME_USER,LAST_NAME_USER,EMAIL_USER ,MESSAGE, EMPTY} from '../src/main/factory/data';
import { AboutUsPage } from '../src/main/about_us/AboutUsPage';
import { ScreenShot } from '../src/main/utils/ScreenShot';
import store from 'store2'

store('valor', '0');
//const screenshot = new ScreenShot();
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('get started global logic about us successful', async ({ page }, testInfo) => {
  


  const screen = new ScreenShot(page,testInfo,store);
  const aboutUsPage = new AboutUsPage(page);
  await page.goto('https://www.globallogic.com/');
  
  await page.click(AboutUs.BUTTON_ABOUT_US)
  await aboutUsPage.enterFirstName(NAME_USER);
  await aboutUsPage.enterLastName(LAST_NAME_USER);
  await aboutUsPage.enterEmail(EMAIL_USER);
  await aboutUsPage.enterMessage(LAST_NAME_USER);

  const allElementsHowdidyouhearaboutus = await page.locator('select#howdidyouhearaboutus option').allTextContents();

  const randomIndexx = Math.floor(Math.random() * allElementsHowdidyouhearaboutus.length);
  const randomOption = allElementsHowdidyouhearaboutus[randomIndexx];
  console.log('Opción seleccionada al azar__:', randomOption);
  //await page.screenshot({path: 'screenshots/',fullPage:true});
  await screen.fullScreenShot(true);

});

test('get started global logic about us successful p', async ({ page }) => {
  await page.goto('https://www.globallogic.com/');
  
  await page.click(AboutUs.BUTTON_ABOUT_US)


  await page.getByRole('textbox', {name: 'FirstName'}).fill('Diego');
  await page.getByRole('textbox', {name: 'LastName'}).fill('Diego');
  await page.getByRole('textbox', {name: 'ValidMsgEmail'}).fill('Diego');
  await page.getByRole('textbox', {name: 'ValidMsgMessage__c'}).fill('Diego');
});


test('get started global logic about us empty', async ({ page }) => {
  const aboutUsPage = new AboutUsPage(page);

  await page.goto('https://www.globallogic.com/');
  await page.click(AboutUs.BUTTON_ABOUT_US);
  await page.click(AboutUs.FIRST_NAME_INPUT_ID).then(() => page.click(AboutUs.FIRST_LAST_NAME_INPUT_ID)).then(() =>  page.click(AboutUs.EMAIL_INPUT_ID)).then(() => page.click(AboutUs.MESSAGE_INPUT_ID)).then(() =>  page.click(AboutUs.EMAIL_INPUT_ID)).then(() => AboutUs.MESSAGE_INPUT_ID);

  await aboutUsPage.enterFirstName(EMPTY);
  await aboutUsPage.checkValidMessage(AboutUs.VALID_FIRST_NAME_INPUT_ID,'This field is required.')

  await aboutUsPage.enterLastName(EMPTY);
  await aboutUsPage.checkValidMessage(AboutUs.VALID_LAST_NAME_INPUT_ID,'This field is required.')
 
  await aboutUsPage.enterEmail(EMPTY);
  await aboutUsPage.checkValidMessage(AboutUs.VALID_EMAIL_INPUT_ID,'Must be valid email. example@yourdomain.com')

  await aboutUsPage.enterMessage(EMPTY);
  await aboutUsPage.checkValidMessage(AboutUs.VALID_MESSAGE_INPUT_ID, 'This field is required.')
});
