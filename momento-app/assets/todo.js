const todoForm = document.querySelector(".js-todo__form"),
  todoInput = todoForm.querySelector("input"),
  todoUl = document.querySelector(".js-todo__list");

const TODO_LS = "userTodo";
let todoArray = [];

const saveTodo = () => {
  localStorage.setItem(TODO_LS, JSON.stringify(todoArray));
};

const removeEventhandler = () => {
  const delBtn = event.target;
  const li = delBtn.parentNode;
  todoUl.removeChild(li);
  const cleanList = todoArray.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  todoArray = cleanList;
  saveTodo();
};

const todoHTML = (todo) => {
  todoInput.placeholder = "Write your to do list";
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const todoId = todoArray.length + 1;
  todoUl.appendChild(li);
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = todoId;
  delBtn.innerText = "Remove";
  delBtn.addEventListener("click", removeEventhandler);
  span.innerText = todo;
  todoObj = {
    todo: todo,
    id: todoId,
  };
  todoArray.push(todoObj);
  saveTodo();
};

const todoHTMLNull = () => {
  todoInput.placeholder = `Check your todo again`;
};

const todoEventhandler = (event) => {
  event.preventDefault();
  const currentTodo = todoInput.value;
  if (currentTodo.length == 0) {
    todoHTMLNull();
  } else {
    todoHTML(currentTodo);
    todoInput.value = "";
  }
};

const loadTodo = () => {
  const currentValue = localStorage.getItem(TODO_LS);
  if (currentValue !== null) {
    const parsedTodo = JSON.parse(currentValue);
    parsedTodo.forEach(function (todo) {
      todoHTML(todo.todo);
    });
  }
};

const initTodo = () => {
  loadTodo();
  todoForm.addEventListener("submit", todoEventhandler);
};

initTodo();
