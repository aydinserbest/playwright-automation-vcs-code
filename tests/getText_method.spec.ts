import { test, expect } from '@playwright/test'

// First, retrieve the updated text from the button and then validate it.
test('Retrieve and validate updated button text', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/textinput')
    //change the button name
    await page.getByPlaceholder('MyButton').fill('Save')
    await page.getByRole('button', { name: "Button That Should Change it's Name Based on Input Value" }).click()

    // We use getByText to locate the button and then use textContent() to retrieve the updated text.
    const updatedText = await page.getByText("Save").textContent();

    // Assert to verify that the button text has changed successfully.
    expect(updatedText).toBe("Save");
});
// Directly verify that the button text has changed to "Save".
test('Verify button text change directly', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/textinput')
    await page.getByPlaceholder('MyButton').fill('Save')
    await page.getByRole('button').click()
    // If there is only one button on the page, using getByRole('button') is sufficient.
    // However, if multiple buttons exist, specifying the name helps to avoid ambiguity.
    // The second approach ensures that the assertion targets the correct button.
    //await page.getByRole('button', { name: "Button That Should Change it's Name Based on Input Value" }).click()

    // In the previous test, we first retrieved the text and then used it in the assertion.
    // Here, instead of storing the text separately, we directly assert within the expectation.
    // This approach simplifies the code and ensures the button text updates as expected.
    await expect(page.getByRole('button', { name: 'Save' })).toHaveText('Save');
});
    // In the UI, the button text appears in uppercase ("SUBMIT"), 
    // but in the HTML, it is stored as "Submit" with normal capitalization.
    // Playwright's getByRole() and getByText() match based on the visible text in the UI, 
    // so both "Submit" and "SUBMIT" work for assertions.

    //*** the 2 tests below, are about the difference between the value in the HTML and the value in the UI
    //*** The button text appears in uppercase due to CSS styles like text-transform: uppercase;

test('Verify button text with getByRole', async ({ page }) => {
    // Navigate to the target webpage
    await page.goto('http://localhost:54506/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    // Click the button using getByRole, which is a user-facing locator
    const submitButtonText = await page.locator('nb-card', { hasText: 'Basic form' }).getByRole('button', { name: 'Submit' }).textContent()
    //or
    //const submitButtonText = await page.locator('nb-card', {hasText: 'Basic form'}).getByRole('button', { name: 'SUBMIT' }).textContent()

    console.log(submitButtonText);



});

// The button text appears in uppercase due to CSS styles like text-transform: uppercase;
// However, Playwright reads the text as users see it, not how it appears in the HTML.

test('Verify button text with getByText', async ({ page }) => {
    // Navigate to the target webpage
    await page.goto('http://localhost:54506/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()


    const submitButtonText = await page.locator('nb-card', { hasText: 'Basic form' }).getByText('SUBMIT').textContent()
    console.log(submitButtonText);

});