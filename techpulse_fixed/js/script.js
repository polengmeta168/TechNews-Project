/* =====================================================
    TechNews — site-wide interactivity
   Sections in this file:
   1. Dark / Light mode toggle
   2. Contact form handler
   3. Language toggle (EN / KH)
   4. Category filter (AI / DEV / GADGETS / SECURITY)
   5. Bookmarks / save for later
   6. Reading mode (article page)
   Each feature checks for its own elements first, so this
   single file is safe to include on every page.
   ===================================================== */

// ================= DARK / LIGHT MODE TOGGLE =================
// Dark Mode is the default. Light Mode is an optional alternate the visitor
// can switch on.

const darkModeBtn = document.getElementById("darkModeBtn");

function applyMode(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    if (darkModeBtn) {
        darkModeBtn.textContent = isDark ? "☀️" : "🌙";
    }
}

// Load saved preference (defaults to dark mode when nothing is saved)
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


// ================= CONTACT FORM =================

function handleContactSubmit(event) {
    event.preventDefault();
    alert("Thanks for reaching out! Your message has been received.");
    event.target.reset();
    return false;
}


// ================= LANGUAGE TOGGLE (EN / KH) =================
// Any element with data-en="..." and data-kh="..." will switch text on toggle.

const langButtons = document.querySelectorAll(".lang-btn");
const translatableEls = document.querySelectorAll("[data-en]");

function setLanguage(lang) {
    translatableEls.forEach((el) => {
        const text = lang === "kh" ? el.dataset.kh : el.dataset.en;
        if (text) el.textContent = text;
    });
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


// ================= CATEGORY FILTER (AI / DEV / GADGETS / SECURITY) =================
// Works on any page that has .filter-btn buttons + .news-card[data-category] cards.

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


// ================= BOOKMARKS / SAVE FOR LATER =================
// Adds a toggleable bookmark icon on every card with a data-id attribute.

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


// ================= READING MODE (article page) =================
// Toggles a larger, distraction-free font/width for reading articles.

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
