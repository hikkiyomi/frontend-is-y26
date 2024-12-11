(function () {
  const startTime = performance.now();

  window.onload = () => {
    const endTime = performance.now();
    const loadTime = (endTime - startTime) / 1000;

    const element = document.getElementById("page-load-time");
    const text = document.createTextNode(`Page load time: ${loadTime}`);

    element.appendChild(text);
  };
})();
