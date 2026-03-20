const display = document.querySelector(".counter-value");
const alert = document.querySelector(".alert");

let count = 0;

function update(action) {
  display.textContent = count;
  if (count < -10 && action === "decrement") alert.showModal();
}

document.querySelector(".counter").addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  if (action === "increment") count++;
  if (action === "decrement" && count > -100) count--;
  update(action);
});

alert.addEventListener("click", (e) => {
  if (e.target === alert || e.target.classList.contains("alert-close")) {
    alert.close();
  }
});

import "./carousel.js";
