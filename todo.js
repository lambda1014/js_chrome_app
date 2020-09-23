const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

function deleteTodo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function filterFn(toDo){
    return toDo.id !== parseInt(li.id);
  });
  //filter는 array에 담겨있는 것들 각각에 한번씩 함수 실행
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //JSON.stringify는 js의 object를 string으로 변환
}

function paintToDo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "X";
  delBtn.addEventListener("click",deleteTodo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id : newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
} 

function loadToDos(){
  const loadedtoDos = localStorage.getItem(TODOS_LS);
  if(loadedtoDos !== null){
    const parsedToDos = JSON.parse(loadedtoDos);
    parsedToDos.forEach(function(toDo){
      paintToDo(toDo.text);
    });
    //forEach는 array에 담겨있는 것들 각각에 한번씩 함수 실행
  }
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
