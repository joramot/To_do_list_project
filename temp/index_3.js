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

const renderTasks = () => {
  const items = document.querySelector('.items');

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = `item item${task.index}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = `checkbox checkbox${task.index}`;
    checkbox.checked = task.completed;

    const description = document.createElement('span');
    description.className = `desc desc${task.index}`;
    description.textContent = task.description;

    li.appendChild(checkbox);
    li.appendChild(description);
    items.appendChild(li);
  });
};

renderTasks();