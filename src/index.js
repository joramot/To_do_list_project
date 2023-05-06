import TasksToDo from './tasksToDo.js';
import './style.css';
import './img/reload.png';
import './img/enter.png';
import './img/more.png';
import './img/trash.png';

const task = new TasksToDo();
const localTasks = JSON.parse(localStorage.getItem('localTasks'));
const items = document.querySelector('.items');

if (localTasks != null) {
  localTasks.forEach((localtask) => {
    const obj = {
      desc: localtask.desc,
      completed: localtask.completed,
      index: localtask.index,
    };
    task.arrayTasks.push(obj);
    items.innerHTML += `<form class='item item${localtask.index}'>
      <div class='item-desc'><div class='check'><input type='checkbox' id='check${localtask.index}' class='checkbox'></div><input type='text' id='desc${localtask.index}' class='desc' value='${localtask.desc}'></div>
      <div class='hamburger'><img class='hamburger-image hamburger-image${localtask.index}' src='img/more.png' alt='hamburger'> <img class='trash-image trash-image${localtask.index}' src='img/trash.png' alt='trash'></div>
      </form>`;
  });
}

const submitButton = document.querySelector('.add-input');
submitButton.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    task.newTask(submitButton.value, false, task.arrayTasks.length);
  }
});

task.displayTasks();

const trashBtn = document.querySelectorAll('.trash-image');
task.deleteTask(trashBtn);

const descInput = document.querySelectorAll('.desc');
task.updateTasksList(descInput);

const reloadBtn = document.querySelector('.reload-image');
task.reloadTasks(reloadBtn);

const completed = document.querySelectorAll('.checkbox');
task.completeTask(completed);

const btnClear = document.querySelector('.btn-clear');
const checkedBox = [];
task.arrayTasks.forEach((completedTask, idx) => {
  if (completedTask.completed === true) {
    checkedBox.push(idx);
  }
});

task.clearCompleted(btnClear, checkedBox);