import './style.css';
import './assets/images/reload.png';
import './assets/images/enter.png';
import './assets/images/more.png';
import './assets/images/trash.png';

import tasksToDo from './tasksToDo'; 

const showListTasks = () => {
  const task = new tasksToDo ();
  const localTasks = JSON.parse(localStorage.getItem('localTasks'));
  const items = document.querySelector('.items');
  if (localTasks != null){
    localTasks.forEach((localtask) => {
      const taskObj = {
        desc: localtask.desc,
        completed: localtask.completed,
        index: localtask.index,
      };
      task.arrayTasks.push(taskObj);
      items.innerHTML += `<form class='item item${localtask.index}'>
      <div class='item-desc'><div class='check'><input type='checkbox' id='check${localtask.index}' class='checkbox'></div><input type='text' id='desc${localtask.index}' class='desc' value='${localtask.desc}'></div>
      <div class='humberger'><img class='humberger-image humberger-image${localtask.index}' src='assets/images/more.png' alt='humberger'> <img class='trash-image trash-image${localtask.index}' src='assets/images/trash.png' alt='trash'></div>
      </form>`;
    });
  }

  const addBtn = document.querySelector('.add-input');
  addBtn.addEventListener('keypress', (event) => { 
    if (event.key === 'Enter') {
      task.addTask(addBtn.value, false, task.arrayTasks.length);
    }
  });
};