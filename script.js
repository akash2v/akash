// This script changes the mode of the page from light to dark and vice versa
let darkMode = localStorage.getItem("darkMode") || "true";
if (darkMode === "true") {
    let element = document.body;
    element.classList.add("dark-mode");
    document.querySelector("#themeToggle i").classList.replace("fa-moon", "fa-sun");
}
const darkModeToggle = document.querySelector("#themeToggle");
changeMode = () => {
    let element = document.body;
    element.classList.toggle("dark-mode");
    darkMode = (darkMode === "true") ? "false" : "true";
    localStorage.setItem("darkMode", darkMode);
    document.querySelector("#themeToggle i").classList.toggle("fa-moon");
    document.querySelector("#themeToggle i").classList.toggle("fa-sun");
}
darkModeToggle.addEventListener("click", changeMode);