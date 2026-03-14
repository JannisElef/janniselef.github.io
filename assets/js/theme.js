
// Hol das Theme Toggle Checkbox-Element
const toggle = document.getElementById("themeToggle");

// Setzt das Theme (light / dark)
function applyTheme(theme) {
    document.body.className = theme;        // Body-Klasse: light oder dark
    localStorage.setItem("theme", theme);   // Speichert Auswahl
    toggle.checked = (theme === "dark");    // Checkbox Sync
}

// Systemvorgabe erkennen
function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Theme beim Laden
function loadTheme() {
    const saved = localStorage.getItem("theme");
    if(saved){
        applyTheme(saved);
    } else {
        applyTheme(systemTheme());
    }
}

// Event Listener für Toggle
toggle.addEventListener("change", () => {
    applyTheme(toggle.checked ? "dark" : "light");
});

// Initial
loadTheme();