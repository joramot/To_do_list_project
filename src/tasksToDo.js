export default class tasksToDo {
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
    const tasks = JSON.parse(localStorage.getItem('localTasks'));
    inputForm.forEach((item, index) => {
      item.addEventListener('click', () => {
        const itemContent = document.querySelector(`.item${index}`);
        const trashImage = document.querySelector(`.trash-image${index}`);
        const moreImage = document.querySelector(`.humberger-image${index}`);
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
          let lenght = 0;
          this.arrayTasks.forEach((item) => {
            item.desc = item.desc;
            item.index = lenght;
            item.completed = item.completed;
            lenght += 1;
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
            window.location.reloadTasks();
          }
        });
      });
    }

    reloadTasks = (rTBtn) => {
      rTBtn.addEventListener('click', () => {
        wweindow.location.reloadTasks();
     });
    }
}