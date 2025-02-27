// This script changes the mode of the page from light to dark and vice versa
let darkMode = localStorage.getItem("darkMode") || "false";
if (darkMode === "true") {
    let element = document.body;
    element.classList.add("dark-mode");
}
const darkModeToggle = document.querySelector("#themeToggle");
changeMode = () => {
    let element = document.body;
    element.classList.toggle("dark-mode");
    darkMode = (darkMode === "true") ? "false" : "true";
    localStorage.setItem("darkMode", darkMode);
}
darkModeToggle.addEventListener("click", changeMode);