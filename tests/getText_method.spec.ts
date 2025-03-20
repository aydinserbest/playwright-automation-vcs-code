import { test, expect } from '@playwright/test'

    // First, retrieve the updated text from the button and then validate it.
test('Retrieve and validate updated button text', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/textinput')
    page.getByPlaceholder('MyButton').fill('Save')
    await page.getByRole('button', { name: "Button That Should Change it's Name Based on Input Value" }).click()

    // We use getByText to retrieve the updated text from the button.
    const updatedText = await page.getByText("Save").textContent();

    // Assert to verify that the button text has changed successfully.
    expect(updatedText).toBe("Save");
});
    // Directly verify that the button text has changed to "Save".
test('Verify button text change directly', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/textinput')
    page.getByPlaceholder('MyButton').fill('Save')
    await page.getByRole('button').click()
    await expect(page.getByRole('button')).toHaveText("Save");
})