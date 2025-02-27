// This script change mode of the page from light to dark and vice versa
changeMode = () => {
    let element = document.body;
    element.classList.toggle("dark-mode");
}

document.getElementById("themeToggle").addEventListener("click", changeMode);