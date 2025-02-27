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

const loadProjects = async (url, containerSelector) => {
    try {
        const response = await fetch(url);
        const projects = await response.json();
        const container = document.querySelector(containerSelector);
        container.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <a href="${project.link}" class="project-link" target="_blank">See Live</a>
                    ${project.source ? `<a href="${project.source}" class="project-link github" target="_blank"><i class="fab fa-github"></i> Source</a>` : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadProjects('./api/featured-projects.json', '.projects');
    loadProjects('./api/other-projects.json', '.projects.smaller-projects');
});