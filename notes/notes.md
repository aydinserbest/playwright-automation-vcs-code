bunları ekle

await page.waitForTimeout(1000);  // 1 saniye bekleme ekleyin
console.log(await page.title()); // Başlığı tekrar kontrol eder
await expect(page).toHaveTitle(newPageTitle);


const currentTitle = await page.title();
console.log(currentTitle); // Beklenen başlık ile karşılaştırın


const title = await page.title();
expect(title).toBe("ProtoCommerce");



