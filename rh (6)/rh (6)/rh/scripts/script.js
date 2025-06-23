const SLIDER = document.querySelector('.slider');
const SLIDE = document.querySelectorAll('.slide');
const DOTS = document.querySelectorAll('.dot');
let active_slide = 0;
let timer = setSliderInterval();
let timeout;
let start;

SLIDER.addEventListener('mouseenter', function() {
    // console.log('mouseenter');
    clearTimeout(timeout);
    clearInterval(timer);
});

SLIDER.addEventListener('mouseleave', function() {
    // console.log('mouseLeave');
    clearTimeout(timeout);
    clearInterval(timer);
    setSliderTimeout();
});

[...DOTS].forEach((dot, index) => {
    dot.addEventListener('click', function() {
        clearTimeout(timeout);
        clearInterval(timer);

        // console.log('🔥🔥 interval', timer);

        active_slide = index;
        changeDot();
        changeSlide();

        setSliderTimeout();
    })
});

function changeDot() {
    [...DOTS].forEach((dot, index) => {
        index === active_slide ? dot.classList.add('active') : dot.classList.remove('active');
    });
}

function changeSlide() {
    [...SLIDE].forEach((slide, idx) => {
        if (slide.classList.contains('prev')) slide.classList.remove('prev');
        if (slide.classList.contains('next')) slide.classList.remove('next');

        if (idx < active_slide) {
            slide.classList.add('prev');
        } else if (idx > active_slide) {
            slide.classList.add('next');
        }
    })
}

function setSliderTimeout() {
    // console.log('🔥🔥 timeout', timeout);
    timeout = setTimeout(() => timer = setSliderInterval(), 2000);
}

function setSliderInterval() {
    return setInterval(() => {
        active_slide === (SLIDE.length - 1) ? active_slide = 0 : active_slide += 1;
        changeDot();
        changeSlide();
    }, 2000);
}

SLIDER.addEventListener('touchstart', (evt) => {
    clearTimeout();
    start = evt.changedTouches[0].client;;
})

SLIDER.addEventListener('touchend', (evt) => {
    const delta = start - evt.changedTouches[0].client;

    if (delta < 0) {
        if (active_slide) {
            active_slide -= 1;
            changeDot();
            changeSlide();
            timer = setSliderInterval();
        };
    } else {
        if (active_slide < SLIDE.length - 1) {
            active_slide += 1;
            changeDot();
            changeSlide();
            timer = setSliderInterval();
        }
    }
})