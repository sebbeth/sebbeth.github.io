const scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: "#sidebar",
});

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
        notAtTop();
      } else {
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

currentColorName = "";

const colorOptions = [
  { name: "brown", color: "#8f3308", isLight: false },
  { name: "orange", color: "#FF7F50", isLight: false },
  { name: "red", color: "#DC143C", isLight: false },
  { name: "royalblue", color: "#4169E1", isLight: true },
  { name: "violet", color: "#EE82EE", isLight: false },
  { name: "green", color: "#008000", isLight: true },
  { name: "darkgreen", color: "#006400", isLight: false },
  { name: "blue", color: "#0b5dad", isLight: false },
  { name: "indigo", color: "#4B0082", isLight: false },
  { name: "chartreuse", color: "#7FFF00", isLight: true },
  { name: "aquamarine", color: "#7FFFD4", isLight: true },
];

function onSwitchColor() {
  if (currentColorName === "") {
    currentColorName = "brown";
    applyColor(currentColorName);
    return;
  }
  const newColor = getANewColor(currentColorName);
  applyColor(newColor);
}

function resetColor() {
  currentColorName = "";
  applyColor(currentColorName);
}

function applyColor(colorName) {
  const color =
    colorName === ""
      ? colorOptions.find((color) => color.name === "blue")
      : colorOptions.find((color) => color.name === colorName);
  const root = document.documentElement;
  // set the primary color
  root.style.setProperty("--primary-color", color.color);
  // change the surname to the color
  const surname = document.querySelector("#surname");
  surname.textContent = colorName ? color.name : "brown";

  // set visiblity of the reset button
  const showResetButton = colorName !== "";
  const resetButton = document.querySelector("#resetColours");
  resetButton.style.setProperty(
    "visibility",
    showResetButton ? "initial" : "hidden"
  );
}

function getANewColor(currentColor) {
  // return a random color that is not the current color
  let newColor = currentColor;
  while (newColor === currentColor) {
    newColor =
      colorOptions[Math.floor(Math.random() * colorOptions.length)].name;
  }
  currentColor = newColor;
  return newColor;
}
