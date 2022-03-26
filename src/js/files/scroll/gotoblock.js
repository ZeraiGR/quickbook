// Подключение функционала "Чертогов Фрилансера"
import { isMobile, menuClose, getHash, FLS } from '../functions.js';
// Подключение дополнения для увеличения возможностей
// Документация: https://github.com/cferdinandi/smooth-scroll
import SmoothScroll from 'smooth-scroll';
//==============================================================================================================================================================================================================================================================================================================================

// Модуль плавной проктутки к блоку
export let gotoBlock = (
    targetBlock,
    noHeader = false,
    speed = 500,
    offset = 0
) => {
    const targetBlockElement = document.querySelector(targetBlock);
    if (targetBlockElement) {
        let headerItem = '';
        let headerItemHeight = 0;
        if (noHeader) {
            headerItem = 'header.header';
            headerItemHeight = document.querySelector(headerItem).offsetHeight;
        }
        let options = {
            speedAsDuration: true,
            speed: speed,
            header: headerItem,
            offset: offset,
            easing: 'easeOutQuad',
        };
        // Закрываем меню, если оно открыто
        document.documentElement.classList.contains('menu-open')
            ? menuClose()
            : null;

        if (typeof SmoothScroll !== 'undefined') {
            // Прокрутка с использованием дополнения
            new SmoothScroll().animateScroll(targetBlockElement, '', options);
        } else {
            // Прокрутка стандартными средствами
            let targetBlockElementPosition =
                targetBlockElement.getBoundingClientRect().top + scrollY;
            window.scrollTo({
                top: headerItemHeight
                    ? targetBlockElementPosition - headerItemHeight
                    : targetBlockElementPosition,
                behavior: 'smooth',
            });
        }
        FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
    } else {
        FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
    }
};

const animItems = document.querySelectorAll('.anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 1;
            let animItemPoint = '';

            if (animItem.classList.contains('counter__display')) {
                animItemPoint = window.innerHeight - animItemHeight / animStart;
            } else {
                animItemPoint =
                    window.innerHeight / 1.2 - animItemHeight / animStart;
            }

            if (animItemHeight > window.innerHeight) {
                animItemPoint =
                    window.innerHeight - window.innerHeight / animStart;
            }

            if (
                scrollY > animItemOffset - animItemPoint &&
                scrollY < animItemOffset + animItemHeight
            ) {
                animItem.classList.add('active');
            } else {
                if (!animItem.classList.contains('anim-no-hide')) {
                    animItem.classList.remove('active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft =
                window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);
}
