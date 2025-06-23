// const HERO_SLIDE = document.querySelector('.hero-slide');

(function() {
    const SLIDER = document.querySelector('.hero-wrapper');
    const SLIDES = document.querySelectorAll('.hero-slide');
    const DOTS = document.querySelectorAll('.hero-slider-dot');
    const prevButton = document.querySelector('.hero-arrow-prev');
    const nextButton = document.querySelector('.hero-arrow-next');
    const lastSlide = SLIDES.length - 1;
    let active_hero = 0;
    let timer = setSliderInterval();
    let timeout;
    let startX;

    DOTS.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearTimers();

            active_hero = index;
            changeDot();
            changeSlide();

            setSlideTimeout();
        })
    });

    function changeDot() {
        DOTS.forEach((dot, index) => {
            index === active_hero ? dot.classList.add('active') : dot.classList.remove('active');
        });
    }

    function changeSlide() {
        SLIDES.forEach((slide, idx) => {
            if (slide.classList.contains('prev')) slide.classList.remove('prev');
            if (slide.classList.contains('next')) slide.classList.remove('next');

            if (idx < active_hero) {
                slide.classList.add('prev');
            } else if (idx > active_hero) {
                slide.classList.add('next');
            }

            if (active_hero === lastSlide) {
                nextButton.classList.add('disabled');
                if (prevButton.classList.contains('disabled')) prevButton.classList.remove('disabled');
            } else if (active_hero === 0) {
                prevButton.classList.add('disabled');
                if (nextButton.classList.contains('disabled')) nextButton.classList.remove('disabled');
            } else {
                if (nextButton.classList.contains('disabled')) nextButton.classList.remove('disabled');
                if (prevButton.classList.contains('disabled')) prevButton.classList.remove('disabled');
            }
        })
    }

    function setSlideTimeout() {
        timeout = setTimeout(() => timer = setSliderInterval(), 2000);
    }

    function setSliderInterval() {
        return setInterval(() => {
            active_hero === (SLIDES.length - 1) ? active_hero = 0 : active_hero += 1;
            changeDot();
            changeSlide();
        }, 4000);
    }

    function clearTimers() {
        clearTimeout(timeout);
        clearInterval(timer);
    }

    nextButton.addEventListener('click', () => {
        if (active_hero !== lastSlide) {
            clearTimers();

            active_hero += 1;
            changeDot();
            changeSlide();
        }
    });

    prevButton.addEventListener('click', () => {
        if (active_hero > 0) {
            clearTimers();

            active_hero -= 1;
            changeDot();
            changeSlide();
        }
    });

    SLIDER.addEventListener('touchstart', (evt) => {
        clearTimers();
        startX = evt.changedTouches[0].clientX;
        // console.log('🔥 start >>> ', evt.changedTouches[0].clientX);
    })

    SLIDER.addEventListener('touchend', (evt) => {
        // console.log('🔥 end >>> ', evt.changedTouches[0].clientX);
        const deltaX = startX - evt.changedTouches[0].clientX;

        if (deltaX < 0) {
            if (active_hero) {
                active_hero -= 1;
                changeDot();
                changeSlide();
                timer = setSliderInterval();
            };
        } else {
            if (active_hero < SLIDES.length - 1) {
                active_hero += 1;
                changeDot();
                changeSlide();
                timer = setSliderInterval();
            }
        }
    })
})()
