const taskForm = document.querySelector("form"),
  taskInput = document.querySelector("input"),
  taskList = document.querySelector(".pending_list"),
  finishList = document.querySelector(".finished_list");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTasks = [];
let finishedTasks = [];

localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));

const getTaskObj = (task) => {
  return {
    id: String(Date.now()),
    task,
  };
};

const findInPending = (taskId) => {
  return pendingTasks.find(function (task) {
    return task.id === taskId;
  });
};

const findInFinished = (taskId) => {
  return finishedTasks.find(function (task) {
    return task.id === taskId;
  });
};

const removeFromPending = (taskId) => {
  pendingTasks = pendingTasks.filter(function (task) {
    return task.id !== taskId;
  });
};

const removeFromFinished = (taskId) => {
  finishedTasks = finishedTasks.filter(function (task) {
    return task.id !== taskId;
  });
};

const saveToPending = (task) => {
  pendingTasks.push(task);
};

const saveToFinished = (task) => {
  finishedTasks.push(task);
};

const delEventHandler = (event) => {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromPending(li.id);
  removeFromFinished(li.id);
  saveState();
};

const doneBtnEventHandler = (event) => {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  removeFromPending(li.id);
  paintFinishedTask(task);
  saveToFinished(task);
  saveState();
};

const backBtnEventHandler = (event) => {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id);
  removeFromFinished(li.id);
  paintPendingTask(task);
  saveToPending(task);
  saveState();
};

const getGeneralLi = (task) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  span.innerText = task.task;
  delBtn.innerText = `Delete`;
  delBtn.addEventListener("click", delEventHandler);
  li.id = task.id;
  li.append(span, delBtn);
  return li;
};

const paintPendingTask = (task) => {
  const generalLi = getGeneralLi(task);
  const doneBtn = document.createElement("button");
  doneBtn.innerText = `Done`;
  doneBtn.addEventListener("click", doneBtnEventHandler);
  generalLi.append(doneBtn);
  taskList.append(generalLi);
};

const paintFinishedTask = (task) => {
  const generalLi = getGeneralLi(task);
  const backBtn = document.createElement("button");
  backBtn.innerText = `Back`;
  backBtn.addEventListener("click", backBtnEventHandler);
  generalLi.append(backBtn);
  finishList.append(generalLi);
};

const submitEventHandler = (event) => {
  event.preventDefault();
  const taskObj = getTaskObj(taskInput.value);
  taskInput.value = "";
  paintPendingTask(taskObj);
  saveToPending(taskObj);
  saveState();
};

const restoreState = () => {
  pendingTasks.forEach(function (task) {
    paintPendingTask(task);
  });
  finishedTasks.forEach(function (task) {
    paintFinishedTask(task);
  });
};

const saveState = () => {
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
};

const loadState = () => {
  pendingTasks = JSON.parse(localStorage.getItem(PENDING));
  finishedTasks = JSON.parse(localStorage.getItem(FINISHED));
  restoreState();
};

const init = () => {
  taskForm.addEventListener("submit", submitEventHandler);
  loadState();
};
init();
