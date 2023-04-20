gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-wrapper"),
  smooth: true,
  lerp: 0.04,
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// ScrollTrigger.create({
//   trigger: ".image-mask",
//   scroller: ".smooth-wrapper",
//   // start: "top+=30% 50%",
//   // end: "bottom-=40% 50%",
//   animation: gsap.from(".image-mask", { backgroundSize: "120%" }),
//   // scrub: 2,
//   // markers: true
// });
