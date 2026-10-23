const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

function setTheme(theme) {
    root.dataset.theme = theme;
    const isLight = theme === "light";
    themeToggle.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
    themeIcon.textContent = isLight ? "☾" : "☼";
}

let savedTheme = null;
try {
    savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
    console.warn("Could not read the saved theme preference.", error);
}

setTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark");

themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
        localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
        console.warn("Could not save the theme preference.", error);
    }
});

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    });
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;
        filterButtons.forEach((filterButton) => {
            const isActive = filterButton === button;
            filterButton.classList.toggle("is-active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        projectCards.forEach((card) => {
            const matches = selectedFilter === "all" || card.dataset.category === selectedFilter;
            card.classList.toggle("is-hidden", !matches);
        });
    });
});
