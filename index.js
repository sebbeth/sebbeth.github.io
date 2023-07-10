let currentItem = "about";

function createObserver(querySelector, atTop, notAtTop) {
  // Based on: https://css-tricks.com/styling-based-on-scroll-position/
  if (
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype
  ) {
    let observer = new IntersectionObserver((entries) => {
      if (entries[0].boundingClientRect.y < 0) {
        console.log("not at top", querySelector);
        notAtTop();
      } else {
        console.log("at top", querySelector);
        atTop();
      }
    });
    observer.observe(document.querySelector(querySelector));
  }
}

function updateNav() {
  switch (currentItem) {
    case "about":
      const about = document.querySelector("#about");
      about.classList.add("selected");
      break;

    default:
      break;
  }
}

createObserver(
  "#about",
  () => {
    currentItem = "about";
    updateNav();
  },
  () => {}
);
createObserver(
  "#skills",
  () => {
    currentItem = "skills";
    updateNav();
  },
  () => {}
);


currentColor = "";

colorOptions = [
  "wheat",
  "coral",
  "crimson",
  "royalblue",
  "violet",
  "green",
  "darkgreen",
  "darkblue",
  "indigo",
  "chartreuse",
  "aquamarine",
  
];

function onSwitchColor() {
  if (currentColor === "") {
    currentColor = "brown";
    applyColor(currentColor);
    return;
  }
  const newColor = getANewColor(currentColor);
  applyColor(newColor);
}

function applyColor(color) {
  console.log("color is ", color);
  const root = document.documentElement;
  // set the primary color
  root.style.setProperty('--primary-color', color);
  // change the surname to the color
  const surname = document.querySelector("#surname");
  surname.textContent = color;

}

function getANewColor(currentColor) {
  // return a random color that is not the current color
  let newColor = currentColor;
  while (newColor === currentColor) {
    newColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
  }
  currentColor = newColor;
  return newColor;
}
