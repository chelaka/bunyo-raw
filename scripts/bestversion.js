// Variables
let bestSlides = document.querySelectorAll(
  ".best-version-section .slides .slide"
);
let bestThumbs = document.querySelectorAll(
  ".best-version-section .labels .label"
);
let totalBestSlides = bestSlides.length;
let bestSlidePosition = 0;

startAutoPlay();

function startAutoPlay(immediate) {
  if (immediate != null) {
    immediate = false;
  }

  if (immediate) {
    gotoNextSlide();
  }
  TweenLite.delayedCall(4, play);
}

function stopAutoPlay() {
  isAutoPlay = false;
  TweenLite.killDelayedCallsTo(play);
}

function gotoNextSlide() {
  var slideToGo = bestSlidePosition + 1;
  if (slideToGo >= totalBestSlides) {
    slideToGo = 0;
  }
  stopAutoPlay();
  gotoSlide(slideToGo, 1, "next");
}

function play() {
  gotoNextSlide();
  TweenLite.delayedCall(4, play);
}

// Update Position
function updatePosition() {
  //   Images
  for (let slide of bestSlides) {
    slide.classList.remove("visible");
    slide.classList.add("hidden");
  }
  bestSlides[bestSlidePosition].classList.remove("hidden");
  bestSlides[bestSlidePosition].classList.add("visible");
  //   Dots
  for (let thumb of bestThumbs) {
    thumb.className = thumb.className.replace(" active", "");
  }
  bestThumbs[bestSlidePosition].classList.add("active");
}

// Dot Position
bestThumbs.forEach((thumb, thumbPosition) => {
  thumb.addEventListener("click", () => {
    bestSlidePosition = thumbPosition;
    updatePosition(thumbPosition);
  });
});
