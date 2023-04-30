// Variables
let cPages = document.querySelectorAll(
  ".configurator .c-step-configs .c-step-config"
);
let cthumbs = document.querySelectorAll(
  ".configurator .c-steps-thumbs .c-steps-thumb"
);
let totalPages = cPages.length;
let pagePosition = 0;

// Update Position
function updatePosition(pagePosition) {
  //   Images
  cPages.forEach((slide, pagePosition) => {
    slide.classList.remove("active");
    slide.classList.add("hidden");
  });

  cPages[pagePosition].classList.remove("hidden");
  cPages[pagePosition].classList.add("active");
  //   Dots
  for (let thumb of cthumbs) {
    thumb.className = thumb.className.replace(" active", "");
  }
  cthumbs[pagePosition].classList.add("active");
}

// Dot Position
cthumbs.forEach((thumb, thumbPosition) => {
  thumb.addEventListener("click", () => {
    pagePosition = thumbPosition;
    updatePosition(thumbPosition);
  });
});
