// Variables
let tSlides = document.querySelectorAll(
  ".testimonial-slider .t-slides .t-slide"
);
let thumbs = document.querySelectorAll(
  ".testimonial-slider .t-slide-thumbs .thumb"
);
let totalSlides = tSlides.length;
let slidePosition = 0;

// Update Position
function updatePosition(slidePosition) {
  //   Images
  tSlides.forEach((slide, slidePosition) => {
    slide.classList.remove("visible");
    slide.classList.add("hidden");
  });

  tSlides[slidePosition].classList.remove("hidden");
  tSlides[slidePosition].classList.add("visible");
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
