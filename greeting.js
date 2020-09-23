const form = document.querySelector(".js-form"),
input = form.querySelector("input"),
greeting = document.querySelector(".js-greetings"),
resetBtn = document.querySelector(".js-reset");

const USER_LS = "currentUser",
SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

// add
function handleReset() {
  localStorage.removeItem(USER_LS);
  greeting.classList.remove(SHOWING_CN);
  resetBtn.classList.remove(SHOWING_CN);
  form.classList.add(SHOWING_CN);
  input.value = "";
}
// add
function resetName() {
  resetBtn.addEventListener("click", handleReset);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  resetBtn.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text} :)`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null) {
     askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
  resetName();
}

init();