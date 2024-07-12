const swiper = new Swiper(".feedback-slider", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    loop: true,

    autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnIteraction: false,
    },
});
