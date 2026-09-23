/* ============================================================
   1. DARK MODE
   ============================================================ */
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


/* ============================================================
   2. CONTACT FORM
   ============================================================ */
function handleContactSubmit(event) {
    event.preventDefault();
    alert("Thanks for reaching out! Your message has been received.");
    event.target.reset();
    return false;
}


/* ============================================================
   3. LANGUAGE TOGGLE (EN / KH)
   ============================================================ */
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


/* ============================================================
   4. CATEGORY FILTER
   ============================================================ */
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


/* ============================================================
   5. BOOKMARKS
   ============================================================ */
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


/* ============================================================
   6. READING MODE
   ============================================================ */
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


/* ============================================================
   7. CLICKABLE CARD (ចុចលើកាតទាំងមូលដើម្បីទៅទំព័រអត្ថបទ)
   ============================================================ */
document.querySelectorAll(".news-card").forEach((card) => {
    const link = card.querySelector("a[href*='article.html']");
    if (!link) return;

    card.style.cursor = "pointer";

    card.addEventListener("click", (event) => {
        // ប្រសិនបើចុចលើ bookmark ឬតំណ មិនត្រូវធ្វើអ្វី
        if (event.target.closest(".bookmark-btn") || event.target.tagName === "A") {
            return;
        }
        window.location.href = link.href;
    });
});
/* ============================================================
   8. AUTO ACTIVE NAVBAR
   ដាក់ active លើ Navbar ដោយស្វ័យប្រវត្តិ តាមទំព័រដែលកំពុងមើល
   ============================================================ */
(function autoActiveNavbar() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    // កំណត់ Navbar ណាដែលត្រូវ active តាមទំព័រ
    let activePage = "";

    if (currentPath === "" || currentPath === "index.html") {
        activePage = "index";
    } else if (currentPath === "news.html") {
        activePage = "news";
    } else if (currentPath === "article.html") {
        // Article Page → News ជា active
        activePage = "news";
    } else if (currentPath === "categories.html") {
        activePage = "categories";
    } else if (currentPath === "blog.html") {
        activePage = "blog";
    } else if (currentPath === "contact.html") {
        activePage = "contact";
    }

    // ដាក់ active លើ Navbar ដែលត្រូវគ្នា
    navLinks.forEach((link) => {
        if (link.dataset.page === activePage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
})();