window.addEventListener("load", function () {
  // make follower follow - implified with quickTo
  gsap.set(".cursor-follower", { xPercent: -50, yPercent: -50 });

  let xTo = gsap.quickTo(".cursor-follower", "x", {
      duration: 0.3,
      ease: "power3",
    }),
    yTo = gsap.quickTo(".cursor-follower", "y", {
      duration: 0.3,
      ease: "power3",
    });

  window.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  //animate when passing over relevant objects
  //   var followerText = document.querySelector(".cursor-follower-content");
  let followerAnim = gsap.timeline({ paused: true, overwrite: "auto" });

  followerAnim.to(
    ".cursor-follower-inner-bottom",
    {
      width: "4rem",
      height: "4rem",
      backgroundColor: "#FFF",
      duration: 0.1,
    },
    0
  );
  followerAnim.to(
    ".cursor-follower-content",
    {
      scale: 0.9,
      duration: 0.1,
    },
    "<-=0.1"
  );

  document.querySelectorAll(".cursor-hover").forEach((item) => {
    item.addEventListener("mouseenter", (event) => {
      //   var text = item.dataset.follower;
      //   if (text == 0) {
      //     text = "Click";
      //   }
      //   followerText.innerHTML = text;
      animateFollower("in");
    });

    item.addEventListener("mouseleave", (event) => {
      animateFollower("out");
    });
  });

  function animateFollower(direction = "in") {
    if (direction == "in") {
      followerAnim.play().timeScale(1);
    } else {
      followerAnim.timeScale(-2);
    }
  }
});
