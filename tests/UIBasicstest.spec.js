// @ts-check
//const { test } = require('@playwright/test');
import { expect, test} from '@playwright/test';
import exp from 'constants';
import { only } from 'node:test';


test('Page Playwright Test', async ({browser}) =>
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://google.com/");
        console.log(await page.title());
        await expect(page).toHaveTitle("Google");
    });

test('Browser Context Playwright Test', async ({ page }) => 
    {
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
        //ALTTAKİ ÇALIŞMIYOR
        //await page.waitForLoadState('networkidle');

        //BU ÇALIŞIYOR
        //await page.waitForFunction(() => document.title === 'ProtoCommerce');
        
        //SIGNIN SONRASI SAYFADA BİR ELEMENT ARAYIP ONU BEKLEYİP
        //BU SAYEDE , TITLE'IN HAZIR OLMASINI SAĞLAMAK DA
        //BAŞKA BİR YÖNTEM:
        await page.waitForSelector('h1.my-4');  // "Shop Name" başlığına sahip h1 elementi

        console.log(await page.title());
        await expect(page).toHaveTitle(newPageTitle);

        // parent'dan child'a inip, text ile locate ve ilk elementi alma
        console.log(await page.locator('.card-body a').nth(0).textContent());
        //ya da bu line ile ilk elemente inme
       // console.log(await page.locator('.card-body a').first().textContent());

        //üstteki locatede 4 lü match vardı. bunda unique
        //console.log(await page.locator('.card-body a:has-text("iphone X")').textContent());

    });
test.only('Grab Titles', async ({ page }) => 
        {
            const userName = page.locator('#username');
            const password = page.locator("[type='password']");
            const signinButton = page.locator("#signInBtn");
            const errorMessage = page.locator("[style*='block']");
            const cardTitles = page.locator('.card-body a');

            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            await userName.fill("rahulshettyacademy");
            await password.fill("learning");
            await signinButton.click();

            // ALTTAKİ KOD İLE WAİT OLMADI
            //await page.waitForLoadState('networkidle');

            //ama usttekı waıt kodu,sonraki test sitesinde işe yaradı
            // o site microservice ile yazılmış belki onunla alakalıdır

            await page.locator(".card-body a").first().waitFor();
            //tüm title'ları yazdırma
            const allTitles = await cardTitles.allTextContents();
            console.log(allTitles);
            
        });
test ('titles await', async({page}) =>
        {
            await page.goto("https://rahulshettyacademy.com/client/");
            await page.locator("#userEmail").fill("aydinserbest34@gmail.com");
            await page.locator("#userPassword").fill("Sa21342134");
            await page.locator("#login").click();
            await page.waitForLoadState('networkidle');

            console.log(await page.locator(".card-body b").allTextContents());
        });