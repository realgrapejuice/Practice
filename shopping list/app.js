"use strict";

addEventListener("load", () => {
  //Variables
  const addForm = document.querySelector(".additem");
  const ul = document.querySelector(".shoppinglist");
  const userInput = addForm.querySelector("input");

  //Append HTML
  const createItem = (event) => {
    event.preventDefault();
    const li = document.createElement("li");
    li.setAttribute("class", "item");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");

    const span = document.createElement("span");
    span.setAttribute("class", "item_desc");
    span.textContent = userInput.value;

    const delBtn = document.createElement("button");
    delBtn.setAttribute("class", "del_btn");
    delBtn.setAttribute("type", "button");
    delBtn.textContent = `Del`;

    li.append(input, span, delBtn);
    ul.appendChild(li);
    li.scrollIntoView({ block: "center" });
    userInput.value = "";
    userInput.focus();

    delBtn.addEventListener("click", () => {
      ul.removeChild(li);
    });

    return li;
  };

  //eventListener
  addForm.addEventListener("submit", createItem);
});
