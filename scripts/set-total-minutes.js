const timeInput = document.getElementById("time");
document
  .querySelector(".time-form")
  .addEventListener("submit", setTotalMinutes);

function setTotalMinutes(event) {
  event.preventDefault();
  localStorage.setItem("totalMinutes", timeInput.value);
  navigateToNextPage();
}

function navigateToNextPage() {
  window.location = "./timer.html";
}
