const carousel = document.querySelector(".cards-objectives");
const cards = document.querySelectorAll(".cards-objectives .card");

let currentIndex = 0;
let intervalId;

function startCarousel() {
    clearInterval(intervalId);
    if (window.innerWidth <= 500) {
        intervalId = setInterval(nextCard, 3000);
    }
}

function nextCard() {
    const cardWidth = cards[0].offsetWidth + 20;
    currentIndex = (currentIndex + 1) % cards.length;

    carousel.scrollTo({
        left: cardWidth * currentIndex,
        behavior: 'smooth'
    });
}


window.addEventListener("load", startCarousel);


window.addEventListener("resize", startCarousel);