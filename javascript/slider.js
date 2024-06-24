const slides = document.querySelectorAll('.slide');  //: Selects all elements with the class .slide and stores them in a NodeList
const leftArrow = document.getElementById('left-arrow');  //Selects the element with the ID left-arrow
const rightArrow = document.getElementById('right-arrow'); //Selects the element with the ID right-arrow 
let currentIndex = 0;  // Initializes the current slide index to 0
let slideInterval; //Declares a variable to store the interval ID for the automatic slideshow.

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  document.querySelector('.slider').style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

function startSlideShow() {
  slideInterval = setInterval(nextSlide, 10000);
}

function stopSlideShow() {
  clearInterval(slideInterval);
}

leftArrow.addEventListener('click', () => {
  stopSlideShow();
  prevSlide();
  startSlideShow();
});

rightArrow.addEventListener('click', () => {
  stopSlideShow();
  nextSlide();
  startSlideShow();
});

document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentIndex);
  startSlideShow();
});
