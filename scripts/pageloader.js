window.addEventListener("load", function () {
  const images = document.querySelectorAll("img");
  let isLoaded = false;
  let isLoadingAnimationEnd = false;
  const imgLoad = imagesLoaded(images);

  let splitWords = function (selector) {
    var elements = document.querySelectorAll(selector);

    elements.forEach(function (el) {
      el.dataset.splitText = el.textContent;
      el.innerHTML = el.textContent
        .split(/\s/)
        .map(function (word) {
          return word
            .split("-")
            .map(function (word) {
              return '<span class="word">' + word + "</span>";
            })
            .join('<span class="hyphen">-</span>');
        })
        .join('<span class="whitespace"> </span>');
    });
  };

  let splitLines = function (selector) {
    var elements = document.querySelectorAll(selector);

    splitWords(selector);

    elements.forEach(function (el) {
      var lines = getLines(el);

      var wrappedLines = "";
      lines.forEach(function (wordsArr) {
        wrappedLines += '<span class="line"><span class="words">';
        wordsArr.forEach(function (word) {
          wrappedLines += word.outerHTML;
        });
        wrappedLines += "</span></span>";
      });
      el.innerHTML = wrappedLines;
    });
  };

  let getLines = function (el) {
    var lines = [];
    var line;
    var words = el.querySelectorAll("span");
    var lastTop;
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (word.offsetTop != lastTop) {
        // Don't start with whitespace
        if (!word.classList.contains("whitespace")) {
          lastTop = word.offsetTop;

          line = [];
          lines.push(line);
        }
      }
      line.push(word);
    }
    return lines;
  };

  splitLines(".reveal-text");
  gsap.registerPlugin(ScrollTrigger);

  const entranceAnimation = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        let revealText = document.querySelectorAll(".reveal-text");

        let revealLines = revealText.forEach((element) => {
          const lines = element.querySelectorAll(".words");

          let tlReveal = gsap.timeline();
          tlReveal.set(element, { autoAlpha: 1 });
          tlReveal.from(lines, 1, {
            yPercent: 100,
            ease: Power2.out,
            stagger: 0.1,
          });
        });
      },
    });
    tl.to(".logo", {
      y: -100,
      duration: 1,
      ease: "power2.inOut",
    })
      .to(
        ".loader",
        {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
        },
        0
      )
      .fromTo(
        ".hero",
        { backgroundSize: "125%" },
        { backgroundSize: "100%", duration: 1.4, ease: "power1.inOut" },
        "-=1.3"
      );
  };

  const loadingAnimation = () => {
    const tl = gsap
      .timeline({
        onComplete: () => {
          isLoadingAnimationEnd = true;
          if (isLoaded) entranceAnimation();
        },
      })
      // .from(".loader", {
      //   yPercent: 100,
      //   ease: "power3.inOut",
      //   duration: 1,
      // })
      .from(
        ".logo",
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power5.out",
        },
        0.5
      );
  };

  loadingAnimation();

  imgLoad.on("always", function () {
    isLoaded = true;
    if (isLoadingAnimationEnd) entranceAnimation();
  });
});
