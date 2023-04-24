// Variables
let slides = document.querySelectorAll(".testimonial-slider .slides .slide");
let thumbs = document.querySelectorAll(
  ".testimonial-slider .slide-thumbs .thumb"
);
let totalSlides = slides.length;
let slidePosition = 0;

// Update Position
function updatePosition() {
  //   Images
  for (let slide of slides) {
    slide.classList.remove("visible");
    slide.classList.add("hidden");
  }
  slides[slidePosition].classList.remove("hidden");
  slides[slidePosition].classList.add("visible");
  //   Dots
  for (let thumb of thumbs) {
    thumb.className = thumb.className.replace(" active", "");
  }
  thumbs[slidePosition].classList.add("active");
}

// Dot Position
thumbs.forEach((thumb, thumbPosition) => {
  thumb.addEventListener("click", () => {
    slidePosition = thumbPosition;
    updatePosition(thumbPosition);
  });
});
