const themeSelect = document.getElementById("themeSelect");

function applyTheme(theme) {
    if (theme === "auto") {
        theme = systemTheme();
    }

    document.body.className = theme;
}

function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function loadTheme() {
    const saved = localStorage.getItem("theme") || "auto";
    themeSelect.value = saved;
    applyTheme(saved);
}

themeSelect.addEventListener("change", () => {
    const selected = themeSelect.value;
    localStorage.setItem("theme", selected);
    applyTheme(selected);
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (themeSelect.value === "auto") {
        applyTheme("auto");
    }
});

loadTheme();