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
          console.error(`couldn't parse json: ${err.message}`);
          reject(err);
        }
      } catch (err) {
        console.error(`couldn't fetch data: ${err.message}`);
        reject(err);
      }
    }, 10000);
  });
}

function renderBoard(tasks) {
  const preloader = document.querySelectorAll(".main__todo-preloader")[0];
  preloader.style.display = "none";
}

(function () {
  const url = "https://jsonplaceholder.typicode.com/todos";

  fetchTodos(url).then((json) => renderBoard(json));
})();
