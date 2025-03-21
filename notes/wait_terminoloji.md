elementin DOM'a yerleşmesini sağladıktan sonra title bilgisini almak
ajax ve wait konusunun anhtar kısmı: elementin DOM'a yerleşip yerleşmediği

From the testing perspective" (test perspektifinden bakıldığında) ifadesi:


The most common false alarm is “the test script didn’t wait long enough for an AJAX operation to complete



Klasik Web Uygulamalarında Sayfa Yenilenmesi Nedir?
Eskiden, bir kullanıcı bir web sayfasında bir eylem (butona tıklama, form gönderme, linke tıklama gibi) gerçekleştirdiğinde, tüm sayfa sunucudan tekrar yüklenirdi. Tarayıcı önce mevcut sayfayı boşaltır, ardından yeni verilerle dolu sayfayı yeniden yüklerdi. Bu işlem şu adımları içerir:

Kullanıcı bir butona tıkladığında veya bir form gönderdiğinde, tarayıcı sunucuya istek gönderir.
Sunucu bu isteği alır, veriyi işler ve yeni bir HTML sayfası üretir.
Bu yeni sayfa tamamen yeniden yüklenir ve tarayıcıya geri gönderilir.
Tarayıcı bu yeni sayfayı kullanıcıya gösterir.



klasik bir web uygulamasında AJAX olmadığında her kullanıcı etkileşiminde (butona tıklama, form gönderme gibi) sayfa tamamen yenilenir. Yani tüm HTML tekrar sunucudan alınır ve tarayıcıya yeniden yüklenir. Bu sayfa yenileme işlemi kesinlikle zaman alır.

Ancak, bu sayfa yenileme işlemi tamamlanana kadar, test otomasyon araçları (örneğin Selenium), tarayıcı tarafından sağlanan olaylar sayesinde bu süreci otomatik olarak bekler. Tarayıcı, sayfa tamamen yüklendiğinde bir dizi olayı tetikler (örneğin DOMContentLoaded, onload gibi), bu olaylar tamamlanmadan Selenium sonraki adımlara geçmez.

Bu nedenle, ek bir bekleme komutuna gerek kalmaz, çünkü test yazılımı zaten tarayıcı tarafından tetiklenen bu olayları dinler ve sayfanın tamamen yüklendiğinden emin olur. Yani, klasik bir web uygulamasında her sayfa yenilenmesiyle birlikte Selenium veya Playwright gibi test araçları otomatik olarak bu yenilemeyi fark eder ve DOM tamamen yeniden yüklendiğinde testleri sürdürür.

Zamanlama ve Bekleme
Evet, sayfanın tamamen yenilenmesi zaman alır, ancak Selenium gibi test otomasyon araçları bu süreci otomatik olarak bekler. Tarayıcı tarafından sağlanan olaylar (örneğin load olayı) tamamlandığında, test otomasyonu yeni DOM'a erişir ve işlemleri devam ettirir.

Neden Ekstra wait Gerekmez?
Sayfa tamamen yüklendiği zaman tarayıcı, test aracına "sayfa yüklendi" sinyalini verir. Bu yüzden klasik web uygulamalarında, sayfa tamamen yüklendiği için genellikle ek bir wait komutuna gerek kalmaz. Ancak, eğer sayfa dinamik olarak (AJAX ile) yükleniyorsa, tarayıcıya böyle bir sinyal gelmez ve bu durumda bekleme komutları gereklidir.

Özet:
Klasik web uygulamalarında her sayfa yenilenmesi zaman alır, ancak test araçları bu süreci otomatik olarak bekler.
Tarayıcı sayfanın tamamen yüklendiğini test aracına bildirir, bu yüzden ek bir beklemeye gerek kalmaz.
Sayfa dinamik olarak yükleniyorsa (örneğin AJAX ile), ek bekleme komutları kullanılması gerekebilir.
Bu yüzden klasik web uygulamalarında zaman alan bir işlem olsa bile, test otomasyon araçları sayfanın tamamen yüklendiğinden emin olana kadar otomatik olarak bekler.






AJAX (Asynchronous JavaScript and XML) kullanılan sistemlerde sadece ilgili kısım yenilenir, tüm sayfa değil. Klasik web uygulamalarından farklı olarak, AJAX kullanıldığında sayfanın tamamı yeniden yüklenmez; sadece arka planda sunucuya istek gönderilir ve gerekli veriler alınarak sayfanın belirli bir kısmı güncellenir.

AJAX'ın İşleyişi:
Kullanıcı bir butona tıkladığında veya bir işlem yaptığında (örneğin, "Daha Fazla Göster" butonuna tıklamak), AJAX bu isteği arka planda sunucuya gönderir.
Sunucu yanıt verir ve sadece gerekli olan veriler tarayıcıya döner.
Bu veri geldikten sonra, sayfanın yalnızca ilgili bölümü (örneğin bir tablo, bir liste ya da bir ürün başlığı gibi) güncellenir.
Tarayıcı, bu güncellemeyi DOM'a entegre eder, ancak sayfanın geri kalan kısmı değişmez. Sayfa yeniden yüklenmediği için kullanıcının deneyimi kesintisiz devam eder.
Örnek:
Bir alışveriş sitesinde, kullanıcı "Sonraki Sayfa" butonuna tıkladığında sayfa yenilenmez, sadece ürün listesi AJAX ile güncellenir. Kullanıcı, o sırada form dolduruyor veya başka bir işlem yapıyorsa, bu işlemler etkilenmeden devam eder.

Sonuç:
AJAX'ın temel avantajı, sayfanın tamamını yenilemeden sadece gerekli verilerin güncellenmesini sağlamasıdır. Bu sayede kullanıcı deneyimi kesintisiz olur ve sayfa yeniden yüklenmediği için işlem süresi kısalır.

Bu durum test süreçlerinde bekleme ihtiyacını artırabilir, çünkü arka planda gerçekleşen işlemlerle test otomasyonu doğru zamanda doğru sonuçları kontrol etmelidir.






AJAX işlemleri, Selenium gibi test araçlarının doğrudan anlamadığı durumlardır. Klasik bir web uygulamasında olduğu gibi sayfa tamamen yeniden yüklenmediği için Selenium, sadece o kısmın arka planda AJAX ile güncellendiğini otomatik olarak fark edemez.

Selenium, sayfa tamamen yenilenmediği durumlarda (yani AJAX işlemlerinde) bu güncellemeleri anlamak için ek bekleme komutlarına ihtiyaç duyar. Bu, tarayıcıdaki DOM'un bir kısmının dinamik olarak değişmesi anlamına gelir. Örneğin, bir liste AJAX ile güncelleniyorsa, Selenium o güncellemenin tamamlanmasını beklemezse, yeni içerik DOM'a eklenmeden önce eski içerik üzerinden testlere devam edebilir ve yanlış sonuçlar alabilir.

AJAX Durumunda Ne Yapılır?
Explicit Waits (Açık Beklemeler): Selenium'un bu tip dinamik işlemleri anlaması için WebDriverWait veya benzeri bekleme mekanizmaları kullanılır. Örneğin, bir elementin görünür olmasını veya bir elementin belirli bir içeriği almasını beklemesi gerekebilir:
java
Copy code
WebDriverWait wait = new WebDriverWait(driver, 10);
wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("dynamicElement")));
Implicit Waits (Kapalı Beklemeler): Selenium'un her element arayışında belirli bir süre beklemesini sağlayan bir diğer yöntemdir. Ancak AJAX işlemlerinde genellikle explicit waits daha faydalıdır, çünkü belirli koşullara göre bekleme yapar.
Örnek Senaryo:
Bir butona tıkladığınızda sayfa yenilenmiyor, ancak bir ürün listesi AJAX ile güncelleniyor. Selenium, eğer bekleme komutu yazılmadıysa, bu güncellemeyi fark edemez ve hala eski DOM'a erişir:

Klasik yöntem: Selenium yeni DOM'u algılar ve sayfa tamamen yenilendiği için işlemi doğru şekilde sürdürür.
AJAX yöntem: Selenium, AJAX ile yapılan bu kısmi güncellemeleri fark etmez ve eski DOM'da işlem yapmaya devam eder. Bu yüzden dinamik güncellemeleri fark etmek için özel beklemeler yazılması gerekir.
Sonuç:
Selenium, AJAX işlemleri sırasında sayfanın yalnızca bir kısmının güncellenmesini otomatik olarak anlamaz. Bu durumda, doğru test sonuçları almak için beklemeler veya belirli elementlerin yüklenmesini takip eden komutlar yazılmalıdır.




eski title 'ın gelmesi örneği:
Playwright ile yaptığınız testte yeni title yerine eski title'ın alınması durumu, AJAX işlemleri sırasında güncellemenin tamamlanmasını beklemeden DOM'a erişilmesiyle ilgili bir problem.

Bu durum, Selenium'da da benzer şekilde yaşanır. AJAX çağrıları sırasında, sayfa tamamen yenilenmediği için test aracı, hala eski veriye (eski DOM'a) bakar ve dolayısıyla yanlış veya eski sonuçları alır. İşte bu yüzden, AJAX işlemlerinde, sayfanın tamamının yenilenmesini beklemediği için test aracına, ilgili güncellemenin tamamlandığını göstermek adına ek bekleme komutları eklemek gerekir.

Örneğin, signin butonuna tıkladıktan sonra title'ın güncellenmesi gerekiyor. Ancak AJAX ile güncellendiği için Playwright veya Selenium eski DOM'a erişebilir ve hala eski title'ı alabilir. Bu sorunu çözmek için Playwright'ta şu gibi beklemeler eklenir:

javascript
Copy code
await page.waitForFunction(() => document.title === 'ProtoCommerce'); // Yeni title beklenir
Bu tür bir bekleme komutu kullanmazsanız, test aracınız, AJAX ile sunucudan dönen yeni bilgilerin DOM'a yansımasını beklemeden devam eder ve sonuç olarak eski DOM verilerine dayanarak hatalı işlemler yapar.

Özetle, Playwright'ta yaşadığınız bu durum, AJAX kullanılan sayfalarda yaygın bir test senaryosu ve Selenium gibi diğer test otomasyon araçlarında da benzer beklemeler yapılmadığı sürece eski DOM'dan veri çekme problemi yaşanabilir.



4 telefon ürün isminin wait olmadan boş dönmesi örneği:
Signin butonuna tıkladıktan sonra ürün isimlerini almak için bekleme koymadığımızda boş dönmesinin sebebi, o sırada DOM'da ürün isimlerinin henüz yer almamış olmasıdır.

Neden Bekleme Gerekiyor?
Signin butonuna tıklamadan önce DOM'da o ürün başlıkları (telefon isimleri) mevcut değildir, çünkü bu veriler ancak signin işlemi tamamlandıktan sonra AJAX ile yüklenir.
Signin butonuna tıkladığınızda, AJAX çağrısı başlatılır, ve bu çağrı sunucuya gidip dönerken DOM'a henüz o ürün başlıkları eklenmemiş olabilir. Playwright ya da Selenium, o sırada DOM'a bakıp ürün başlıklarını bulamayabilir.
Bu yüzden, bekleme komutu olmadan test aracınız hemen DOM'a erişip ürün başlıklarını çekmeye çalıştığında, bu başlıklar henüz DOM'a yerleşmediği için boş sonuç döner. Yani, ürün başlıkları o anda DOM'da bulunmadığı için test aracı onları göremez.

Eski DOM Meselesi:
Signin işlemi öncesinde, DOM'da yalnızca giriş formu ve giriş sayfasına ait diğer elementler bulunur. Ürün başlıkları bu sırada henüz DOM'da yer almaz.
Selenium ya da Playwright, klasik bir DOM yenilemesi olmadığı sürece hemen DOM'dan veriyi çekmeye çalışır. Eğer AJAX çağrısı tamamlanmadıysa veya henüz DOM güncellenmediyse, eski DOM'da bu başlıkları görmezsiniz, çünkü bu başlıklar signin işlemi tamamlanmadan yüklenmez.
Özetle:
Signin öncesinde DOM'da ürün isimleri yoktur.
Signin butonuna tıkladıktan sonra AJAX işlemi ile ürün isimleri DOM'a eklenir, ancak bu işlem zaman alır. Eğer bekleme koymazsanız test aracınız hala eski DOM'a bakar ve ürün isimlerini göremez.
Bu yüzden, Playwright'ta ürün başlıklarını almak için bir bekleme koymak gerekir, böylece AJAX çağrısı tamamlanır ve yeni DOM'a ürün isimleri eklenir.
Bekleme Çözümleri:
Bir elementi beklemek (örn. .first().waitFor() ya da waitForSelector()), AJAX işlemi tamamlanıp DOM'da ilgili elementler yerleşene kadar beklemeyi sağlar.
Sayfa başlığını kontrol etmek (waitForFunction()), sayfanın tamamlandığını anlamanın bir başka yoludur, ancak bazen DOM'daki belirli elementleri beklemek daha doğrudur.
Bu senaryoda, bekleme koymazsanız ürün başlıklarını DOM'da bulamayacağınız için boş sonuç alırsınız, çünkü AJAX işlemi DOM'u henüz güncellememiş olur.









Selenium, sayfa tamamen yenilenmediği durumlarda (yani AJAX işlemlerinde) bu güncellemeleri anlamak için ek bekleme komutlarına ihtiyaç duyar. Bu, tarayıcıdaki DOM'un bir kısmının dinamik olarak değişmesi anlamına gelir. Örneğin, bir liste AJAX ile güncelleniyorsa, Selenium o güncellemenin tamamlanmasını beklemezse, yeni içerik DOM'a eklenmeden önce eski içerik üzerinden testlere devam edebilir ve yanlış sonuçlar alabilir.


Bir butona tıkladığınızda sayfa yenilenmiyor, ancak bir ürün listesi AJAX ile güncelleniyor. Selenium, eğer bekleme komutu yazılmadıysa, bu güncellemeyi fark edemez ve hala eski DOM'a erişir:


SORUN MEVCUT-ESKİ DOM!A ERİŞMESİ::
Örneğin, bir liste AJAX ile güncelleniyorsa, Selenium o güncellemenin tamamlanmasını beklemezse, yeni içerik DOM'a eklenmeden önce eski içerik üzerinden testlere devam edebilir
Bir alışveriş sitesinde, kullanıcı "Sonraki Sayfa" butonuna tıkladığında sayfa yenilenmez, sadece ürün listesi AJAX ile güncellenir.

Eğer bir alışveriş sitesinde "Sonraki Sayfa" butonuna tıkladığınızda AJAX ile sadece ürün listesi güncelleniyorsa ve bekleme koymazsanız, Selenium veya Playwright gibi test araçları eski DOM'a bakar. Bu durumda, test aracınız eski DOM'da hala güncellenmemiş ürün listesini görür ve yeni listeyi gözden kaçırır.

Neden Bekleme Koymak Gerekir?
AJAX işlemi sayfanın tamamen yenilenmesini sağlamadığı için, DOM'un sadece bir kısmı (örneğin, ürün listesi) güncellenir.
Eğer bu güncellemeyi beklemeden Selenium DOM'u kontrol ederse, henüz yüklenmemiş yeni ürün listesini göremez. Bu, yanlış ya da eksik test sonuçlarına yol açar.
Bekleme Türleri:
Explicit Wait (Açık Bekleme): Belirli bir elementin DOM'a eklenmesini veya görünür hale gelmesini bekler:
java
Copy code
WebDriverWait wait = new WebDriverWait(driver, 10);
WebElement nextProduct = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".new-product")));
Implicit Wait (Kapalı Bekleme): Her elementin belirli bir süre boyunca DOM'da varlığını kontrol eder. Ancak, explicit wait kadar etkili değildir çünkü tüm DOM üzerinde geçerlidir ve genelde dinamik AJAX işlemleri için yeterli olmaz.
Örnek Senaryo:
Butona Tıklama (AJAX Olmadan): Butona tıkladığınızda sayfa tamamen yenilirse, Selenium yeni DOM'u yükler ve kontrol eder. Burada bir problem yoktur çünkü sayfa tamamen yeniden yüklendiği için tüm DOM baştan oluşturulmuştur.

Butona Tıklama (AJAX ile): Butona tıkladığınızda sadece ürün listesi güncelleniyorsa, sayfanın tamamı yeniden yüklenmez. Eğer bekleme komutu eklenmezse, Selenium güncellenmemiş DOM'a bakar ve yeni ürün listesini görmez.

Sonuç:
AJAX kullanımı olduğunda, bekleme koymadan Selenium veya Playwright'ın eski DOM'a bakması kaçınılmazdır. Bu yüzden AJAX ile dinamik içerik güncellemelerini doğru test etmek için her zaman beklemeler eklemeli ve güncellemenin tamamlanmasını beklemelisiniz.










Sayfa tamamen yüklendiği zaman tarayıcı, test aracına "sayfa yüklendi" sinyalini verir. Bu yüzden klasik web uygulamalarında, sayfa tamamen yüklendiği için genellikle ek bir wait komutuna gerek kalmaz. Ancak, eğer sayfa dinamik olarak (AJAX ile) yükleniyorsa, tarayıcıya böyle bir sinyal gelmez ve bu durumda bekleme komutları gereklidir.

Özet:
Klasik web uygulamalarında her sayfa yenilenmesi zaman alır, ancak test araçları bu süreci otomatik olarak bekler.
Tarayıcı sayfanın tamamen yüklendiğini test aracına bildirir, bu yüzden ek bir beklemeye gerek kalmaz.
Sayfa dinamik olarak yükleniyorsa (örneğin AJAX ile), ek bekleme komutları kullanılması gerekebilir.
Bu yüzden klasik web uygulamalarında zaman alan bir işlem olsa bile, test otomasyon araçları sayfanın tamamen yüklendiğinden emin olana kadar otomatik olarak bekler.



Test araçları (Selenium, Playwright vb.) genelde bir eylem yapıldığında hemen ardından DOM'a bakar. Eğer bu sırada sayfanın tamamı yenilenmedi ve sadece bir parçası AJAX ile güncelleniyorsa, test aracı bekleme komutu olmadan devam ederse eski DOM ile işlem yapar. Çünkü test araçları, bir eylemin sonucunda sayfanın yenilenmemesini fark edemezler.

AJAX işlemleri genellikle arka planda çalışır ve sonuçları DOM'a eklemek zaman alabilir. Test aracının bu süreci anlaması ve AJAX çağrısının bitmesini beklemesi için explicit wait gibi bir bekleme eklemek gereklidir.



Eğer test aracında bir bekleme komutu yoksa, araç kullanıcının yaptığı eylemi tamamladıktan sonra, DOM'a hemen bakıp devam eder. Bu, test aracının arka planda çalışan AJAX işlemlerini takip etmediği anlamına gelir. Sonuç olarak:

Sayfa tamamen yenilenmediyse test aracı bunu bilmez ve sadece mevcut DOM'u kontrol eder.
AJAX işlemi henüz tamamlanmadıysa, DOM'da beklenen değişiklik henüz yapılmamış olabilir ve test, yanıt gelmeden devam eder.
Özet:
Klasik sitelerde test araçları, sayfa tamamen yenilendiğinde yeni DOM'a geçişi otomatik olarak anlar ve devam eder.
AJAX kullanılan sitelerde ise sayfa tamamen yenilenmediği için, test aracının güncellemenin tamamlandığını anlaması için bekleme komutları gereklidir. Bekleme komutları olmadan test aracı sonraki adımlara geçer, çünkü AJAX işleminin sonuçlanmasını beklemez.
Bu yüzden, AJAX kullanılan dinamik uygulamalarda testlerin güvenilir olması için, belirli elementlerin DOM'a yüklenmesini beklemek her zaman daha güvenli bir yöntemdir.





AJAX işlemleri, test perspektifini zorlaştırır çünkü arka planda gerçekleşen ve görünür olmayan işlemleri beklemek gerekir.test süreçlerinde AJAX işlemlerinin farklı bir şekilde ele alınması gerektiğini vurgulamaktır. Bir kullanıcının AJAX ile etkileşimi genellikle sayfa yenileme olmadan arka planda gerçekleşir


1. Kullanıcı Perspektifinde DOM Güncellenmesi
Evet, doğru. Bir web sayfasında AJAX kullanıldığında bile, arka planda alınan verilerin tarayıcıda görünmesi için o bilgilerin mutlaka DOM'a eklenmesi gerekir. DOM (Document Object Model), tarayıcıda gördüğümüz sayfanın yapı taşlarını temsil eder ve sayfadaki her elementin bir karşılığı vardır. Yani, AJAX ile sunucudan veri alındığında, bu verilerin DOM'a dahil edilmesi gerekir ki kullanıcı sayfada bu verileri görebilsin.

Örneğin, bir form gönderdiğinizde sayfa yeniden yüklenmeden sadece belirli bir bölüm (örneğin, bir mesaj alanı) güncellenir. Bu güncelleme, AJAX çağrısının sonucunun DOM'a yeni bir element olarak eklenmesiyle gerçekleşir. Bu yüzden DOM güncellenmeden kullanıcı bu değişiklikleri göremez.

2. Pozitif Anlamda Kullanıcı Deneyimi
Evet, bunu pozitif bir anlamda söyledim. AJAX'ın sağladığı avantajlardan biri, sayfanın tamamen yenilenmesi gerekmeden sadece ilgili kısımların güncellenmesiyle daha hızlı ve akıcı bir kullanıcı deneyimi sunmasıdır.

Örneğin, eskiden bir sayfada form doldurup gönderdiğinizde, sayfanın tamamen yenilenmesi gerekiyordu. Bu, kullanıcı için zaman kaybı ve kesintisiz bir deneyim eksikliği yaratıyordu. AJAX ile sadece formun gönderildiği alan veya mesaj gösterilen alan güncellenir ve sayfanın geri kalanı aynen kalır. Bu da kullanıcıya daha akıcı ve kesintisiz bir deneyim sağlar.

Bu nedenle, AJAX ile sayfa yenilemeden veri gönderilip alınması, kullanıcı açısından daha verimli ve rahatlatıcı bir deneyim olarak algılanır, çünkü işlem hızlıdır ve sayfa yüklenmesini beklemek zorunda kalmazlar.

Özet:
Evet, kullanıcının görebilmesi için AJAX ile gelen verilerin mutlaka DOM'a eklenmesi gerekir.
AJAX, sayfanın tamamen yenilenmesine gerek kalmadan hızlı ve sorunsuz bir kullanıcı deneyimi sunduğu için pozitif bir deneyim sağlar.




Test Perspektifinden Zorluk:
Eğer test senaryonuzda, AJAX çağrısı tamamlanmadan DOM'daki bir elementi kontrol etmeye çalışırsanız, bu işlem tamamlanmamış olduğundan, test hatasıyla karşılaşırsınız. Örneğin:

"Sepete Ekle" butonuna tıkladıktan hemen sonra, sepete eklenen ürün sayısını kontrol etmeye çalıştığınızda, AJAX çağrısı henüz tamamlanmamış olabilir.
Bu durumda, DOM'da görünür olmayan yani henüz yüklenmemiş bir elementin varlığını kontrol edersiniz.

Testte Bekleme Örneği:
Bu zorluğu aşmak için test senaryosunda bekleme fonksiyonları kullanırsınız. Örneğin, ürün sepete eklendiğinde sepetteki ürün sayısının DOM'a eklenmesini beklemek için:

await page.waitForSelector('.cart-count');  // Sepetteki ürün sayısını gösteren elementin DOM'a eklenmesini bekle
const count = await page.locator('.cart-count').textContent();
expect(count).toBe("1");

Bu testte, "Sepete Ekle" butonuna tıkladıktan sonra DOM'da sepetteki ürün sayısını gösteren .cart-count elementinin görünmesini bekliyoruz. Eğer bu bekleme fonksiyonu olmasaydı, AJAX işlemi tamamlanmadan testi devam ettirir ve DOM'da henüz bu element eklenmemiş olduğundan hata alırdık.



