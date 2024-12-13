function fetchTodos(url) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        try {
          const json = await response.json();
          resolve(json);
        } catch (err) {
          console.error(`Couldn't parse json: ${err.message}`);
          reject(err);
        }
      } catch (err) {
        console.error(`Couldn't fetch data: ${err.message}`);
        reject(err);
      }
    }, 1000);
  });
}

function getSample(arr, size) {
  const chosen = new Set();
  const result = new Array();

  const pickRandomIndex = (length) =>
    Math.floor(Math.random() * length) % length;

  for (let iter = 0; iter < size; iter++) {
    let choice = pickRandomIndex(arr.length);

    while (chosen.has(choice)) {
      choice = pickRandomIndex(arr.length);
    }

    result.push(arr[choice]);
    chosen.add(choice);
  }

  return result;
}

function renderTask(container, freeRow, task) {
  const elem = document.createElement("div");

  elem.innerText = task.title;
  elem.classList.add("main__todo-board-elem");

  let column = null;

  if (task.completed) {
    column = randomBetween(4, 6);
  } else {
    column = randomBetween(1, 4);
  }

  elem.style.gridColumn = column;
  freeRow[column]++;
  elem.style.gridRow = freeRow[column] + 1;

  container.appendChild(elem);
}

function renderBoard(tasks, amount) {
  const freeRow = new Array(6).fill(0);
  const container = document.querySelectorAll(".main__todo-board")[0];

  sample = getSample(tasks, amount);
  sample.forEach((task) => renderTask(container, freeRow, task));
}

function renderError(err) {
  const container = document.querySelectorAll(".main__todo-error")[0];
  container.style.display = "block";

  const element = document.createTextNode(
    `⚠ Something went wrong: ${err.message}`
  );

  container.appendChild(element);
}

function hidePreloader() {
  const preloader = document.querySelectorAll(".main__todo-preloader")[0];
  preloader.style.display = "none";
}

function randomBetween(a, b) {
  return Math.floor(a + Math.random() * (b - a));
}

(function () {
  // Fetching data from this URL will render an error.
  // const url = "http://non-existent-site";

  const url = "https://jsonplaceholder.typicode.com/todos";

  fetchTodos(url)
    .then((json) => renderBoard(json, randomBetween(10, 20)))
    .catch((err) => renderError(err))
    .finally(hidePreloader);
})();
