const dayToColumn = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

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
  const day = selectedDay.value;
  const taskDescription = document.getElementById("form-input").value;

  schedule = addTask(day, taskDescription);

  window.localStorage.setItem(
    "schedule",
    JSON.stringify(Object.fromEntries(schedule))
  );

  const container = document.querySelectorAll(".main__schedule")[0];

  renderScheduleEntry(
    container,
    day,
    taskDescription,
    schedule.get(day).length
  );
};

const renderScheduleEntry = (container, day, taskDescription, index) => {
  const taskElement = document.createElement("div");

  taskElement.innerText = taskDescription;
  taskElement.style.gridColumn = dayToColumn[day];
  taskElement.style.gridRow = index + 1;
  taskElement.classList.add("main__schedule-elem");

  container.appendChild(taskElement);
};

const renderSchedule = () => {
  const container = document.querySelectorAll(".main__schedule")[0];

  for (const tuple of schedule) {
    const day = tuple[0];
    const arr = tuple[1];

    for (let i = 0; i < arr.length; i++) {
      renderScheduleEntry(container, day, arr[i], i + 1);
    }
  }
};

const loadLocalStorage = () => {
  const storage = window.localStorage;
  const scheduleStringified = storage.getItem("schedule");

  if (scheduleStringified) {
    const parsed = JSON.parse(storage.getItem("schedule"));

    if (Object.keys(parsed).length > 0) {
      schedule = new Map(Object.entries(parsed));
    }
  }
};

(function () {
  window.addEventListener("load", () => {
    loadLocalStorage();
    renderSchedule();

    const form = document.querySelectorAll(".main__form")[0];
    form.addEventListener("submit", submitHandler);
  });
})();
