const darkModeBtn = document.getElementById("darkModeBtn");

function applyMode(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
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

/* ===== Contact Form (Web3Forms + Telegram) ===== */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;

        const BOT_TOKEN = "8237860620:AAHkMYaSJwJIFk04nD5OT0Zm7dSjhiz-OS4";
        const CHAT_ID = "6951979269";

        try {
            const formData = new FormData(contactForm);
            const web3Response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const web3Data = await web3Response.json();

            try {
                const telegramText = `📩 New Message from TechNews\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`;
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: telegramText
                    })
                });
            } catch (telegramError) {
                console.log("Telegram error (ignored):", telegramError);
            }

            if (web3Data.success) {
                window.location.href = "thank-you.html";
            } else {
                alert("❌ " + (web3Data.message || "Something went wrong."));
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        } catch (error) {
            alert("❌ Network error. Please try again.");
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

/* ===== Language (persist across pages) ===== */
const langButtons = document.querySelectorAll(".lang-btn");

function setLanguage(lang) {
    if (lang !== "kh" && lang !== "en") lang = "en";

    document.querySelectorAll("[data-en]").forEach((el) => {
        const text = lang === "kh" ? el.getAttribute("data-kh") : el.getAttribute("data-en");
        if (text) el.textContent = text;
    });

    document.querySelectorAll("[data-en-placeholder]").forEach((el) => {
        const placeholder = lang === "kh" ? el.getAttribute("data-kh-placeholder") : el.getAttribute("data-en-placeholder");
        if (placeholder) el.setAttribute("placeholder", placeholder);
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
        const isSelected = btn.getAttribute("data-lang") === lang;
        btn.classList.toggle("active", isSelected);
        btn.setAttribute("aria-pressed", String(isSelected));
    });

    localStorage.setItem("techpulse-lang", lang);
    document.documentElement.lang = lang === "kh" ? "km" : "en";
}

const savedLang = localStorage.getItem("techpulse-lang") || "en";
setLanguage(savedLang);

langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        setLanguage(btn.getAttribute("data-lang"));
    });
});

/* ===== Category filter ===== */
const categoryFilterButtons = document.querySelectorAll(".filter-btn");
const filterableCards = document.querySelectorAll("[data-category]");

categoryFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        categoryFilterButtons.forEach((btn) =>
            btn.classList.toggle("active", btn === button)
        );

        filterableCards.forEach((card) => {
            const parentCol = card.closest(".col-md-6, .col-lg-4, .col-lg-3, .col-lg-6") || card;
            const shouldHide = filter !== "all" && card.dataset.category !== filter;
            parentCol.style.display = shouldHide ? "none" : "";
        });
    });
});

/* ===== Bookmarks ===== */
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

/* ===== Reading mode ===== */
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

/* ===== Click whole news card ===== */
document.querySelectorAll(".news-card").forEach((card) => {
    const href = card.dataset.href || (card.querySelector("a[href]") && card.querySelector("a[href]").getAttribute("href"));
    if (!href) return;
    card.style.cursor = "pointer";
    card.addEventListener("click", (event) => {
        if (event.target.closest(".bookmark-btn") || event.target.closest("a")) {
            return;
        }
        window.location.href = href;
    });
});

/* ===== Active navbar link ===== */
(function autoActiveNavbar() {
    const currentPath = decodeURIComponent(window.location.pathname.split("/").pop() || "index.html");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    const homeNames = ["", "index.html", "home page.html", "homepage.html", "home-page.html"];
    const newsNames = ["news.html", "news-page.html"];
    const categoryNames = ["categories.html", "categories-page.html"];
    const blogNames = ["blog.html"];
    const contactNames = ["contact.html", "contact-page.html"];

    let activePage = "";

    if (homeNames.includes(currentPath)) {
        activePage = "index";
    } else if (newsNames.includes(currentPath) || currentPath === "article.html") {
        activePage = "news";
    } else if (categoryNames.includes(currentPath)) {
        activePage = "categories";
    } else if (blogNames.includes(currentPath)) {
        activePage = "blog";
    } else if (contactNames.includes(currentPath)) {
        activePage = "contact";
    }

    navLinks.forEach((link) => {
        if (link.dataset.page === activePage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
})();