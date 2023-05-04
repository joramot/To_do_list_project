import './style.css';
import './img/reload.png';
import './img/enter.png';
import './img/more.png';
import './img/trash.png';

const tasks = [
  {
    description: 'Going to the Cinema',
    completed: false,
    index: 1,
  },
  {
    description: 'Coding in the Midnight',
    completed: false,
    index: 2,
  },
  {
    description: 'Up to the task',
    completed: false,
    index: 3,
  },
];

const display = () => {
  const items = document.querySelector('.items');

  tasks.forEach((task) => {
    const completed = task.completed ? 'checked' : '';

    items.innerHTML += `<form class='item item${task.index}'>
      <div class='item-desc'>
        <div class='check'>
          <input type='checkbox' id='check${task.index}' class='checkbox checkbox${task.index}' ${completed}>
        </div>
        <input type='text' id='desc${task.index}' class='desc desc${task.index}' value='${task.description}'>
      </div>
      <div class='humberger'>
        <img class='icon-humberger icon-humberger${task.index}' src='./img/more.png' alt='humberger'>
        <img class='icon-trash icon-trash${task.index}' src='./img/trash.png' alt='trash'>
      </div>
    </form>`;
  });

  const submitButton = document.querySelector('.add-input');
  submitButton.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const task = {
        description: submitButton.value,
        completed: false,
        index: tasks.length + 1,
      };
      tasks.push(task);
      items.innerHTML += `<form class='item item${task.index}'>
        <div class='item-desc'>
          <div class='check'>
            <input type='checkbox' id='check${task.index}' class='checkbox checkbox${task.index}'>
          </div>
          <input type='text' id='desc${task.index}' class='desc desc${task.index}' value='${task.description}'>
        </div>
        <div class='humberger'>
          <img class='icon-humberger icon-humberger${task.index}' src='./img/more.png' alt='humberger'>
          <img class='icon-trash icon-trash${task.index}' src='./img/trash.png' alt='trash'>
        </div>
      </form>`;
    }
  });

  // Show onclick background
  tasks.showBG();

  // Delete
  const trashBtn = document.querySelectorAll('.icon-trash');
  trashBtn.forEach((trashBtn, index) => {
    trashBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      display();
    });
  });

  // Edit
  const descInput = document.querySelectorAll('.desc');
  descInput.forEach((desc, index) => {
    desc.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        tasks[index].description = desc.value;
        display();
      }
    });
  });

  // reload
  const reloadBtn = document.querySelector('.reload-image');
  reloadBtn.addEventListener('click', () => {
    display();
  });

  // Completed
  const check = document.querySelectorAll('.checkbox');
  check.forEach((item, index) => {
    item.addEventListener('change', () => {
      tasks[index].completed = item.checked;
    });
  });

  // Clear All
  const btnClear = document.querySelector('.btn-clear');
  const checkedIndex = tasks.completedTasks();
  btnClear.addEventListener('click', () => {
    tasks.clearAll(checkedIndex);
  });
};

display();