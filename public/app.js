// selector
const showModalBtn = document.querySelector("#show-modal");
const closeModalBtn = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const backdrop = document.querySelector("#backdrop");
const submitBtn = document.querySelector("#submit");
const todoInput = document.querySelector("#input");
// event
showModalBtn.addEventListener("click", showModal);
[closeModalBtn, backdrop].forEach((element) =>
  element.addEventListener("click", closeModal)
);
submitBtn.addEventListener("click", addTodo);

// default varaible
let todos = [];
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

  // add todo object in todos
  todos.push({
    id: Date.now(),
    taskName: todoInput.value,
    priority: "low",
    status: "todo",
  });

  // reset todo input value
  todoInput.value = "";
  console.log(todos);
}
