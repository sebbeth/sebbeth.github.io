let currentItem = "about";

function onScrolledAway()

function createObserver(querySelector) {
  // Based on: https://css-tricks.com/styling-based-on-scroll-position/
  if (
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype
  ) {
    let observer = new IntersectionObserver((entries) => {
      if (entries[0].boundingClientRect.y < 0) {
        console.log("not at top", querySelector);
      } else {
        console.log("at top", querySelector);
      }
    });
    observer.observe(document.querySelector(querySelector));
  }
}

createObserver("#about");
createObserver("#skills");
