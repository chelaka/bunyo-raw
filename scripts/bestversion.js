// Variables
let bestSlides = document.querySelectorAll(
  ".best-version-section .b-slides .b-slide"
);
let bestThumbs = document.querySelectorAll(
  ".best-version-section .labels .label"
);
let totalBestSlides = bestSlides.length;
let bestSlidePosition = 0;
let currentInterval;

// Update Position
function updateBestPosition(slidePosition) {
  //   Images
  bestSlides.forEach((slide, slidePosition) => {
    slide.classList.remove("visible");
    slide.classList.add("hidden");
  });

  bestSlides[slidePosition].classList.remove("hidden");
  bestSlides[slidePosition].classList.add("visible");
  //   Dots

  for (let thumb of bestThumbs) {
    thumb.className = thumb.className.replace(" active", "");
  }
  bestThumbs[slidePosition].classList.add("active");
}

// Dot Position
bestThumbs.forEach((thumb, thumbPosition) => {
  thumb.addEventListener("click", () => {
    clearInterval(currentInterval);
    const intervalClick = setInterval(function () {
      nextSlide();
    }, 10000);
    currentInterval = intervalClick;
    bestSlidePosition = thumbPosition;
    updateBestPosition(thumbPosition);
  });
});

function nextSlide() {
  if (bestSlidePosition < bestSlides.length - 1) {
    bestSlidePosition++;
  } else {
    bestSlidePosition = 0;
  }
  updateBestPosition(bestSlidePosition);
}

const interval = setInterval(function () {
  nextSlide();
}, 10000);

currentInterval = interval;
