
const toggle = document.getElementById("themeToggle");

const themeColors = {
  light: 0xf1f1f1,
  dark: 0x161b22
};

function getCurrentThemeColor() {
  return themeColors[document.body.className] || themeColors.light;
}

function applyTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);

  toggle.checked = (theme === "dark");
}

function systemTheme() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function loadTheme() {
  let saved = localStorage.getItem("theme");

  if (saved) {
    applyTheme(saved);
  } else {
    applyTheme(systemTheme());
  }
}

toggle.addEventListener("change", () => {
  applyTheme(toggle.checked ? "dark" : "light");
});

loadTheme();