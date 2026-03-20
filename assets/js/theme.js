
const toggle = document.getElementById("themeToggle");

function applyTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
    toggle.checked = (theme === "dark");
}

function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function loadTheme() {
    const saved = localStorage.getItem("theme");
    if(saved){
        applyTheme(saved);
    } else {
        applyTheme(systemTheme());
    }
}

toggle.addEventListener("change", () => {
    applyTheme(toggle.checked ? "dark" : "light");
});

loadTheme();