import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "app": {
                "title": "Kürdan",
                "subtitle": "A Simple Metadata Cleaner",
                "supportMe": "Support Me",
                "noLogs": "No Logs",
                "fastProcessing": "Fast Processing",
                "cloudPowered": "Cloud Powered"
            },
            "home": {
                "dropzoneTitle": "Drag & drop files here",
                "dropzoneSubtitle": "or click to select files",
                "dropzoneNote": "Supports Images (JPEG, PNG, GIF, WebP), Audio (MP3), PDF, and Office docs",
                "fileQueue": "File Queue",
                "cleaned": "Cleaned",
                "clearQueue": "Clear Queue",
                "downloadAll": "Download All",
                "uploading": "Uploading...",
                "processing": "Processing files...",
                "removeMetadata": "Remove Metadata",
                "clickToViewMetadata": "Click on a file to view its metadata.",
                "serviceUnavailable": "Service Unavailable",
                "serviceUnavailableMsg": "The support feature is currently under maintenance. Please check back later!",
                "gotIt": "Got it",
                "metadataViewer": {
                    "title": "Metadata Inspection",
                    "noMetadata": "No metadata found or format not supported for detailed inspection on client.",
                    "close": "Close",
                    "property": "Property",
                    "value": "Value",
                    "warning": "This information will be permanently removed upon cleaning.",
                    "cleanedTitle": "Cleaned File Info",
                    "cleanedSuccess": "Clean & Secure",
                    "cleanedDesc": "This file has been processed. All metadata has been stripped."
                },
                "totalCleanedGlobal": "{{count}} files cleaned globally",
                "globalStatsPrefix": "",
                "globalStatsSuffix": "files cleaned with Kürdan so far"
            },
            "footer": {
                "privacy": "Privacy Policy",
                "terms": "Terms of Service",
                "license": "MIT License",
                "feedback": "Feedback",
                "contact": "Feedback & Contact",
                "rights": "All rights reserved.",
                "madeWith": "Made with",
                "by": "by Antigravity"
            },
            "privacy": {
                "title": "Privacy Policy",
                "lastUpdated": "Last updated: December 12, 2024",
                "intro": "At Kürdan, we are committed to protecting your privacy. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information when you use our metadata removal service.",

                "section1Title": "1. Our Privacy Commitment",
                "section1Desc": "Kürdan operates on a foundational principle: your files are your business. We have designed our service to ensure maximum privacy and minimal data exposure. We do not store, archive, or retain any files you upload to our service.",

                "section2Title": "2. No-Logs Policy",
                "section2Desc": "We maintain a strict no-logs policy. This means we do not keep records of your uploaded files, the metadata they contained, or any processed outputs. All file processing occurs in ephemeral server memory and is immediately discarded upon completion or session termination.",

                "section3Title": "3. Server-Side Processing & Data Lifecycle",
                "section3Desc": "When you upload a file, it is temporarily transferred to our secure server over an encrypted HTTPS connection. The file is processed in memory to remove metadata, and the cleaned version is made available for download. Within seconds of processing completion, all traces of both the original and cleaned files are permanently deleted from our systems. No backup copies are created.",

                "section4Title": "4. Information We Do NOT Collect",
                "section4Desc": "We do not collect, store, or process any personal information, including but not limited to: your name, email address, IP address, device information, browser fingerprints, or usage analytics. We do not use cookies for tracking purposes.",

                "section5Title": "5. Local Storage & Preferences",
                "section5Desc": "Your browser's Local Storage is used solely to remember your interface preferences, such as dark mode selection and language preference. No personal or file-related data is stored locally.",

                "section6Title": "6. Third-Party Services",
                "section6Desc": "Kürdan does not integrate with any third-party analytics, advertising, or tracking services. Your interaction with our service is private and not shared with any external parties.",

                "section7Title": "7. Data Security",
                "section7Desc": "While we take reasonable measures to protect data in transit using industry-standard encryption (HTTPS/TLS), the ephemeral nature of our processing means there is no persistent data to secure. Files exist on our servers for mere seconds.",

                "section8Title": "8. Your Rights",
                "section8Desc": "Since we do not collect or retain personal data, there is no stored information to access, modify, or delete. You maintain complete control over your files throughout the brief processing period.",

                "section9Title": "9. Changes to This Policy",
                "section9Desc": "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the service after changes constitutes acceptance of the updated policy.",

                "section10Title": "10. Contact Us",
                "section10Desc": "If you have questions or concerns about this Privacy Policy or our data practices, please contact us through the channels provided on our Contact page."
            },
            "terms": {
                "title": "Terms of Service",
                "lastUpdated": "Last updated: December 12, 2024",
                "intro": "By accessing and using Kürdan's metadata removal service, you agree to be bound by these Terms of Service. Please read them carefully before using our service.",

                "section1Title": "1. Acceptance of Terms",
                "section1Desc": "By using Kürdan, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our service.",

                "section2Title": "2. Description of Service",
                "section2Desc": "Kürdan provides a web-based tool for removing metadata from digital files, including images, PDFs, and office documents. The service processes files server-side and provides cleaned versions for download. Processing is temporary and no files are retained.",

                "section3Title": "3. User Responsibilities",
                "section3Desc": "You are solely responsible for the files you upload and process. You represent that you have the legal right to upload and modify the files you submit. You must not upload files containing illegal content or files you do not have permission to modify.",

                "section4Title": "4. Prohibited Uses",
                "section4Desc": "You may not use Kürdan for any unlawful purpose or in any way that violates these terms. Prohibited activities include: uploading malicious files, attempting to circumvent security measures, overloading our servers, or using the service to process files containing illegal content.",

                "section5Title": "5. Intellectual Property",
                "section5Desc": "Kürdan is open-source software licensed under the MIT License. You retain all rights to your uploaded files. We claim no ownership or intellectual property rights over your content.",

                "section6Title": "6. Disclaimer of Warranties",
                "section6Desc": "THE SERVICE IS PROVIDED 'AS IS' WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. We do not guarantee that the service will be uninterrupted, error-free, or completely remove all metadata.",

                "section7Title": "7. Limitation of Liability",
                "section7Desc": "IN NO EVENT SHALL KÜRDAN BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA, ARISING FROM YOUR USE OF THE SERVICE. You acknowledge that you should maintain backups of your original files.",

                "section8Title": "8. Indemnification",
                "section8Desc": "You agree to indemnify and hold harmless Kürdan and its operators from any claims, damages, losses, or expenses arising from your use of the service or violation of these terms.",

                "section9Title": "9. Modifications to Service and Terms",
                "section9Desc": "We reserve the right to modify, suspend, or discontinue the service at any time without notice. We may also update these Terms of Service periodically. Continued use after changes constitutes acceptance of modified terms.",

                "section10Title": "10. Governing Law",
                "section10Desc": "These Terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved through appropriate legal channels.",

                "section11Title": "11. Contact Information",
                "section11Desc": "For questions about these Terms of Service, please contact us through the channels provided on our Contact page."
            },
            "contact": {
                "title": "Feedback & Contact",
                "desc": "We'd love to hear from you! Whether you have a question, feedback, or need support, feel free to reach out.",
                "feedbackContact": "Get in Touch",
                "emailDesc": "Send us an email for any inquiries, feedback, or support requests."
            },
            "license": {
                "title": "MIT License"
            }
        }
    },
    tr: {
        translation: {
            "app": {
                "title": "Kürdan",
                "subtitle": "Basit bir Metadata Temizleyici",
                "supportMe": "Bana Destek Ol",
                "noLogs": "Kayıt Tutulmaz",
                "fastProcessing": "Hızlı İşlem",
                "cloudPowered": "Bulut Destekli"
            },
            "home": {
                "dropzoneTitle": "Dosyaları buraya sürükleyin",
                "dropzoneSubtitle": "veya seçmek için tıklayın",
                "dropzoneNote": "Resim (JPEG, PNG, GIF, WebP), Ses (MP3), PDF ve Ofis belgelerini destekler",
                "fileQueue": "Dosya Kuyruğu",
                "cleaned": "Temizlendi",
                "clearQueue": "Listeyi Temizle",
                "downloadAll": "Hepsini İndir",
                "uploading": "Yükleniyor...",
                "processing": "İşleniyor...",
                "removeMetadata": "Metadatayı Temizle",
                "clickToViewMetadata": "Metaveriyi görüntülemek için dosyanın üzerine tıklayın.",
                "serviceUnavailable": "Hizmet Kullanılamıyor",
                "serviceUnavailableMsg": "Destek özelliği şu anda bakım aşamasındadır. Lütfen daha sonra tekrar kontrol edin!",
                "gotIt": "Anladım",
                "metadataViewer": {
                    "title": "Metadata İnceleme",
                    "noMetadata": "Ayrıntılı inceleme için metadata bulunamadı veya format desteklenmiyor.",
                    "close": "Kapat",
                    "cleanedTitle": "Temizlenmiş Dosya Bilgisi",
                    "cleanedSuccess": "Temiz ve Güvenli",
                    "cleanedDesc": "Bu dosya işlenmiştir. Tüm metadata kaldırılmıştır.",
                    "property": "Kategori",
                    "value": "İçerik",
                    "warning": "Bu bilgiler temizleme sırasında kalıcı olarak silinecektir.",
                    "cleanedTitle": "Temizlenmiş Dosya Bilgisi",
                    "cleanedSuccess": "Temiz ve Güvenli",
                    "cleanedDesc": "Bu dosya işlendi. Tüm metaveriler silindi."
                },
                "totalCleanedGlobal": "Toplam {{count}} dosya temizlendi",
                "globalStatsPrefix": "Şimdiye dek",
                "globalStatsSuffix": "dosya Kürdan'la temizlendi"
            },
            "footer": {
                "privacy": "Gizlilik Politikası",
                "terms": "Kullanım Koşulları",
                "license": "MIT Lisansı",
                "feedback": "Geri Bildirim",
                "contact": "Geri Bildirim & İletişim",
                "rights": "Tüm hakları saklıdır.",
                "madeWith": "ile",
                "by": "tarafından yapıldı"
            },
            "privacy": {
                "title": "Gizlilik Politikası",
                "lastUpdated": "Son güncelleme: 12 Aralık 2024",
                "intro": "Kürdan olarak gizliliğinizi korumaya kararlıyız. Bu Gizlilik Politikası, metadata temizleme hizmetimizi kullandığınızda bilgilerin toplanması, kullanılması ve ifşa edilmesiyle ilgili uygulamalarımızı açıklar.",

                "section1Title": "1. Gizlilik Taahhüdümüz",
                "section1Desc": "Kürdan temel bir ilke üzerine çalışır: dosyalarınız sizin işinizdir. Hizmetimizi maksimum gizlilik ve minimum veri maruziyeti sağlayacak şekilde tasarladık. Hizmetimize yüklediğiniz hiçbir dosyayı saklamaz, arşivlemez veya tutmayız.",

                "section2Title": "2. Kayıt Tutmama Politikası",
                "section2Desc": "Katı bir kayıt tutmama politikası uyguluyoruz. Bu, yüklediğiniz dosyaların, içerdikleri metadata'nın veya işlenmiş çıktıların kaydını tutmadığımız anlamına gelir. Tüm dosya işlemleri geçici sunucu belleğinde gerçekleşir ve tamamlandığında veya oturum sonlandırıldığında anında silinir.",

                "section3Title": "3. Sunucu Taraflı İşleme ve Veri Yaşam Döngüsü",
                "section3Desc": "Bir dosya yüklediğinizde, şifrelenmiş bir HTTPS bağlantısı üzerinden güvenli sunucumuza geçici olarak aktarılır. Dosya, metadata'yı kaldırmak için bellekte işlenir ve temizlenmiş sürüm indirme için kullanıma sunulur. İşlemenin tamamlanmasından saniyeler sonra, hem orijinal hem de temizlenmiş dosyaların tüm izleri sistemlerimizden kalıcı olarak silinir. Yedek kopya oluşturulmaz.",

                "section4Title": "4. Toplamadığımız Bilgiler",
                "section4Desc": "Adınız, e-posta adresiniz, IP adresiniz, cihaz bilgileriniz, tarayıcı parmak izleriniz veya kullanım analitikleri dahil olmak üzere hiçbir kişisel bilgi toplamaz, saklamaz veya işlemeyiz. İzleme amaçlı çerezler kullanmayız.",

                "section5Title": "5. Yerel Depolama ve Tercihler",
                "section5Desc": "Tarayıcınızın Yerel Deposu, yalnızca karanlık mod seçimi ve dil tercihi gibi arayüz tercihlerinizi hatırlamak için kullanılır. Yerel olarak hiçbir kişisel veya dosya ile ilgili veri depolanmaz.",

                "section6Title": "6. Üçüncü Taraf Hizmetler",
                "section6Desc": "Kürdan, herhangi bir üçüncü taraf analitik, reklam veya izleme hizmetiyle entegre değildir. Hizmetimizle etkileşiminiz özeldir ve harici taraflarla paylaşılmaz.",

                "section7Title": "7. Veri Güvenliği",
                "section7Desc": "Endüstri standardı şifreleme (HTTPS/TLS) kullanarak aktarımdaki verileri korumak için makul önlemler alsak da, işlememizin geçici doğası, güvenliği sağlanacak kalıcı veri olmadığı anlamına gelir. Dosyalar sunucularımızda yalnızca birkaç saniye bulunur.",

                "section8Title": "8. Haklarınız",
                "section8Desc": "Kişisel veri toplamadığımız veya saklamadığımız için erişilecek, değiştirilecek veya silinecek depolanmış bilgi yoktur. Kısa işleme süresi boyunca dosyalarınız üzerinde tam kontrol sahibi olursunuz.",

                "section9Title": "9. Bu Politikadaki Değişiklikler",
                "section9Desc": "Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Herhangi bir değişiklik, güncellenmiş bir revizyon tarihiyle bu sayfada yayınlanacaktır. Değişikliklerden sonra hizmetin kullanılmaya devam edilmesi, güncellenen politikanın kabulü anlamına gelir.",

                "section10Title": "10. Bize Ulaşın",
                "section10Desc": "Bu Gizlilik Politikası veya veri uygulamalarımız hakkında sorularınız veya endişeleriniz varsa, lütfen İletişim sayfamızda belirtilen kanallar aracılığıyla bizimle iletişime geçin."
            },
            "terms": {
                "title": "Kullanım Koşulları",
                "lastUpdated": "Son güncelleme: 12 Aralık 2024",
                "intro": "Kürdan'ın metadata temizleme hizmetine erişerek ve kullanarak, bu Kullanım Koşullarına bağlı olmayı kabul edersiniz. Lütfen hizmetimizi kullanmadan önce dikkatlice okuyun.",

                "section1Title": "1. Koşulların Kabulü",
                "section1Desc": "Kürdan'ı kullanarak, bu Kullanım Koşullarını ve Gizlilik Politikamızı okuduğunuzu, anladığınızı ve bunlarla bağlı olmayı kabul ettiğinizi onaylarsınız. Bu koşulları kabul etmiyorsanız, lütfen hizmetimizi kullanmayın.",

                "section2Title": "2. Hizmet Açıklaması",
                "section2Desc": "Kürdan, resimler, PDF'ler ve ofis belgeleri dahil olmak üzere dijital dosyalardan metadata kaldırmak için web tabanlı bir araç sağlar. Hizmet, dosyaları sunucu tarafında işler ve temizlenmiş sürümleri indirme için sunar. İşleme geçicidir ve hiçbir dosya saklanmaz.",

                "section3Title": "3. Kullanıcı Sorumlulukları",
                "section3Desc": "Yüklediğiniz ve işlediğiniz dosyalardan yalnızca siz sorumlusunuz. Gönderdiğiniz dosyaları yükleme ve değiştirme konusunda yasal hakkınız olduğunu beyan edersiniz. Yasadışı içerik içeren dosyaları veya değiştirme izniniz olmayan dosyaları yüklememelisiniz.",

                "section4Title": "4. Yasaklanmış Kullanımlar",
                "section4Desc": "Kürdan'ı herhangi bir yasadışı amaç için veya bu koşulları ihlal edecek şekilde kullanamazsınız. Yasaklanan faaliyetler şunları içerir: kötü amaçlı dosyalar yüklemek, güvenlik önlemlerini atlatmaya çalışmak, sunucularımızı aşırı yüklemek veya hizmeti yasadışı içerik içeren dosyaları işlemek için kullanmak.",

                "section5Title": "5. Fikri Mülkiyet",
                "section5Desc": "Kürdan, MIT Lisansı altında lisanslanan açık kaynak yazılımdır. Yüklediğiniz dosyalar üzerindeki tüm hakları siz saklırsınız. İçeriğiniz üzerinde hiçbir mülkiyet veya fikri mülkiyet hakkı talep etmiyoruz.",

                "section6Title": "6. Garantilerin Reddi",
                "section6Desc": "HİZMET, SATILABİLİRLİK, BELİRLİ BİR AMACA UYGUNLUK VEYA İHLAL ETMEME GARANTİLERİ DAHİL ANCAK BUNLARLA SINIRLI OLMAMAK ÜZERE, AÇIK VEYA ZIMNİ HİÇBİR GARANTİ OLMAKSIZIN 'OLDUĞU GİBİ' SAĞLANIR. Hizmetin kesintisiz, hatasız olacağını veya tüm metadata'yı tamamen kaldıracağını garanti etmiyoruz.",

                "section7Title": "7. Sorumluluk Sınırlaması",
                "section7Desc": "HİZMETİN KULLANIMINIZDAN KAYNAKLANAN VERİ KAYBI DAHİL OLMAK ÜZERE HİÇBİR DURUMDA KÜRDAN, DOLAYLI, ARIZİ, ÖZEL, SONUÇSAL VEYA CEZAİ ZARARLARDAN SORUMLU OLMAYACAKTIR. Orijinal dosyalarınızın yedeklerini tutmanız gerektiğini kabul edersiniz.",

                "section8Title": "8. Tazminat",
                "section8Desc": "Hizmetin kullanımınızdan veya bu koşulların ihlalinden kaynaklanan her türlü iddia, zarar, kayıp veya masraftan Kürdan'ı ve operatörlerini tazmin etmeyi ve zararsız tutmayı kabul edersiniz.",

                "section9Title": "9. Hizmet ve Koşullarda Değişiklikler",
                "section9Desc": "Hizmeti herhangi bir zamanda önceden haber vermeksizin değiştirme, askıya alma veya durdurma hakkını saklı tutarız. Bu Kullanım Koşullarını da periyodik olarak güncelleyebiliriz. Değişikliklerden sonra kullanımın devam etmesi, değiştirilmiş koşulların kabulü anlamına gelir.",

                "section10Title": "10. Geçerli Yasa",
                "section10Desc": "Bu Koşullar, geçerli yasalara uygun olarak yönetilecek ve yorumlanacaktır. Herhangi bir anlaşmazlık, uygun yasal kanallar aracılığıyla çözülecektir.",

                "section11Title": "11. İletişim Bilgileri",
                "section11Desc": "Bu Kullanım Koşulları hakkında sorularınız için, lütfen İletişim sayfamızda belirtilen kanallar aracılığıyla bizimle iletişime geçin."
            },
            "contact": {
                "title": "Geri Bildirim & İletişim",
                "desc": "Sizden haber almayı çok isteriz! Sorularınız, geri bildirimleriniz veya destek ihtiyaçlarınız için bizimle iletişime geçin.",
                "feedbackContact": "Bizimle İletişime Geçin",
                "emailDesc": "Herhangi bir sorunuz, geri bildiriminiz veya destek isteğiniz için bize e-posta gönderin."
            },
            "license": {
                "title": "MIT Lisansı"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
