let page = document.querySelector('.page');
let themeButton = document.querySelector('.theme-button');
themeButton.onclick = function () {
    page.classList.toggle('dark-theme');
};

document.addEventListener("scroll", function () {
    const header = document.querySelector(".page-header");
    const scrollLimit = 600; // Укажите ограничение по скроллу (в пикселях)

    if (window.scrollY > scrollLimit) {
        header.style.position = "absolute"; // Перестает быть "sticky"
        header.style.top = `${scrollLimit}px`;
    } else {
        header.style.position = "sticky"; // Возвращается к "sticky"
        header.style.top = "0";
    }
});
