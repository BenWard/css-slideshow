(function () {
  var SLIDE_SELECTOR = ".slideshow-slide";
  var SHOW_SLIDE_CLASS = "js-slideshow-visible";

  function removeClass (element, className) {
    var matchClassName = new RegExp("\\b" + className + "\\b", "g");
    element.className = element.className.replace(matchClassName, " ");
  }

  function addClass (element, className) {
    element.className += " " + className;
  }

  function advance (slideshow) {
    // Get the next slide, or go back to the start if we're at the end
    var currentSlide = slideshow.querySelector(".slideshow-slide.js-slideshow-visible");
    var nextSlide =
      currentSlide.nextElementSibling ||
      slideshow.querySelector(".slideshow-slide");

    removeClass(currentSlide, SHOW_SLIDE_CLASS);
    addClass(nextSlide, SHOW_SLIDE_CLASS);
  }

  function init () {
    var slideshows = document.body.querySelectorAll(".slideshow");
    var time;
    for (var i = 0, show; (show = slideshows[i]); i++) {
      time = show.getAttribute("data-transition-time") || "5";
      // Pick up from the initial `visible` slide, or start at #1
      if (!show.querySelector(".slideshow-slide.js-slideshow-visible")) {
        addClass(show.querySelector(".slideshow-slide"), SHOW_SLIDE_CLASS);
      }
      startTimer(show, time);
    }
  }

  function startTimer (slideshow, time) {
    var timeInMs = time * 1000;
    var advanceFunc = advance.bind(null, slideshow);
    window.setInterval(function () {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(advanceFunc);
      } else {
        advanceFunc();
      }
    }, timeInMs);
  }

  init();
})();