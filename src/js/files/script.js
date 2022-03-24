// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";

export function headerFixed() {
    const header = document.querySelector('.header'),
        windowHeight = document.documentElement.clientHeight,
        arrowTopBtn = document.querySelector('.arrow-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > windowHeight) {
            header.classList.add('fixed');
            arrowTopBtn.classList.add('active');
        } else {
            header.classList.remove('fixed');
            arrowTopBtn.classList.remove('active');
        }
    });
}
