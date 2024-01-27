window.addEventListener("load", function () {
  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-wrapper"),
    smooth: true,
    lerp: 0.05,
    smartphone: {
      smooth: true,
    },
    getDirection: true,
    reloadOnContextChange: true,
  });

  window.locoScroll = locoScroll;
});
