// selector
const showModalBtn = document.querySelector("#show-modal");
const modal = document.querySelector("#modal");
const backdrop = document.querySelector("#backdrop");

// event
showModalBtn.addEventListener("click", showModal);

// function
function showModal() {
  // show modal and backdrop
  [modal, backdrop].forEach((element) => (element.style.display = "flex"));
}
