document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    const scrolled = window.scrollY;
    const parallax = document.querySelector(".slantedDivA:after");
    parallax.style.transform = `skewY(-4deg) translateY(${scrolled * 0.5}px)`;
  });
});
