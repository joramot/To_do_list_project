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

  deleteTask = (btn) => {
    btn.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        this.arrayTasks = this.arrayTasks.filter((item, i) => i !== index);
        let length = 0;
        this.arrayTasks.forEach((item) => {
          // eslint-disable-next-line no-self-assign
          item.desc = item.desc;
          item.index = length;
          // eslint-disable-next-line no-self-assign
          item.completed = item.completed;
          length += 1;
        });
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
}