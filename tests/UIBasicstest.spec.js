// @ts-check
//const { test } = require('@playwright/test');
import { expect, test } from '@playwright/test';
import exp from 'constants';
import { only } from 'node:test';


test('Page Playwright Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('Browser Context Playwright Test', async ({ page }) => {
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signinButton = page.locator("#signInBtn");
    const errorMessage = page.locator("[style*='block']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await signinButton.click();
    console.log(await errorMessage.textContent());
    await expect(errorMessage).toContainText("Incorrect");

    await userName.fill("rahulshettyacademy");
    await signinButton.click();

    const newPageTitle = "ProtoCommerce";
    //THIS DOESN'T WORK
    //await page.waitForLoadState('networkidle');

    //THIS WORKS
    //await page.waitForFunction(() => document.title === 'ProtoCommerce');

    //ANOTHER METHOD: FIND AN ELEMENT ON THE PAGE AFTER SIGN-IN AND WAIT FOR IT
    //THIS WAY, YOU ENSURE THE TITLE IS READY
    await page.waitForSelector('h1.my-4');  // h1 element with "Shop Name" title

    console.log(await page.title());
    await expect(page).toHaveTitle(newPageTitle);

    // Navigate from parent to child, locate by text, and get the first element
    console.log(await page.locator('.card-body a').nth(0).textContent());
    // Or use this line to get the first element
    // console.log(await page.locator('.card-body a').first().textContent());

    // The above locator had 4 matches. This one is unique
    // console.log(await page.locator('.card-body a:has-text("iphone X")').textContent());
});

test('Grab Titles', async ({ page }) => {
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signinButton = page.locator("#signInBtn");
    const errorMessage = page.locator("[style*='block']");
    const cardTitles = page.locator('.card-body a');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await signinButton.click();

    // WAIT DID NOT WORK WITH THE FOLLOWING CODE
    //await page.waitForLoadState('networkidle');

    //But the above wait code worked in the next test site
    //Maybe because that site is written in microservice architecture

    await page.locator(".card-body a").first().waitFor();
    //Print all titles
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});
test('titles await', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("aydinserbest34@gmail.com");
    await page.locator("#userPassword").fill("Sa21342134");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');

    console.log(await page.locator(".card-body b").allTextContents());
});

test('Dropdown select controls', async ({ page }) => {
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const signinButton = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='rahulshettyacademy']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await page.locator('label.customradio:has-text("User")').click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator('label.customradio:has-text("User")').isChecked());
    await expect(page.locator('label.customradio:has-text("User")')).toBeChecked();
    const dropDown = page.locator("select.form-control");
    await dropDown.selectOption("consult");
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveClass('blinkingText');
    //await page.pause();
});
test.only('Child windoes handle', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='rahulshettyacademy']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ])
    const currentTitle = await newPage.title();
    console.log(currentTitle);

    const expectedTitle = "RS Academy";
    await expect(newPage).toHaveTitle(expectedTitle);
    //üstteki match , alttakinden daha iyi
    //expect(currentTitle).toBe(expectedTitle);

    let email;
    const text = await newPage.locator('.red').textContent();
    console.log(text);
    if (text !== null) {
        const arrayText = text.split("@");
        email = arrayText[1].split(" ")[0];
        console.log(email);
    } else {

        console.log("Element not found or text content is null.");
    }
    if (email !== undefined) { // Email'in undefined olmadığını kontrol ediyoruz
        await userName.fill(email); // Email varsa doldur
    } else {
        console.log("Email not found, cannot fill the username field.");
    }
    //ALTTAKİ İLE VALUE'YU ALAMAYIZ
    //console.log(await userName.textContent());
    const userNameValue = await userName.inputValue();
    console.log(userNameValue);
    await page.pause();
});