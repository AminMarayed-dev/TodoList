// selector
const showModalBtn = document.querySelector("#show-modal");
const closeModalBtn = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const backdrop = document.querySelector("#backdrop");
const submitBtn = document.querySelector("#submit");
const todoInput = document.querySelector("#input");
const tableContainer = document.querySelector("#table");
const priority = document.querySelector("#priority");
const status = document.querySelector("#status");
const date = document.querySelector("#date");
// event
showModalBtn.addEventListener("click", showModal);
[closeModalBtn, backdrop].forEach((element) =>
  element.addEventListener("click", closeModal)
);
submitBtn.addEventListener("click", addTodo);
priority.addEventListener("change", (e) => {
  filteredPriority = e.target.value;
});
status.addEventListener("change", (e) => {
  filteredStatus = e.target.value;
});

document.addEventListener("DOMContentLoaded", () => {
  renderTodos(todos);
});
// default varaible
let todos = getTodos();
let filteredPriority = "low";
let filteredStatus = "todo";
let existedTodo;

// function
function showModal() {
  // show modal and backdrop
  [modal, backdrop].forEach((element) => (element.style.display = "flex"));
}

function closeModal() {
  // close modal and backdrop
  [modal, backdrop].forEach((element) => (element.style.display = "none"));
}

function addTodo(e) {
  // don't refresh
  e.preventDefault();

  // set validation
  if (todoInput.value === "" || date.value === "") {
    alert("Error: please type field empty");
    return;
  }

  if (existedTodo) {
    existedTodo.taskName = todoInput.value;
    existedTodo.priority = filteredPriority;
    existedTodo.status = filteredStatus;
    existedTodo.date = date.value;
    existedTodo = "";
    closeModal();
  } else {
    // add todo object in todos
    todos.push({
      id: Date.now(),
      taskName: todoInput.value,
      priority: filteredPriority,
      status: filteredStatus,
      createAt: date.value,
    });
  }

  // reset
  submitBtn.innerText = "Submit";
  todoInput.value = "";
  date.value = "";
  priority.value = "low";
  status.value = "todo";
  saveTodos(todos);
  renderTodos(todos);
}

function renderTodos(todos) {
  tableContainer.innerHTML = "";

  const tHead = document.createElement("thead");
  tHead.classList.add("hidden", "w-full", "md:flex");
  const trHead = document.createElement("tr");
  const classTrHead = ["border", "w-full", "flex", "justify-between"];
  trHead.classList.add(...classTrHead);

  const thClass = ["border", "p-2", "w-full"];
  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  const th3 = document.createElement("th");
  const th4 = document.createElement("th");
  const th5 = document.createElement("th");
  th1.innerText = "Task Name";
  th2.innerText = "Priority";
  th3.innerText = "Status";
  th4.innerText = "DeadLine";
  th5.innerText = "Actions";
  [th1, th2, th3, th4, th5].forEach((th) => th.classList.add(...thClass));
  trHead.append(th1, th2, th3, th4, th5);
  tHead.append(trHead);

  tableContainer.append(tHead);

  const tBody = document.createElement("tbody");
  tBody.classList.add("flex", "flex-col", "gap-8", "md:block");
  todos.forEach((todo) => {
    const trBody = document.createElement("tr");
    const classTrBody = [
      "flex",
      "flex-col",
      "items-end",
      "p-2",
      "border",
      "md:flex-row",
      "md:w-full",
      "md:justify-between",
      "md:p-0",
    ];
    trBody.classList.add(...classTrBody);

    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const tdClass = [
      "w-full",
      "flex",
      "justify-between",
      "before:content-[attr(data-label)]",
      "before:font-bold",
      "border-b-2",
      "p-2",
      "md:before:content-none",
      "md:border",
      "md:block",
      "md:text-center",
      "mb-2",
      "md:mb-0",
      "md:p-5",
    ];
    [td1, td2, td3, td4, td5].forEach((td) => td.classList.add(...tdClass));
    td5.classList.add("items-center");
    td1.innerHTML = `<span class="rounded-xl  py-1 px-2">${todo.taskName}</span>`;
    td2.innerHTML = `<span class="rounded-xl py-1 px-2">${todo.priority}</span>`;
    td3.innerHTML = `<span class="rounded-xl py-1 px-2">${todo.status}</span>`;
    td4.innerHTML = `<span class="border-2 border-blue-300 rounded-xl py-1 px-2">${todo.createAt}</span>`;
    td1.setAttribute("data-label", "Task Name");
    td2.setAttribute("data-label", "Priority");
    td3.setAttribute("data-label", "Status");
    td4.setAttribute("data-label", "DeadLine");
    td5.setAttribute("data-label", "Actions");
    td5.classList.remove("border-b-2");

    // set color for filter priority
    if (td2.innerText === "low") {
      td2.querySelector("span").classList.add("bg-gray-300");
    } else if (td2.innerText === "medium") {
      td2.querySelector("span").classList.add("bg-yellow-400");
    } else {
      td2.querySelector("span").classList.add("bg-red-500");
      td2.querySelector("span").classList.add("text-white");
    }

    // set color for filter status
    if (td3.innerText === "todo") {
      td3.querySelector("span").classList.add("bg-red-500");
      td3.querySelector("span").classList.add("text-white");
    } else if (td3.innerText === "doing") {
      td3.querySelector("span").classList.add("bg-yellow-400");
    } else {
      td3.querySelector("span").classList.add("bg-green-500");
      td3.querySelector("span").classList.add("text-white");
    }

    td5.innerHTML = ` <div class="flex gap-3 md:w-full md:justify-evenly">
    <span
      class="bg-red-600 text-white p-1 rounded-md cursor-pointer delete-todo"
      id= ${todo.id}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-4 h-4 pointer-events-none"
      >
        <path
          fill-rule="evenodd"
          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    <span
      class="bg-blue-600 text-white p-1 rounded-md cursor-pointer edit-todo"
      id = ${todo.id}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-4 h-4 pointer-events-none"
      >
        <path
          d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
        />
      </svg>
    </span>
    <span
      class="bg-gray-600 text-white p-1 rounded-md cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path
          fill-rule="evenodd"
          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
  </div>`;
    trBody.append(td1, td2, td3, td4, td5);
    tBody.append(trBody);

    tableContainer.append(tBody);

    // edit
    const editBtns = document.querySelectorAll(".edit-todo");
    editBtns.forEach((editBtn) => editBtn.addEventListener("click", editTodo));
    // delete
    const deleteBtns = document.querySelectorAll(".delete-todo");
    deleteBtns.forEach((deleteBtn) =>
      deleteBtn.addEventListener("click", deleteTodo)
    );
  });
}

function editTodo(e) {
  existedTodo = todos.find((todo) => todo.id == e.target.id);

  showModal();

  todoInput.value = existedTodo.taskName;
  date.value = existedTodo.createAt;
  priority.value = existedTodo.priority;
  status.value = existedTodo.status;

  submitBtn.innerText = "Edit";
}

function deleteTodo(e) {
  todos = todos.filter((todo) => todo.id != e.target.id);
  saveTodos(todos);
  renderTodos(todos);
}

// local storage
function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}
