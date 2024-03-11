// selector
const showModalBtn = document.querySelector("#show-modal");
const closeModalBtn = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const backdrop = document.querySelector("#backdrop");

// event
showModalBtn.addEventListener("click", showModal);
[closeModalBtn, backdrop].forEach((element) =>
  element.addEventListener("click", closeModal)
);
// function
function showModal() {
  // show modal and backdrop
  [modal, backdrop].forEach((element) => (element.style.display = "flex"));
}

function closeModal() {
  // close modal and backdrop
  [modal, backdrop].forEach((element) => (element.style.display = "none"));
}
