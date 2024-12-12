let schedule = new Map();

const addTask = (day, task) => {
  if (!schedule.has(day)) {
    schedule.set(day, new Array());
  }

  schedule.get(day).push(task);

  return schedule;
};

const submitHandler = (event) => {
  event.preventDefault();

  const options = document
    .querySelectorAll("#form-day-select")[0]
    .querySelectorAll("option");

  const selectedDay = Array.from(options).find((option) => option.selected);
  const taskDescription = document.getElementById("form-input").value;

  schedule = addTask(selectedDay.value, taskDescription);

  window.localStorage.setItem("schedule", JSON.stringify(schedule));
};

const loadLocalStorage = () => {
  const storage = window.localStorage;
  const parsed = JSON.parse(storage.getItem("schedule"));

  if (parsed) {
    schedule = new Map(Object.entries(parsed));
  }
};

(function () {
  window.addEventListener("load", () => {
    loadLocalStorage();

    const form = document.querySelectorAll(".main__form")[0];

    form.addEventListener("submit", submitHandler);
  });
})();
