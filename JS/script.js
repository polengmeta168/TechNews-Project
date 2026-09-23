

const darkModeBtn = document.getElementById("darkModeBtn");

function applyMode(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    if (darkModeBtn) {
        darkModeBtn.textContent = isDark ? "☀️" : "🌙";
    }
}

const savedMode = localStorage.getItem("techpulse-theme");
if (savedMode === "light") {
    applyMode(false);
} else {
    applyMode(true);
}

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-mode");
        applyMode(isDark);
        localStorage.setItem("techpulse-theme", isDark ? "dark" : "light");
    });
}



function handleContactSubmit(event) {
    event.preventDefault();
    const lang = localStorage.getItem("techpulse-lang") || "en";
    alert(lang === "kh"
        ? "សូមអរគុណ! សាររបស់អ្នកត្រូវបានទទួលរួចរាល់។"
        : "Thanks for reaching out! Your message has been received.");
    event.target.reset();
    return false;
}



const langButtons = document.querySelectorAll(".lang-btn");
const translatableEls = document.querySelectorAll("[data-en]");
const translatablePlaceholders = document.querySelectorAll("[data-placeholder-en]");
const translatableAria = document.querySelectorAll("[data-aria-en]");

const articleData = {
    ai: {
        category: { en: "AI", kh: "AI" },
        date: { en: "April 20, 2026", kh: "ថ្ងៃទី 20 ខែមេសា ២០២៦" },
        title: { en: "The Future of AI Technology", kh: "អនាគតនៃបច្ចេកវិទ្យា AI" },
        subtitle: {
            en: "AI tools are shaping the way we work, learn, and create in everyday life.",
            kh: "ឧបករណ៍ AI កំពុងបង្កើតបំលាស់លំនៅវិធីធ្វើការ ការរៀនសូត្រ និងការបង្កើតនៅក្នុងជីវិតប្រចាំថ្ងៃ។"
        },
        lead: {
            en: "Artificial intelligence is moving beyond research labs and becoming part of everyday digital experiences. From personal assistants to predictive tools, AI is changing how people and businesses make decisions.",
            kh: "បច្ចេកវិទ្យា AI កំពុងលូតលាស់ពីห้องทดลองស្រាវជ្រាវទៅជាផ្នែកនៃបទពិសោធន៍ឌីជីថលប្រចាំថ្ងៃ។ ពីអ្នកជួយផ្ទាល់ខ្លួនដល់ឧបករណ៍预测软件 AI កំពុងផ្លាស់ប្តូររបៀបដែលមនុស្ស និងអាជីវកម្មធ្វើការសម្រេចចិត្ត។"
        },
        paragraphs: [
            {
                en: "Across education, healthcare, logistics, and content creation, AI systems are becoming faster and more intuitive. They help people automate repetitive tasks, learn faster, and gain insight from huge amounts of data.",
                kh: "នៅក្នុងវិស័យអប់រំ សុខភាព ការដឹកជញ្ជូន និងការបង្កើតមាតិកា ប្រព័ន្ធ AI កំពុងក្លាយជាមធ្យមីដែលលឿន និងមានភាពចូលចិត្តកាន់តែច្រើន។ ពួកវាជួយមនុស្សធ្វើការងារដែលធ្វើបន្តិចម្ដងៗដោយស្វ័យប្រវត្តិ រៀនបានលឿន និងទទួលបានព័ត៌មានពីទិន្នន័យយ៉ាងច្រើន។"
            },
            {
                en: "The biggest opportunity is not just automation. It is the ability to turn complex information into useful decisions. Companies that learn to combine AI with human creativity will often outperform those that rely on technology alone.",
                kh: "ឱកាសធំបំផុតមិនត្រឹមតែជាការធ្វើការងារដោយស្វ័យប្រវត្តិទេ។ វាគឺជាសមត្ថភាពក្នុងការបម្លែងព័ត៌មានស្មុគស្មាញទៅជាការសម្រេចចិត្តដែលមានប្រយោជន៍។ ក្រុមហ៊ុនដែលរៀនប្រើ AI រួមជាមួយភាពច្នៃប្រឌិតរបស់មនុស្ស ជាធម្មតានឹងមានប្រសិទ្ធភាពល្អជាងក្រុមហ៊ុនដែលអាស្រ័យលើបច្ចេកវិទ្យាតែឯង។"
            },
            {
                en: "The future of AI is not about replacing people. It is about empowering them with tools that improve productivity, creativity, and access to knowledge.",
                kh: "អនាគតនៃ AI មិនមែនជាការជំនួសមនុស្សនោះទេ។ វាគឺជាការផ្តល់សមត្ថភាពដល់មនុស្សដោយឧបករណ៍ដែលធ្វើឱ្យប្រសើរ productivity ការបង្កើតសេក្ខភាព និងការចូលប្រើប្រាស់ចំណេះដឹង។"
            }
        ],
        quote: { en: "AI is most powerful when used to augment human potential, not replace it.", kh: "AI មានអានុភាពខ្ពស់បំផុតនៅពេលប្រើប្រាស់ដើម្បីបន្ថែមសក្តានុពលរបស់មនុស្ស ជាជាងជំនួសវា។" },
        image: "img/ai.png"
    },
    mobile: {
        category: { en: "Mobile", kh: "ទូរស័ព្ទ" },
        date: { en: "May 04, 2026", kh: "ថ្ងៃទី 04 ខែឧសភា 2026" },
        title: { en: "New Trends in Smartphone Technology", kh: "និន្នាការថ្មីក្នុងបច្ចេកវិទ្យាទូរស័ព្ទ" },
        subtitle: {
            en: "Smartphones are becoming more intelligent, more compact, and more personalized than ever.",
            kh: "ទូរស័ព្ទកំពុងក្លាយទៅជាឧបករណ៍ឆ្លាតវៃ បង្រួម និងផ្ទាល់ខ្លួន hơnពីមុន។"
        },
        lead: {
            en: "The newest smartphones blend power, camera quality, battery life, and AI-driven software in a single device. This shift creates expectations for faster, smarter, and more seamless everyday use.",
            kh: "ទូរស័ព្ទថ្មីៗរួមបញ្ចូលថាមពល គុណភាពកាមេរ៉ា សុីត្យភាពថ្ម និងកម្មវិធីដែលដំណើរការដោយ AI នៅក្នុងឧបករណ៍តែមួយ។ ការផ្លាស់ប្តូរនេះបង្កើតការរំពឹងទុកសម្រាប់ការប្រើប្រាស់ប្រចាំថ្ងៃដែលលឿន វៃឆ្លាត និងរលូនជាងមុន។"
        },
        paragraphs: [
            {
                en: "Camera systems now capture better images with computational photography, while AI can recognize scenes and optimize photos automatically. Users can edit and share premium-looking content without advanced editing skill.",
                kh: "ប្រព័ន្ធកាមេរ៉ា ឥឡូវនេះថតរូបកាន់តែប្រសើរ ដោយប្រើថតរូបដោយកុំព្យូទ័រ ខណៈដែល AI អាចកំណត់ឈ្មោះទិដ្ឋភាព និងធ្វើអោយរូបថតប្រសើរដោយស្វ័យប្រវត្តិ។ អ្នកប្រើអាចកែសម្រួល និងចែករំលែកមាតិកាដែលមានគុណភាពខ្ពស់ដោយគ្មានជំនាញកែសម្រួលជំនាញ។"
            },
            {
                en: "Battery technology and efficient chipsets are helping phones last longer while staying lightweight. That means users can do more work, entertainment, and communication in a single day.",
                kh: "បច្ចេកវិទ្យាថ្ម និង chipsets មានប្រសិទ្ធភាពកំពុងជួយឱ្យទូរស័ព្ទថែរក្សាបានយូរ ខណៈដែលនៅតែមានទម្ងន់ស្រាល។ នេះមានន័យថាអ្នកប្រើអាចធ្វើការងារច្រើន កំសាន្ត និងទំនាក់ទំនងក្នុងមួយថ្ងៃ។"
            },
            {
                en: "The next wave of mobile devices will likely focus on personalization, security, and deeper integration with work and lifestyle apps.",
                kh: "រលកបន្ទាប់នៃឧបករណ៍ទូរស័ព្ទអាចផ្តោតលើការផ្ទាល់ខ្លួន សន្តិសុខ និងការរួមបញ្ចូលជាមួយកម្មវិធីការងារ និងជីវភាពកាន់តែស្រដៀង។"
            }
        ],
        quote: { en: "The best smartphone is no longer just fast—it is smart, efficient, and built for daily life.", kh: "ទូរស័ព្ទដ៏ល្អបំផុតមិនមែនជាឧបករណ៍លឿនប៉ុណ្ណោះទេ—it is smart, efficient, and built for daily life." },
        image: "img/smartphone.png"
    },
    security: {
        category: { en: "Security", kh: "សន្តិសុខ" },
        date: { en: "May 18, 2026", kh: "ថ្ងៃទី 18 ខែឧសភា 2026" },
        title: { en: "Why Cybersecurity Matters More Than Ever", kh: "ហេតុអ្វីបានជាសន្តិសុខអនឡាញសំខាន់ជាងមុន" },
        subtitle: {
            en: "Digital threats are growing, and personal security habits have become essential for everyone.",
            kh: "ការគំរាមកំហែងឌីជីថលកំពុងកើនឡើង ហើយទម្លាប់សន្តិសុខផ្ទាល់ខ្លួនកំពុងក្លាយជាកត្តាសំខាន់សម្រាប់គ្រប់គ្នា។"
        },
        lead: {
            en: "As more services move online, the risk of scams, data theft, and account takeover continues to rise. People need stronger awareness and safer digital habits to protect both personal and professional information.",
            kh: "នៅពេលសេវាកម្មកាន់តែច្រើនផ្លាស់ទៅលើអនឡាញ ភាពเสี่ยงទាក់ទងនឹងការលួចលុក ព័ត៌មានបាត់បង់ និងការរៀបចំគណនីកំពុងកើនឡើង។ មនុស្សត្រូវការទំនួលបានការយល់ដឹងកាន់តែច្រើន និងទម្លាប់ឌីជីថលที่សុវត្ថិភាពជាងមុនដើម្បីការពារព័ត៌មានផ្ទាល់ខ្លួន និងការងារ។"
        },
        paragraphs: [
            {
                en: "Strong passwords, multi-factor authentication, and regular updates are still some of the simplest effective protections. Cybercriminals often target weak habits instead of sophisticated systems.",
                kh: "ពាក្យសម្ងាត់ដ៏រឹងមាំ ការផ្ទៀងផ្ទាត់ពាក់ព័ន្ធច្រើនជំហាន និងការធ្វើបច្ចុប្បន្នភាពជាប្រចាំ គឺនៅតែជាឧបករណ៍ការពារដ៏មានប្រសិទ្ធភាព។ អ្នកចម្លងក្លែងក្លាយជារដ្ឋាភិបាលជាតិភាគច្រើនគោលបំណងទៅលើទម្លាប់ខ្សោយជាជាងប្រព័ន្ធដ៏ស្មុគស្មាញ។"
            },
            {
                en: "Businesses need security training for employees, because many breaches begin with human error. Clear policies and routine checks help reduce those risks before they become serious incidents.",
                kh: "ស្ថាប័នត្រូវការបណ្តុះបណ្តាលសន្តិសុខសម្រាប់បុគ្គលិក ព្រោះការរំលោភបំពានច្រើនកើតឡើងពីកំហុសរបស់មនុស្ស។ គោលការណ៍ច្បាស់ និងការពិនិត្យជាប្រចាំជួយកាត់បន្ថយហានិភ័យមុនពេលវាក្លាយជាបញ្ហាធ្ងន់ធ្ងរ។"
            },
            {
                en: "Security is not a one-time task. It is an ongoing habit of awareness, testing, and practical action.",
                kh: "សន្តិសុខមិនមែនជាការងារមួយដងទេ។ វាជាការតាមដានជាបន្តបន្ទាប់នៃការយល់ដឹង ការធ្វើតេស្ត និងសកម្មភាពជាក់ស្តែង។"
            }
        ],
        quote: { en: "The best defense is not just technology—it is awareness and good habits.", kh: "ការការពារដែលល្អបំផុតមិនមែនមានតែបច្ចេកវិទ្យាទេ—វាជាការយល់ដឹង និងទម្លាប់ល្អ។" },
        image: "img/cybersecurity.png"
    },
    computers: {
        category: { en: "Computers", kh: "កុំព្យូទ័រ" },
        date: { en: "June 08, 2026", kh: "ថ្ងៃទី 08 ខែមិថុនា 2026" },
        title: { en: "Modern Computers Are Evolving Fast", kh: "កុំព្យូទ័រទំនើបកំពុងវិវត្តយ៉ាងលឿន" },
        subtitle: {
            en: "New hardware and smart design choices are making computers faster, lighter, and easier to use.",
            kh: "ម៉ាស៊ីនផ្នែករឹងថ្មី និងការរចនាឆ្លាតវៃកំពុងធ្វើឱ្យកុំព្យូទ័រលឿន តូច និងងាយប្រើជាងមុន។"
        },
        lead: {
            en: "Modern computers are shifting toward energy efficiency, portability, and better performance in smaller form factors. These changes are helping students, creators, and professionals work with more flexibility.",
            kh: "កុំព្យូទ័រទំនើបកំពុងផ្លាស់ប្តូរទៅរកប្រសិទ្ធភាពថាមពល ការធ្វើដំណើរ និងដំណើរការសមត្ថភាពកាន់តែប្រសើរ នៅក្នុងទំហំតូច។ ការផ្លាស់ប្តូរនេះជួយសិស្ស អ្នកបង្កើត និងអ្នកជំនាញធ្វើការជាមួយភាពបត់បែនកាន់តែច្រើន។"
        },
        paragraphs: [
            {
                en: "Thin laptops, compact desktops, and hybrid devices now deliver strong performance without taking over the desk. Users can move between work, study, and creativity more easily than before.",
                kh: "ឡេបធូរស្រាល កុំព្យូទ័រតូច និងឧបករណ៍ចម្រុះកំពុងផ្តល់សមត្ថភាពយ៉ាងខ្លាំង ដោយមិនចំណាយប្រាក់ច្រើនលើតុធ្វើការ។ អ្នកប្រើអាចធ្វើការរវាងការងារ ការសិក្សា និងការបង្កើតដោយងាយស្រួលជាងមុន។"
            },
            {
                en: "In addition to speed, design improvements are focusing on comfort, battery life, and better thermal management. These upgrades make computing less stressful and more productive.",
                kh: "ក្រៅពីល្បឿន ការកែលម្អក្នុងការរចនាកំពុងផ្តោតលើការរស់រាយ ថ្ម និងការគ្រប់គ្រងកំដៅប្រកបដោយប្រសិទ្ធភាព។ ការកែលម្អទាំងនេះធ្វើឱ្យការប្រើប្រាស់កុំព្យូទ័រមិនធ្ងន់ធ្ងរ និងមានប្រសិទ្ធភាពកាន់តែច្រើន។"
            },
            {
                en: "The future of computing will likely combine portability with more powerful AI features, making advanced tools feel simpler and more accessible to everyone.",
                kh: "អនាគតនៃកុំព្យូទ័រកំពុងប្រហែលជារួមបញ្ចូលភាពចល័តជាមួយលក្ខណៈ AI ដ៏មានអានុភាពកាន់តែច្រើន ធ្វើឱ្យឧបករណ៍កម្រិតខ្ពស់មានរស់រវើក និងងាយស្រួលប្រើប្រាស់សម្រាប់គ្រប់គ្នា។"
            }
        ],
        quote: { en: "The best computer is not the one with the most parts—it is the one that fits the way you work best.", kh: "កុំព្យូទ័រដែលល្អបំផុតមិនមែនជាឧបករណ៍ដែលមានផ្នែកច្រើនបំផុតទេ—វាជាឧបករណ៍ដែលស័ក្តិសមនឹងរបៀបធ្វើការ។" },
        image: "img/laptop.png"
    }
};

function renderArticle(lang) {
    const articleId = new URLSearchParams(window.location.search).get("id") || "ai";
    const article = articleData[articleId] || articleData.ai;

    const articleTitle = document.getElementById("articleTitle");
    const articleSubtitle = document.getElementById("articleSubtitle");
    const articleCategory = document.getElementById("articleCategory");
    const articleDate = document.getElementById("articleDate");
    const articleImage = document.getElementById("articleImage");
    const articleLead = document.getElementById("articleLead");
    const articleQuote = document.getElementById("articleQuote");
    const articleParagraphs = document.querySelectorAll("[data-article-paragraph]");

    if (articleTitle) articleTitle.textContent = article.title[lang];
    if (articleSubtitle) articleSubtitle.textContent = article.subtitle[lang];
    if (articleCategory) articleCategory.textContent = article.category[lang];
    if (articleDate) articleDate.textContent = article.date[lang];
    if (articleImage) articleImage.src = article.image;
    if (articleLead) articleLead.textContent = article.lead[lang];
    if (articleQuote) articleQuote.textContent = article.quote[lang];

    articleParagraphs.forEach((paragraph, index) => {
        const text = article.paragraphs[index]?.[lang];
        if (text) paragraph.textContent = text;
    });
}

function setLanguage(lang) {
    translatableEls.forEach((el) => {
        const text = lang === "kh" ? el.dataset.kh : el.dataset.en;
        if (text) el.textContent = text;
    });

    translatablePlaceholders.forEach((el) => {
        const placeholder = lang === "kh" ? el.dataset.placeholderKh : el.dataset.placeholderEn;
        if (placeholder) el.placeholder = placeholder;
    });

    translatableAria.forEach((el) => {
        const label = lang === "kh" ? el.dataset.ariaKh : el.dataset.ariaEn;
        if (label) el.setAttribute("aria-label", label);
    });

    if (document.body.dataset.articlePage === "true") {
        renderArticle(lang);
    }

    langButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    localStorage.setItem("techpulse-lang", lang);
    document.documentElement.lang = lang === "kh" ? "km" : "en";
}

const savedLang = localStorage.getItem("techpulse-lang") || "en";
if (translatableEls.length) setLanguage(savedLang);

langButtons.forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});



const categoryFilterButtons = document.querySelectorAll(".filter-btn");
const filterableCards = document.querySelectorAll("[data-category]");

categoryFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        categoryFilterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));

        filterableCards.forEach((card) => {
            const parentCol = card.closest(".col-md-6, .col-lg-4, .col-lg-3, .col-lg-6") || card;
            const shouldHide = filter !== "all" && card.dataset.category !== filter;
            parentCol.style.display = shouldHide ? "none" : "";
        });
    });
});



const bookmarkButtons = document.querySelectorAll(".bookmark-btn");
const savedBookmarks = JSON.parse(localStorage.getItem("techpulse-bookmarks") || "[]");

function refreshBookmarkIcon(button) {
    const isSaved = savedBookmarks.includes(button.dataset.id);
    button.classList.toggle("active", isSaved);
    button.textContent = isSaved ? "🔖" : "📑";
    button.setAttribute("aria-label", isSaved ? "Remove bookmark" : "Add bookmark");
}

bookmarkButtons.forEach((button) => {
    refreshBookmarkIcon(button);
    button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const id = button.dataset.id;
        const index = savedBookmarks.indexOf(id);
        if (index === -1) {
            savedBookmarks.push(id);
        } else {
            savedBookmarks.splice(index, 1);
        }
        localStorage.setItem("techpulse-bookmarks", JSON.stringify(savedBookmarks));
        refreshBookmarkIcon(button);
    });
});



const readingModeBtn = document.getElementById("readingModeBtn");

if (readingModeBtn) {
    const savedReadingMode = localStorage.getItem("techpulse-reading-mode") === "on";
    document.body.classList.toggle("reading-mode", savedReadingMode);
    readingModeBtn.classList.toggle("active", savedReadingMode);

    readingModeBtn.addEventListener("click", () => {
        const isOn = document.body.classList.toggle("reading-mode");
        readingModeBtn.classList.toggle("active", isOn);
        localStorage.setItem("techpulse-reading-mode", isOn ? "on" : "off");
    });
}
