// selector
const showModalBtn = document.querySelector("#show-modal");
const closeModalBtn = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const backdrop = document.querySelector("#backdrop");
const submitBtn = document.querySelector("#submit");
const todoInput = document.querySelector("#input");
const tableContainer = document.querySelector("#table");
const priority = document.querySelector("#priority");
// event
showModalBtn.addEventListener("click", showModal);
[closeModalBtn, backdrop].forEach((element) =>
  element.addEventListener("click", closeModal)
);
submitBtn.addEventListener("click", addTodo);
priority.addEventListener("change", (e) => {
  filteredPriority = e.target.value;
});
// default varaible
let todos = [];
let filteredPriority = "low";
let filteredStatus = "todo";
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
    priority: filteredPriority,
    status: "todo",
    createAt: new Date().toLocaleDateString("fa-IR"),
  });

  // reset todo input value
  todoInput.value = "";
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
      "md:justify-center",
    ];
    [td1, td2, td3, td4, td5].forEach((td) => td.classList.add(...tdClass));
    td5.classList.add("items-center");
    td1.innerText = todo.taskName;
    td2.innerText = todo.priority;
    td3.innerText = todo.status;
    td4.innerText = todo.createAt;
    td1.setAttribute("data-label", "Task Name");
    td2.setAttribute("data-label", "Priority");
    td3.setAttribute("data-label", "Status");
    td4.setAttribute("data-label", "DeadLine");
    td5.setAttribute("data-label", "Actions");
    
    // set color for filter priority
    if (td2.innerText === "low") td2.classList.add("bg-slate-200");
    else if (td2.innerText === "medium") td2.classList.add("bg-red-200");
    else td2.classList.add("bg-blue-500");

    const div = document.createElement("div");
    div.classList.add("flex", "gap-3", "md:w-full", "md:justify-evenly");
    const classSpan = ["text-white", "p-1", "rounded-md", "cursor-pointer"];
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    span1.classList.add("bg-red-600", ...classSpan);
    span2.classList.add("bg-blue-600", ...classSpan);
    span3.classList.add("bg-gray-600", ...classSpan);

    const svg1 = document.createElement("svg");
    const svg2 = document.createElement("svg");
    const svg3 = document.createElement("svg");
    [svg1, svg2, svg3].forEach((svg) => {
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "currentColor");
      svg.classList.add("w-4", "h-4");
    });
    const path1 = document.createElement("path");
    path1.setAttribute("fill-rule", "evenodd");
    path1.setAttribute("clip-rule", "evenodd");
    path1.setAttribute(
      "d",
      "M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
    );
    const path2 = document.createElement("path");
    path1.setAttribute(
      "d",
      "M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
    );
    const path3 = document.createElement("path");
    const path4 = document.createElement("path");
    path3.setAttribute("d", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z");
    path4.setAttribute(
      "d",
      "M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
    );
    path4.setAttribute("clip-rule", "evenodd");
    svg1.append(path1);
    svg2.append(path2);
    svg3.append(path3, path4);
    span1.append(svg1);
    span2.append(svg2);
    span3.append(svg3);
    div.append(span1, span2, span3);
    td5.append(div);
    trBody.append(td1, td2, td3, td4, td5);
    tBody.append(trBody);

    tableContainer.append(tBody);
  });
}

function filterPriority() {
  // switch (filteredPriority) {
  //   case "low":
  //     console.log(todos);
  //     renderTodos(todos);
  //     break;
  //   case "medium":
  //     renderTodos(todos);
  //     break;
  //   case "high":
  //     console.log(todos);
  //     renderTodos(todos);
  //     break;
  // }
}

function filterStatus() {}
