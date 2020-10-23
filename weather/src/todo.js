"use strict";

export default class Todo {
  constructor() {
    this.todoContainer = document.querySelector(".todo__container");
    this.ol = document.querySelector(".todo__list--container");
    this.todoSwitchBtn = document.querySelector(".todo__switch");
    this.todoSwitchBtn.addEventListener("click", this._visualizeTodo);
    this.todoForm = document.querySelector(".todo__form");
    this.todoForm.addEventListener("submit", () => {
      this._submitEventHandler();
    });

    this.status = false;
    this.CLASS_VISIBLE = "todo__visible";
    this.TODO_LS = "userTodo";
    this.USER_OBJ = {};
    this.count = 0;
  }

  _loadTodo = () => {
    const todoObj = localStorage.getItem(this.TODO_LS);
    const fromJSONObj = JSON.parse(todoObj);
    return fromJSONObj;
  };

  _deleteTodo = (todoObj) => {};

  _saveTodo = (todoObj) => {
    const toJSONObj = JSON.stringify(todoObj);
    localStorage.setItem(this.TODO_LS, toJSONObj);
  };

  _makeHTML = (todoObj) => {
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
    button.addEventListener("click", (event) => {
      const li = event.target.parentNode;
      this.count--;
      if (todoObj.id === parseInt(li.id)) {
        this.ol.removeChild(li);
      }
    });
    li.append(input, span, button);
    this.ol.append(li);
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
    const todoObj = {
      id: Date.now(),
      todo: userTodo,
    };
    this.USER_OBJ.id = this.count;
    this.USER_OBJ.item = todoObj;
    this._makeHTML(todoObj);
    this._saveTodo(todoObj);
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

// 진행상황: saveTodo가 제대로 작동하도록 만들고 있는 상황, 이때 저장한 객체가 차곡차곡 쌓이지 않고, 단발적으로 로컬 스토리지에 저장되는 문제가 있는 상황임. 즉, todo 객체를 만들지 못하고 있는 상황인데, 이걸 어떻게 해결하면 좋을지에 대해 미지수임
