const measureLoadTime = (startTime) => {
  const endTime = performance.now();
  const loadTime = ((endTime - startTime) / 1000).toFixed(4);

  const element = document.getElementById("page-load-time");
  const text = document.createTextNode(`Page load time: ${loadTime} seconds`);

  element.appendChild(text);
};

const decorateNavCurrentPage = () => {
  const location = document.location.href;
  const elements = document.querySelectorAll(".nav__item");

  elements.forEach((element) => {
    console.log(element.href);
    console.log(location);

    if (element.href === location) {
      element.style.textDecoration = "underline";
      element.style.textDecorationThickness = "3px";
    }
  });
};

(function () {
  const startTime = performance.now();

  window.onload = () => {
    measureLoadTime(startTime);
    decorateNavCurrentPage();
  };
})();
