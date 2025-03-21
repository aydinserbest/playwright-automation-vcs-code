import { test as base, expect } from '@playwright/test';
import { before } from 'node:test'



// Extend the test function to include testInfo
const test = base.extend({
    testInfo: async ({ }, use, testInfo) => {
        await use(testInfo);
    },
});

// Before each test, navigate to the appropriate page
test.beforeEach(async ({ page, testInfo }) => {
    if (testInfo.title !== 'getAttribute') {
        // If the test is NOT "getAttribute", use the local HTML file
        await page.goto('file:///Users/freefree/Desktop/getText-examples.html');
    }
});
//1- textContent() method
test('get text with textContent', async ({ page }) => {
    const text = await page.locator('#text-content-example').textContent()
    console.log(text)
})
//2- innerText() method
test('innerText', async ({ page }) => {
    // innerText() retrieves the text as it appears on the screen.
    // If CSS modifies the text (e.g., text-transform: uppercase), innerText() reflects this change.
    // Expected output: "HELLO" (because CSS makes it uppercase)
    const text = await page.locator('#inner-text-example').innerText()
    console.log(text)
    // textContent() retrieves the raw text inside the HTML element.
    // It does not consider CSS modifications like text-transform.
    // Expected output: "hello" (because the original HTML contains it in lowercase)
    const text2 = await page.locator('#inner-text-example').textContent()
    console.log(text2)
})
//3-inputValue()
test('Retrieve input field value using inputValue()', async ({ page }) => {
    const inputLocate = page.locator('#username')
    // The input field has a predefined value: "JohnDoe"
    // inputValue() retrieves the current value that is inside the input field
    const text = await inputLocate.inputValue()
    console.log(text) // Expected output: "JohnDoe"
    // Update the input field value with a new name: "Mike Bouwer"
    await inputLocate.fill('Mike Bouwer')
    // Retrieve the updated value from the input field
    const updatedText = await inputLocate.inputValue()
    console.log(updatedText)
    // Assert to verify the input field value has changed successfully
    expect(updatedText).toEqual('Mike Bouwer');
})
//4- getAttribute()
test('Retrieve default input value using getAttribute', async ({ page }) => {
    // Locate the input field
    const emailInput = page.locator('#default-email');

    // Retrieve the default value attribute
    const defaultValue = await emailInput.getAttribute('value');
    console.log(defaultValue); // Expected output: "example@gmail.com"
    const classValue = await emailInput.getAttribute('class');
    console.log(classValue); // Expected output: "input-box"


    // Assert that the retrieved value matches the default set in HTML
    await expect(defaultValue).toEqual('example@gmail.com');
})
//4- getAttribute()
test('getAttribute', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/textinput')
    const basicFormButton = page.locator('#updatingButton')
    const classValue = await basicFormButton.getAttribute('class');
    console.log(classValue); // Expected output: "btn btn-primary"


})
//5- allTextContents()
test('Retrieve multiple texts using allTextContents()', async ({ page }) => {
    await page.goto('file:///Users/freefree/Desktop/getText-examples.html');
    //Retrieve the text contents of all elements with the `.menu-item` class.
    const menuItems = await page.locator('.menu-item').allTextContents();
    //allTextContents() returns an array
    // allTextContents() returns an array, so we cannot compare it with a single string like ("Home").
    // Instead, we must use an array format to match the returned value.
    console.log(menuItems); // ["Home", "About", "Contact"]

    expect(menuItems).toEqual(["Home", "About", "Contact"]);
    // This checks if the array contains the string "Home".
    expect(menuItems).toContain("Home"); // Verifies that the array includes "Home".

    // No need for `await` because these are general assertions, not locator assertions.
    // Unlike locator-based assertions, these are **general assertions** that work with regular JavaScript values (like arrays and strings), not Promises.
    /*
    Why don’t we use await?
    •	In the line menuItems = await page.locator('.menu-item').allTextContents();, we use await to resolve the Promise.
    •	As a result, menuItems is no longer a Promise; it becomes a regular JavaScript array.
    •	Assertions with expect() only check values and do not work with Promises.

    Therefore, await is only necessary for operations that return a Promise. 
    Since menuItems is already a resolved array, await is not needed here.
    */
});