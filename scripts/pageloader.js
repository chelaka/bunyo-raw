window.addEventListener("load", function () {
  const images = document.querySelectorAll("img");
  let isLoaded = false;
  let isLoadingAnimationEnd = false;
  const imgLoad = imagesLoaded(images);
  let revealText = document.querySelectorAll(".reveal-text");

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

  // const textTimeline = gsap.timeline();
  // revealText.forEach((element) => {
  //   const lines = element.querySelectorAll(".words");
  //   textTimeline.set(element, { autoAlpha: 1 });
  //   textTimeline.fromTo(
  //     lines,
  //     {
  //       yPercent: 100,
  //     },
  //     {
  //       yPercent: 0,
  //       ease: Power3.out,
  //       stagger: 0.15,
  //       duration: 0.75,
  //     }
  //   );
  // });

  gsap.registerPlugin(ScrollTrigger);

  const entranceAnimation = () => {
    const tl = gsap.timeline({});
    tl.to(".logo", {
      y: -100,
      duration: 0.6,
      ease: "power3.inOut",
    })
      .to(
        ".loader",
        {
          yPercent: -100,
          duration: 1,
          ease: "power3.inOut",
        },
        0
      )
      .fromTo(
        ".line .words",
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          ease: "power1.inOut",
          stagger: 0,
          duration: 0.9,
        },
        "<+=0.2"
      )
      .fromTo(
        ".hero-background",

        { backgroundSize: "130%" },
        { backgroundSize: "100%", duration: 1.25, ease: "power2.inOut" },
        "<-=0.25"
      )
      .fromTo(
        ".hero-note",
        {
          opacity: 0,
        },
        { opacity: 1, duration: 0.75, ease: "power1.inOut" },
        "-=0.5"
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
      .fromTo(
        ".logo",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        0
      );
  };

  loadingAnimation();

  imgLoad.on("always", function () {
    isLoaded = true;
    if (isLoadingAnimationEnd) entranceAnimation();
  });
});
