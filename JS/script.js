const darkModeBtn = document.getElementById("darkModeBtn");

function applyMode(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    // Icon is shown by CSS ::before — do not change textContent
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
    alert("Thanks for reaching out! Your message has been received.");
    event.target.reset();
    return false;
}

/* ===== Language (persist across pages) ===== */
const langButtons = document.querySelectorAll(".lang-btn");

function setLanguage(lang) {
    if (lang !== "kh" && lang !== "en") lang = "en";

    document.querySelectorAll("[data-en]").forEach((el) => {
        const text =
            lang === "kh"
                ? el.getAttribute("data-kh")
                : el.getAttribute("data-en");
        if (text) el.textContent = text;
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.classList.toggle(
            "active",
            btn.getAttribute("data-lang") === lang
        );
    });

    localStorage.setItem("techpulse-lang", lang);
    document.documentElement.lang = lang === "kh" ? "km" : "en";
}

// Always restore saved language on every page load
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
            const parentCol =
                card.closest(".col-md-6, .col-lg-4, .col-lg-3, .col-lg-6") ||
                card;
            const shouldHide =
                filter !== "all" && card.dataset.category !== filter;
            parentCol.style.display = shouldHide ? "none" : "";
        });
    });
});

/* ===== Bookmarks ===== */
const bookmarkButtons = document.querySelectorAll(".bookmark-btn");
const savedBookmarks = JSON.parse(
    localStorage.getItem("techpulse-bookmarks") || "[]"
);

function refreshBookmarkIcon(button) {
    const isSaved = savedBookmarks.includes(button.dataset.id);
    button.classList.toggle("active", isSaved);
    button.textContent = isSaved ? "🔖" : "📑";
    button.setAttribute(
        "aria-label",
        isSaved ? "Remove bookmark" : "Add bookmark"
    );
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
        localStorage.setItem(
            "techpulse-bookmarks",
            JSON.stringify(savedBookmarks)
        );
        refreshBookmarkIcon(button);
    });
});

/* ===== Reading mode ===== */
const readingModeBtn = document.getElementById("readingModeBtn");

if (readingModeBtn) {
    const savedReadingMode =
        localStorage.getItem("techpulse-reading-mode") === "on";
    document.body.classList.toggle("reading-mode", savedReadingMode);
    readingModeBtn.classList.toggle("active", savedReadingMode);

    readingModeBtn.addEventListener("click", () => {
        const isOn = document.body.classList.toggle("reading-mode");
        readingModeBtn.classList.toggle("active", isOn);
        localStorage.setItem(
            "techpulse-reading-mode",
            isOn ? "on" : "off"
        );
    });
}

/* ===== Click whole news card ===== */
document.querySelectorAll(".news-card").forEach((card) => {
    const href =
        card.dataset.href ||
        (card.querySelector("a[href]") &&
            card.querySelector("a[href]").getAttribute("href"));

    if (!href) return;

    card.style.cursor = "pointer";

    card.addEventListener("click", (event) => {
        if (
            event.target.closest(".bookmark-btn") ||
            event.target.closest("a")
        ) {
            return;
        }
        window.location.href = href;
    });
});

/* ===== Active navbar link ===== */
(function autoActiveNavbar() {
    const currentPath = decodeURIComponent(
        window.location.pathname.split("/").pop() || "index.html"
    );
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    const homeNames = [
        "",
        "index.html",
        "home page.html",
        "homepage.html",
        "home-page.html",
    ];
    const newsNames = ["news.html", "news-page.html"];
    const categoryNames = ["categories.html", "categories-page.html"];
    const blogNames = ["blog.html"];
    const contactNames = ["contact.html"];

    let activePage = "";

    if (homeNames.includes(currentPath)) {
        activePage = "index";
    } else if (
        newsNames.includes(currentPath) ||
        currentPath === "article.html"
    ) {
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