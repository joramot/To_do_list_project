export default class TasksToDo {
  constructor() {
    this.arrayTasks = [];
  }

  newTask = (desc, completed, index) => {
    const task = {
      desc,
      completed,
      index,
    };
    this.arrayTasks.push(task);
    localStorage.setItem('localTasks', JSON.stringify(this.arrayTasks));
    window.location.reload();
  };

  displayTasks = () => {
    const tasks = document.querySelectorAll('.item');
    tasks.forEach((item, index) => {
      item.addEventListener('click', () => {
        const itemContent = document.querySelector(`.item${index}`);
        const trashImage = document.querySelector(`.trash-image${index}`);
        const moreImage = document.querySelector(`.hamburger-image${index}`);
        const selected = document.querySelector('.selected');
        const trashImageActive = document.querySelector('.trash-image-show');
        const moreImageHide = document.querySelector('.more-image-hide');
        if (selected != null) {
          selected.classList.remove('selected');
          trashImageActive.classList.remove('trash-image-show');
          moreImageHide.classList.remove('more-image-hide');
        }
        itemContent.classList.add('selected');
        trashImage.classList.add('trash-image-show');
        moreImage.classList.add('more-image-hide');
      });
    });
  }

  adjustDescription = () => {
    let lenght = 0;
    this.arrayTasks.forEach((item) => {
      // eslint-disable-next-line no-self-assign
      item.desc = item.desc;
      item.index = lenght;
      // eslint-disable-next-line no-self-assign
      item.completed = item.completed;
      lenght += 1;
    });
  }

  deleteTask = (btn) => {
    btn.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        this.arrayTasks = this.arrayTasks.filter((item, i) => i !== index);
        // let length = 0;
        // this.arrayTasks.forEach((item) => {
        //   // eslint-disable-next-line no-self-assign
        //   item.desc = item.desc;
        //   item.index = length;
        //   // eslint-disable-next-line no-self-assign
        //   item.completed = item.completed;
        //   length += 1;
        // });
        this.adjustDescription();
        localStorage.setItem('localTasks', JSON.stringify(this.arrayTasks));
        window.location.reload();
      });
    });
  }

  updateTasksList = (iDescription) => {
    iDescription.forEach((desc, index) => {
      desc.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          this.arrayTasks[index].desc = desc.value;
          localStorage.setItem('localTasks', JSON.stringify(this.arrayTasks));
          window.location.reload();
        }
      });
    });
  }

  reloadTasks = (rTBtn) => {
    rTBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }

  completeTask = (checkBox) => {
    checkBox.forEach((item, index) => {
      const descInput = document.querySelector(`.desc${index}`);
      item.addEventListener('change', () => {
        if (item.checked === true) {
          this.arrayTasks[index].completed = true;
          localStorage.setItem('localTasks', JSON.stringify(this.arrayTasks));
          descInput.classList.add('completed');
        } else {
          this.arrayTasks[index].completed = false;
          localStorage.setItem('localTasks', JSON.stringify(this.arrayTasks));
          descInput.classList.remove('completed');
        }
        window.location.reload();
      });
    });
  }

  clearList = (btn, checkIndex) => {
    btn.addEventListener('click', () => {
      const elements = this.arrayTasks.filter((item, index) => checkIndex.indexOf(index) === -1);
      this.arrayTasks = elements;
      this.adjustDescription();
      localStorage.setItem('localTasks', JSON.stringify(this.arrayTasks));
      window.location.reload();
    });
  }
}