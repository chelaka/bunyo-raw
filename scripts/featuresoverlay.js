window.addEventListener("load", function () {
  let isOverlayOpen = false;
  let slidePosition = 0;
  let navDots = [];

  dots = document.querySelector(".dots");
  prev = document.querySelector(".previous");
  next = document.querySelector(".next");
  overlay = document.querySelector(".feature-overlay");
  closebtn = document.querySelector(".feature-overlay .close-btn");
  tiles = document.querySelectorAll(".feature-tiles .tile");
  slides = document.querySelectorAll(".feature-overlay .slides .slide");

  prev.addEventListener("click", previousSlide);
  next.addEventListener("click", nextSlide);
  //add click listeners to tiles
  tiles.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      slidePosition = index;
      openOverlay(slidePosition);
      updateDot(slidePosition);
    });
  });

  //create dots
  for (let i = 0; i < slides.length; i++) {
    let newDot = document.createElement("div");
    newDot.className = "dot";
    newDot.index = i;
    navDots.push(newDot);
    newDot.addEventListener("click", (event) => goToSlide(i));
    dots.appendChild(newDot);
  }
  childdots = document.querySelectorAll(".dots .dot");

  //mark active dot
  function updateDot(slidePosition) {
    childdots[slidePosition].classList.add("active");
  }

  //close button
  closebtn.addEventListener("click", (event) => {
    overlay.classList.remove("open");
    clear();
  });

  //open overlay
  function openOverlay(slidePosition) {
    overlay.classList.add("open");
    slides[slidePosition].classList.add("visible");
    const tl = gsap.timeline({});
    tl.fromTo(
      ".feature-overlay .text-wrapper",
      {
        opacity: 0,
      },
      { opacity: 1, duration: 0.2, ease: "power1.inOut" }
    );
  }

  function clear() {
    childdots.forEach((item) => {
      item.classList.remove("active");
    });
    slides.forEach((item) => {
      item.classList.remove("visible");
    });
    const tl = gsap.timeline({});
    tl.fromTo(
      ".feature-overlay .text-wrapper",
      {
        opacity: 1,
      },
      { opacity: 0, duration: 0.2, ease: "power1.inOut" }
    );
  }

  //go to slide
  function goToSlide(newSlide) {
    clear();
    slides[newSlide].classList.add("visible");
    const tl = gsap.timeline({});
    tl.fromTo(
      ".feature-overlay .text-wrapper",
      {
        opacity: 0,
      },
      { opacity: 1, duration: 0.2, ease: "power1.inOut" }
    );
    updateDot(newSlide);
    slidePosition = newSlide;
  }

  function previousSlide() {
    slidePosition--;
    if (slidePosition < 0) {
      goToSlide(slides.length - 1);
    } else {
      goToSlide(slidePosition);
    }
  }

  function nextSlide() {
    slidePosition++;

    if (slidePosition > slides.length - 1) {
      goToSlide(0);
    } else {
      goToSlide(slidePosition);
    }
  }
});
