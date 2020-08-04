const todoForm = document.querySelector(".todo_input"),
  todoInput = todoForm.querySelector("input"),
  submitBtn = todoForm.querySelector("button"),
  todoUl = document.querySelector("ul");

const USER_LS = "userTodo";
let todoArray = [];

const saveTodo = () => {
  localStorage.setItem(USER_LS, JSON.stringify(todoArray));
};

const delTodo = () => {
  const delBtn = event.target;
  const li = delBtn.parentNode;
  todoUl.removeChild(li);
  const cleanList = todoArray.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  todoArray = cleanList;
  location.reload(true);
  saveTodo();
};

const askTodo = (todo) => {
  if (todoArray.length < 8) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const todoId = todoArray.length + 1;
    todoUl.appendChild(li);
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = todoId;
    delBtn.innerText = "remove";
    delBtn.addEventListener("click", delTodo);
    span.innerText = todo;
    todoObj = {
      todo: todo,
      id: todoId,
    };
    todoArray.push(todoObj);
    saveTodo();
  } else {
    alert("What if we set priorities first?");
  }
};

const submitEventhandler = (event) => {
  event.preventDefault();
  const currentTodo = todoInput.value;
  if (currentTodo.length == 0) {
    todoInput.placeholder = `You didn't input anything!`;
  } else {
    todoInput.placeholder = `New-todo-item`;
    askTodo(currentTodo);
    todoInput.value = "";
  }
};

const loadTodo = () => {
  const currentTodo = localStorage.getItem(USER_LS);
  if (currentTodo !== null) {
    const parsedTodo = JSON.parse(currentTodo);
    parsedTodo.forEach(function (todo) {
      askTodo(todo.todo);
    });
  }
};

const initTodo = () => {
  loadTodo();
  todoForm.addEventListener("submit", submitEventhandler);
};

initTodo();
