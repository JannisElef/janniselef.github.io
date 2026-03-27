const toggleButton = document.getElementById("themeToggle");

function applyTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);

    toggleButton.textContent = theme === "dark" ? "☀️" : "🌙";
}

function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function loadTheme() {
    const saved = localStorage.getItem("theme");

    if (saved) {
        applyTheme(saved);
    } else {
        applyTheme(systemTheme());
    }
}

toggleButton.addEventListener("click", () => {
    const current = document.body.className;
    const newTheme = current === "dark" ? "light" : "dark";
    applyTheme(newTheme);
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
        applyTheme(e.matches ? "dark" : "light");
    }
});

loadTheme();