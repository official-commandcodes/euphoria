const navItems = document.querySelector(".nav_items");
const sliders = document.querySelectorAll(".slider");
const sliderBtnRight = document.querySelector(".slider_btn--right");
const sliderBtnLeft = document.querySelector(".slider_btn--left");

/**
 * ------------------
 * SMOOTH SCROLLING
 * ------------------
 */
navItems.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.closest(".nav_item")) {
    const itemId = e.target.id;
    document.querySelector(`.${itemId}`).scrollIntoView({ behavior: "smooth" });
  }
});

/**
 * ------------------
 * HEADER SLIDER
 * ------------------
 */
let curSlider = 0;
const maxLengthOfSlider = sliders.length - 1;

sliders.forEach((s, i) => (s.style.transform = `translateX(${i * 100}%)`));
const goTo = (slide) => {
  sliders.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};

// navigate right
sliderBtnRight.addEventListener("click", function () {
  if (curSlider < maxLengthOfSlider) {
    curSlider++;
  } else {
    curSlider = 0;
  }

  goTo(curSlider);
});

// navigate left
sliderBtnLeft.addEventListener("click", function () {
  if (curSlider > 0) {
    curSlider--;
  } else {
    curSlider = maxLengthOfSlider;
  }

  goTo(curSlider);
});

/**
 * ------------------
 *  INTERSECTION OBSERVER API
 * ------------------
 */

const callbackObserver = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

const observer = new IntersectionObserver(callbackObserver, {
  threshold: 0.15,
  root: null,
});

document.querySelectorAll("#wrapper").forEach((section) => {
  observer.observe(section);
  section.classList.add("section--hidden");
});
