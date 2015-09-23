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

    // The advance funtion updates the display, and then schedules the next
    // call to advance the slide:
    function advanceSlideshow () {
      advance(slideshow);
      window.setTimeout(doAdvance, timeInMs);
    }

    // We wrap the call to advance the slide in requestAnimationFrame, because
    // this doesn't get called until the window is in view (meaning the animation
    // doesn't needlessly run when offscreen). Not all browsers have it though,
    // so there's a little fallback just in case:
    function doAdvance () {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(advanceSlideshow);
      } else {
        advanceSlideshow();
      }
    }

    // Schedule the first `doAdvance`, which will call itself thereafter
    window.setTimeout(doAdvance, timeInMs);
  }

  init();
})();