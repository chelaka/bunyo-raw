window.addEventListener("load", function () {
  const officeBtn = document.getElementById("office-flow-btn");
  const homeBtn = document.getElementById("home-flow-btn");
  const miniFlowSelector = document.getElementById("mini-flow-selector");
  const miniOfficeBtn = document.getElementById("mini-office-selector");
  const miniHomeBtn = document.getElementById("mini-home-selector");
  const flowSection = document.getElementById("flow-content");
  const flowImages = document.querySelectorAll(".flow-content img");
  const switcherText = document.querySelector(".switcher .description");
  var selectedFlow = "";
  var isLoadingAnimationEnd = false;
  const images = document.querySelectorAll("img");
  const imgLoad = imagesLoaded(images);
  let isLoaded = false;

  locoScroll = window.locoScroll;

  let miniAnim = gsap.timeline({ paused: true, overwrite: "auto" });
  miniAnim.fromTo(
    ".mini-flow-selector",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      ease: "power3.inOut",
    }
  );
  // Create a new instance of URLSearchParams using the current URL
  const urlParams = new URLSearchParams(window.location.search);

  // Get the value of the "flow" parameter from the URL
  const flowParam = urlParams.get("flow");

  // Check if the "flow" parameter is set to "home"
  if (flowParam === "home") {
    // Code to execute if "flow" parameter is set to "home"
    setflow("home");
  } else {
    // Default code to execute if "flow" parameter is not set or is set to "office"
    setflow("office");
  }

  function setflow(selectedFlow) {
    if (selectedFlow == "office") {
      setOfficeFlow();
    } else {
      if (selectedFlow == "home") {
        setHomeFlow();
      }
    }
  }

  // Attach event listeners to the buttons
  officeBtn.addEventListener("click", function () {
    if (selectedFlow !== "office") {
      switchFlow("office");
    }
  });

  homeBtn.addEventListener("click", function () {
    if (selectedFlow !== "home") {
      switchFlow("home");
    }
  });

  miniOfficeBtn.addEventListener("click", function () {
    if (selectedFlow !== "office") {
      switchFlow("office");
    }
  });

  miniHomeBtn.addEventListener("click", function () {
    if (selectedFlow !== "home") {
      switchFlow("home");
    }
  });

  function setOfficeFlow() {
    officeBtn.classList.add("active");
    homeBtn.classList.remove("active");
    miniOfficeBtn.classList.add("active");
    miniHomeBtn.classList.remove("active");
    flowSection.classList.add("office-flow");
    flowSection.classList.remove("home-flow");
    selectedFlow = "office";

    const url = new URL(window.location.href);
    url.searchParams.set("flow", "office");
    history.pushState(null, null, url);

    flowImages.forEach((item, index) => {
      if (item.dataset.officeSrc) {
        item.src = item.dataset.officeSrc;
      }
    });
  }

  function setHomeFlow() {
    homeBtn.classList.add("active");
    officeBtn.classList.remove("active");
    miniHomeBtn.classList.add("active");
    miniOfficeBtn.classList.remove("active");
    flowSection.classList.add("home-flow");
    flowSection.classList.remove("office-flow");
    selectedFlow = "home";

    const url = new URL(window.location.href);
    url.searchParams.set("flow", "home");
    history.pushState(null, null, url);

    flowImages.forEach((item, index) => {
      if (item.dataset.homeSrc) {
        item.src = item.dataset.homeSrc;
      }
    });
  }

  function switchFlow(flow) {
    if (flow == "office") {
      loadingAnimation("office");
    }
    if (flow == "home") {
      loadingAnimation("home");
    }
  }

  function scrollDown() {
    locoScroll.scrollTo(".flow-content .image-section", {
      duration: 0,
      disableLerp: true,
      offset: -80,
      callback: function () {
        locoScroll.scrollTo("#img-7", {
          duration: 800,
          ease: "power1.inOut",
        });
      },
    });
  }

  //page loader
  gsap.set(".switcher", {
    yPercent: 100,
  });

  const loadingAnimation = (text) => {
    if (text == "office") {
      switcherText.innerHTML = "For The Office";
    }
    if (text == "home") {
      switcherText.innerHTML = "For The Home";
    }
    const tl = gsap
      .timeline({
        onComplete: () => {
          isLoadingAnimationEnd = true;
          setflow(text);
          scrollDown();
          if (isLoaded) entranceAnimation();
        },
      })
      .fromTo(
        ".switcher",
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: 0.5,
          ease: "power2.inOut",
        }
      )
      .fromTo(
        ".switcher .content",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.1"
      );
  };

  const entranceAnimation = () => {
    const tl = gsap.timeline({});
    tl.to(
      ".switcher .content",
      {
        y: -100,
        duration: 0.7,
        ease: "power1.inOut",
      },
      "-=0.01"
    ).to(
      ".switcher",
      {
        yPercent: -100,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "<"
    );
  };

  imgLoad.on("always", function () {
    isLoaded = true;
    if (isLoadingAnimationEnd) entranceAnimation();
  });

  //show mini flow selector
  locoScroll.on("scroll", (instance) => {
    // get the current scroll position
    const scrollY = instance.scroll.y;

    // check if the scroll position is greater than the threshold
    if (scrollY > 1400) {
      miniAnim.play().timeScale(1);
    } else {
      miniAnim.play().timeScale(-2);
    }
  });
});
