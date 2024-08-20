sayfada wait ihtiyacı olduğunda:

1-console.log(await page.title()); kodu doğru title'ı vermiyor,
öncesine wait lazım
sayfada herhangi bir element locate edip onu bekleriz önce
sonra title line ı gelir

    await page.waitForSelector('h1.my-4');  
    // "Shop Name" başlığına sahip h1 elementi

    console.log(await page.title());

2- öncesine bu fonksiyonu yazmak:
waitForFunction, sayfanın durumunu veya belirli bir koşulu beklemek için kullanılabilir. Bu, başlığın belirli bir değere dönüşmesini beklemek için kullanılabilir.:

await page.waitForFunction(() => document.title === 'ProtoCommerce');

3-öncesinde:
await page.waitForLoadState('networkidle'); kodunu kullanmak

4-
üstte 1 numaralı öneriye benzer mantıkla, çoklu elementlerden ilkini locate etmek: (ya da herhangi başka bir elementi)

await page.locator(".card-body a").first().waitFor();
console.log(await page.title());
