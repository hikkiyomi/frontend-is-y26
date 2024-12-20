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
    if (
      element.href === location ||
      (document.location.pathname.endsWith("/") &&
        element.href.endsWith("index.html"))
    ) {
      element.classList.add("nav__item__active");
    }
  });
};

(function () {
  const startTime = performance.now();

  window.addEventListener("load", () => {
    measureLoadTime(startTime);
    decorateNavCurrentPage();
  });
})();
