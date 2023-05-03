window.addEventListener("load", function () {
  // Variables
  let configurator = document.querySelector(".configurator");
  let configuratorRight = document.querySelector(".configurator .right");
  let cPages = document.querySelectorAll(
    ".configurator .c-step-configs .c-step-config"
  );
  let cthumbs = document.querySelectorAll(
    ".configurator .c-steps-thumbs .c-steps-thumb"
  );
  let cForm = document.getElementById("config-form");
  let hideAccessories = document.getElementById("go-to-accessories");

  let totalPages = cPages.length;
  let pagePosition = 0;

  //default product config
  var selectedConfig = {
    productConfig: {},
    accessoriesConfig: {},
  };

  locoScroll = window.locoScroll;

  //mini confgi
  var miniConfig = document.querySelector(".mini-product-image-wrapper");
  var isMiniConfigVisible = false;
  gsap.set(miniConfig, { x: -400 });

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
      updateForm();
    });
  });

  //next button
  let nextbtn = document.getElementById("form-btn");
  nextbtn.addEventListener("click", () => {
    if (pagePosition < cPages.length) {
      pagePosition++;
      updatePosition(pagePosition);
      updateForm();
      return false;
    } else {
      HTMLFormElement.prototype.submit.call(cForm);
    }
  });

  //update form on changes
  function updateForm() {
    //update button text
    updateButtontext();
    updateSummary();
  }

  function updateButtontext() {
    if (pagePosition < cPages.length - 1) {
      nextbtn.innerHTML = "Next Step";
    } else {
      nextbtn.innerHTML = "Order Now";
    }
  }

  //quantity selector
  let down = document.getElementById("minus");
  let up = document.getElementById("plus");
  let quantity = document.getElementById("quantity");

  down.addEventListener("click", function () {
    if (quantity.value > 1) {
      quantity.value--;
      updateForm();
    } else {
      down.classList.add("disabled");
      updateForm();
    }
  });

  up.addEventListener("click", function () {
    down.classList.remove("disabled");
    quantity.value++;
    updateForm();
  });

  //update the labels when an option is selected
  cConfigs = document.querySelectorAll(".configurator .config");

  cConfigs.forEach((config) => {
    const cOptions = config.querySelectorAll(":scope > .options input");
    const cOptionsChecked = config.querySelectorAll(
      ":scope > .options input:checked"
    );
    const cLabel = config.querySelector(":scope .title .label .selection");

    //update selections by default
    cOptionsChecked.forEach((option) => {
      hasValue = option.hasAttribute("value");
      if (hasValue) {
        selected = option.getAttribute("value");
      } else {
        selected = option.getAttribute("label");
      }
      cLabel.innerHTML = " " + selected;
    });

    cOptions.forEach((option) => {
      option.addEventListener("change", (event) => {
        //update selections on click
        hasValue = option.hasAttribute("value");
        if (hasValue) {
          selected = option.getAttribute("value");
        } else {
          selected = option.getAttribute("label");
        }
        cLabel.textContent = " " + selected;

        baseUrl = "assets/configurator/";

        //update the relative image
        hasImage = option.hasAttribute("data-image-url");
        if (hasImage) {
          imageUrl = option.getAttribute("data-image-url");
          fullUrl = baseUrl + imageUrl + ".png";
        } else {
          fullUrl = "";
        }

        clickedname = option.getAttribute("name");
        imagetoReplace = document.querySelector(
          ".product-image-wrapper ." + clickedname
        );
        miniImagetoReplace = document.querySelector(
          ".mini-product-image-wrapper ." + clickedname
        );

        imagetoReplace.src = fullUrl;
        miniImagetoReplace.src = fullUrl;

        var currentScroll = window.locoScroll.scroll.instance.scroll.y;
        var configuratorHeight = configuratorRight.clientHeight;

        var showMiniConfig = gsap.timeline({ paused: true });
        showMiniConfig
          .to(miniConfig, { x: 0, duration: 0.5, ease: "power2.inOut" })
          .add(function () {
            isMiniConfigVisible = true;
          }) // Slide in from the left
          .to(miniConfig, { duration: 3 }) // Pause for 3 seconds
          .to(miniConfig, { x: -400, duration: 0.5, ease: "power2.inOut" })
          .add(function () {
            isMiniConfigVisible = false;
          }); // Slide out to the left

        // check if the scroll position is greater than the threshold
        if (currentScroll > 100) {
          if (isMiniConfigVisible) {
          } else {
            //show miniconfig
            showMiniConfig.play();
          }
        }

        updateForm();
      });
    });
  });

  function updateSummary() {
    updateSelectedConfig();
    //update quantity
    var quantity = document.getElementById("quantity").value;
    let cartQuantity = document.getElementById("product-cart-quantity");
    let productSummarySection = document.getElementById(
      "options-picked-product"
    );
    let accessoriesSummarySection = document.getElementById(
      "options-picked-accessories"
    );
    cartQuantity.innerHTML = "x" + quantity;

    //update Product summary
    productSummarySection.innerHTML = " ";
    productArray = selectedConfig.productConfig;
    if (productArray) {
      for (var key in productArray) {
        if (productArray[key]) {
          productSummarySection.innerHTML +=
            '<div class="pick"><div class="label">' +
            key +
            ": " +
            '<span class="value">' +
            productArray[key] +
            '</span></div><div class="value">Free</div></div>';
        }
      }
    }

    //update Accessories summary
    accessoriesSummarySection.innerHTML = " ";
    accessoriesArray = selectedConfig.accessoriesConfig;
    let allNull = true;

    for (const key in accessoriesArray) {
      if (accessoriesArray[key] !== null) {
        allNull = false; // if any non-null value is found, set allNull to false and exit the loop
        break;
      }
    }

    if (allNull) {
      hideAccessories.classList.remove("hide-dom");
    } else {
      hideAccessories.classList.add("hide-dom");
      if (accessoriesArray) {
        for (var key in accessoriesArray) {
          if (accessoriesArray[key]) {
            accessoriesSummarySection.innerHTML +=
              '<div class="pick"><div class="label">' +
              key +
              ": " +
              '<span class="value">' +
              accessoriesArray[key] +
              '</span></div><div class="value">Free</div></div>';
          }
        }
      }
    }
  }

  function updateSelectedConfig() {
    productConfigs = document.querySelectorAll(
      ".configurator .config-product .config"
    );
    accessoryConfigs = document.querySelectorAll(
      ".configurator .config-accessories .config"
    );
    productConfigs.forEach((config) => {
      const pOptions = config.querySelectorAll(
        ":scope > .options input:checked"
      );

      pOptions.forEach((option) => {
        //update selections by default
        property = option.getAttribute("name");
        value = option.getAttribute("value");

        selectedConfig.productConfig[property] = value;
      });
    });

    accessoryConfigs.forEach((config) => {
      const aOptions = config.querySelectorAll(
        ":scope > .options input:checked"
      );

      aOptions.forEach((option) => {
        //update selections by default
        property = option.getAttribute("name");
        value = option.getAttribute("value");

        selectedConfig.accessoriesConfig[property] = value;
      });
    });
  }

  hideAccessories.addEventListener("click", function () {
    updatePosition(1);
  });

  updateForm();
  //load end
});
