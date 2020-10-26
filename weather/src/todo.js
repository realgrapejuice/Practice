"use strict";

export default class Todo {
  constructor() {
    this.todoContainer = document.querySelector(".todo__container");
    this.ol = document.querySelector(".todo__list--container");
    this.todoSwitchBtn = document.querySelector(".todo__switch");
    this.todoSwitchBtn.addEventListener("click", this._visualizeTodo);
    this.todoForm = document.querySelector(".todo__form");

    this.checked = false;
    this.CLASS_VISIBLE = "todo__visible";
    this.TODO_LS = "userTodo";
    this.todoArr = [];
    this.count = 0;
  }

  _saveTodo = () => {
    localStorage.setItem(this.TODO_LS, JSON.stringify(this.todoArr));
  };

  _deleteTodo = (event) => {
    const li = event.target.parentNode;
    this.count--;
    this.ol.removeChild(li);
    const sortedArr = this.todoArr.filter((item) => {
      return item.id !== parseInt(li.id);
    });
    this.todoArr = sortedArr;
    this.checked = false;
    this._saveTodo();
  };

  _checkDoneTodo = (event) => {
    const li = event.target.parentNode;
    if (!this.checked) {
      this.checked = true;
      li.style.textDecoration = `line-through`;
      li.style.color = `#aaa69d`;
    } else {
      this.checked = false;
      li.style.textDecoration = `none`;
      li.style.color = `#f7f1e3`;
    }
  };

  _askTodo = (userTodo) => {
    const todoObj = {
      id: Date.now(),
      todo: userTodo,
    };
    const li = document.createElement("li");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const button = document.createElement("button");
    li.setAttribute("class", "todo__item");
    li.id = todoObj.id;
    input.setAttribute("class", "todo__checkbox");
    input.setAttribute("type", "checkbox");
    span.setAttribute("class", "todo__desc");
    span.textContent = todoObj.todo;
    button.setAttribute("class", "todo__btn");
    button.setAttribute("type", "button");
    button.textContent = `X`;
    button.addEventListener("click", this._deleteTodo);
    input.addEventListener("click", this._checkDoneTodo);
    li.append(input, span, button);
    this.ol.append(li);
    this.todoArr.push(todoObj);
    this._saveTodo();
  };

  _submitEventHandler = () => {
    this.count++;
    if (this.count > 8) {
      this.count--;
      alert(`What if we deal with priority things first?`);
      return;
    }
    const todoInput = this.todoForm.querySelector("input");
    const userTodo = todoInput.value;
    todoInput.value = "";
    this._askTodo(userTodo);
  };

  _loadTodo = () => {
    const currentTodo = localStorage.getItem(this.TODO_LS);
    if (currentTodo !== null) {
      const parsedTodo = JSON.parse(currentTodo);
      parsedTodo.forEach((item) => this._askTodo(item.todo));
    }
  };

  initTodo = () => {
    this._loadTodo();
    this.todoForm.addEventListener("submit", this._submitEventHandler);
  };

  _visualizeTodo = () => {
    if (!this.status) {
      this.status = true;
      this.todoContainer.classList.add(this.CLASS_VISIBLE);
    } else {
      this.status = false;
      this.todoContainer.classList.remove(this.CLASS_VISIBLE);
    }
  };
}
