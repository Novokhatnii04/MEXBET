const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
const titleInfos = document.querySelectorAll('.title-info');
const slidesNumber = slides.length;

let currentSlide = 0;

const createDots = (() => {
    slides.forEach(function (_, index) {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="dots__dot" data-slide="${index}"></button>`
        );
    });
})();

const activateCurrentDot = (slide) => {
    document
        .querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
    titleInfos.forEach((info, index) => {
        if (index === slide) {
            info.classList.add('active')
        } else {
            info.classList.remove('active')
        }
    });
};

activateCurrentDot(0);

const moveToSlide = (slide) => {
    slides.forEach(
        (s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`)
    );
};

moveToSlide(0);

const nextSlide = () => {
    currentSlide = (currentSlide + 1) % slidesNumber;
    moveToSlide(currentSlide);
    activateCurrentDot(currentSlide);
    titleInfos.forEach((info, index) => {
        if (index === currentSlide) {
            info.style.opacity = '1';
        } else {
            info.style.opacity = '0';
        }
    });
};

dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
        const slide = e.target.dataset.slide;
        currentSlide = parseInt(slide)
        moveToSlide(slide);
        activateCurrentDot(slide);

        titleInfos.forEach((info, index) => {
            if (index === currentSlide) {
                info.style.opacity = '1';
            } else {
                info.style.opacity = '0';
            }
        });
    }
});

setInterval(nextSlide, 5000);
