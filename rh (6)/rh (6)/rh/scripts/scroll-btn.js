const SCROLL_BTN = document.getElementById('scrollTopBtn');
const HEADER = document.querySelector('.header');
const ANCIENT_LINK = document.querySelector('.ancient-link');
const ANCIENT_BLOCK = document.querySelector('.ancient');
const HEADER_HEIGHT = 118;

SCROLL_BTN.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', function() {
    window.scrollY > 0 ? HEADER.classList.add('sticky') : HEADER.classList.remove('sticky');

    if (window.scrollY >= 500) {
        SCROLL_BTN.classList.remove('hidden')
    } else {
        if (!SCROLL_BTN.classList.contains('hidden')) SCROLL_BTN.classList.add('hidden');
    }
})

ANCIENT_LINK.addEventListener('click', function() {
    window.scrollTo({
        top: ANCIENT_BLOCK.offsetTop - HEADER_HEIGHT,
        left: 0,
        behavior: 'smooth'
    })
})