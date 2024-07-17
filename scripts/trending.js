let currentIndex = 0;

function moveLeft() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    if (currentIndex > 0) {
        currentIndex--;
        carousel.scrollBy(-items[0].clientWidth, 0);
    }
}

function moveRight() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    if (currentIndex < items.length - 1) {
        currentIndex++;
        carousel.scrollBy(items[0].clientWidth, 0);
    }
}
