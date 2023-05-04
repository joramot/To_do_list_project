class Todo {
  constructor() {
    this.tasks = [];
  }

  save() {
    localStorage.setItem('localTasks', JSON.stringify(this.tasks));
  }

  addTask = (desc, completed, index) => {
    const task = {
      desc,
      completed,
      index,
    };
    this.tasks.push(task);
    this.save();
    window.location.reload();
  };

  showBG = () => {
    const inputForm = document.querySelectorAll('.item');
    inputForm.forEach((item, index) => {
      item.addEventListener('click', () => {
        const itemContent = document.querySelector(`.item${index}`);
        const trashImage = document.querySelector(`.icon-trash${index}`);
        const moreImage = document.querySelector(`.icon-humberger${index}`);
        const selected = document.querySelector('.selected');
        const trashImageActive = document.querySelector('.icon-trash-show');
        const moreImageHide = document.querySelector('.more-image-hide');
        if (selected != null) {
          selected.classList.remove('selected');
          trashImageActive.classList.remove('icon-trash-show');
          moreImageHide.classList.remove('more-image-hide');
        }
        itemContent.classList.add('selected');
        trashImage.classList.add('icon-trash-show');
        moreImage.classList.add('more-image-hide');
      });
    });
  }

  fixLength = () => {
    let lenght = 0;
    this.tasks.forEach((item) => {
      this.item.desc = item.desc;
      item.index = lenght;
      this.item.completed = item.completed;
      lenght += 1;
    });
  }

  deleteItem = (index) => {
    this.tasks = this.tasks.filter((item, i) => i !== index);
    this.fixLength();
    localStorage.setItem('localTasks', JSON.stringify(this.tasks));
    window.location.reload();
  };

  updateList = (desc, index) => {
    this.tasks[index].desc = desc;
    localStorage.setItem('localTasks', JSON.stringify(this.tasks));
    window.location.reload();
  }

  reload = (reloadBtn) => {
    reloadBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }

  completed = (item, index, descInput) => {
    if (item.checked === true) {
      this.tasks[index].completed = true;
      localStorage.setItem('localTasks', JSON.stringify(this.tasks));
      descInput.classList.add('completed');
    } else {
      this.tasks[index].completed = false;
      localStorage.setItem('localTasks', JSON.stringify(this.tasks));
      descInput.classList.remove('completed');
    }
    window.location.reload();
  };

  completedTasks = () => {
    const checkedIndex = [];
    this.tasks.forEach((completedTask, index) => {
      if (completedTask.completed === true) {
        checkedIndex.push(index);
      }
    });
    return checkedIndex;
  }

  clearAll = (checkedIndex) => {
    const result = this.tasks.filter((elem, index) => checkedIndex.indexOf(index) === -1);
    this.tasks = result;
    this.fixLength();
    localStorage.setItem('localTasks', JSON.stringify(this.tasks));
    window.location.reload();
  }
}

const task = new Todo();

const display = () => {
  const localTasks = JSON.parse(localStorage.getItem('localTasks'));
  const items = document.querySelector('.items');

  if (localTasks != null) {
    localTasks.forEach((localtask) => {
      const tt = {
        desc: localtask.desc,
        completed: localtask.completed,
        index: localtask.index,
      };
      task.tasks.push(tt);
      if (localtask.completed === true) {
        items.innerHTML += `<form class='item item${localtask.index}'>
      <div class='item-desc'><div class='check'><input type='checkbox' id='check${localtask.index}' class='checkbox checkbox${localtask.index}' checked></div><input type='text' id='desc${localtask.index}' class='desc completed desc${localtask.index}' value='${localtask.desc}'></div>
      <div class='humberger'><img class='icon-humberger icon-humberger${localtask.index}' src='./img/more.png' alt='humberger'> <img class='icon-trash icon-trash${localtask.index}' src='./img/trash.png' alt='trash'></div>
      </form>`;
      } else {
        items.innerHTML += `<form class='item item${localtask.index}'>
      <div class='item-desc'><div class='check'><input type='checkbox' id='check${localtask.index}' class='checkbox checkbox${localtask.index}'></div><input type='text' id='desc${localtask.index}' class='desc desc${localtask.index}' value='${localtask.desc}'></div>
      <div class='humberger'><img class='icon-humberger icon-humberger${localtask.index}' src='./img/more.png' alt='humberger'> <img class='icon-trash icon-trash${localtask.index}' src='./img/trash.png' alt='trash'></div>
      </form>`;
      }
    });
  }

  const submitButton = document.querySelector('.add-input');
  submitButton.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      task.addTask(submitButton.value, false, task.tasks.length);
    }
  });

  // Show onclick background
  task.showBG();

  // Delete
  const trashBtn = document.querySelectorAll('.trash-image');
  trashBtn.forEach((trashBtn, index) => {
    trashBtn.addEventListener('click', () => {
      task.deleteItem(index);
    });
  });

  // Edit
  const descInput = document.querySelectorAll('.desc');
  descInput.forEach((desc, index) => {
    desc.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        task.updateList(desc.value, index);
      }
    });
  });

  // reload
  const reloadBtn = document.querySelector('.reload-image');
  task.reload(reloadBtn);

  // Completed
  const check = document.querySelectorAll('.checkbox');
  check.forEach((item, index) => {
    const descInput = document.querySelector(`.desc${index}`);
    item.addEventListener('change', () => {
      task.completed(item, index, descInput);
    });
  });

  // Clear All
  const btnClear = document.querySelector('.btn-clear');
  const checkedIndex = task.completedTasks();
  btnClear.addEventListener('click', () => {
    task.clearAll(checkedIndex);
  });
};

display();