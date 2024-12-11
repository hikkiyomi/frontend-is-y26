(function () {
  let startTime = performance.now();

  window.onload = () => {
    let endTime = performance.now();
    let loadTime = (endTime - startTime) / 1000;

    let element = document.getElementById("page-load-time");
    let text = document.createTextNode(`Page load time: ${loadTime}`);

    element.appendChild(text);
  };
})();
