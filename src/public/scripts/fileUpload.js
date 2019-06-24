const form = document.querySelector('.main-content__form');
const icon = document.querySelector('.main-content__form__label__icon');
const fileInput = document.querySelector('.main-content__form__input');
const label = document.querySelector('.main-content__form__label__content');
const events = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'];
const submitButton = document.querySelector('.main-content__form__submit');
let droppedFiles = [];

// inicio funções que acionam o eventos
events.forEach((event) => {
  form.addEventListener(event, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

form.addEventListener('dragover', () => {
  form.classList.add('fileHover');
});

form.addEventListener('dragenter', () => {
  form.classList.add('fileHover');
});

form.addEventListener('dragleave', () => {
  form.classList.remove('fileHover');
});

form.addEventListener('drop', (e) => {
  form.classList.remove('fileHover');
  droppedFiles = e.dataTransfer.files;
  showFiles(droppedFiles);
});

form.addEventListener('submit', uploadFiles);
// fim funções que acionam o eventos


function showFiles(files) {
  if (files.length > 1) {
    droppedFiles = [];
    alert('You must upload just one file');
  } else {
    label.innerText = files[0].name;
  }
}

function uploadFiles(e) {
  e.preventDefault();
  if (droppedFiles.length) {
    const formData = new FormData();
    for (let i = 0; i < droppedFiles.length; i++) {
      formData.append(fileInput.name, droppedFiles[i], droppedFiles[i].name);
    }

    if (!droppedFiles[0].name.split('.').includes('txt') || !droppedFiles[0].name.split('.').includes('log')) {
      droppedFiles = [];
      label.innerText = 'Choose a file or Drag it here';
      return alert('Please choose the file with correct format.');
    }

    changeFormStatus('upload');
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status) {
        document.body.innerHTML = xhr.responseText;
      }
    };

    xhr.open(form.method, form.action, true);
    xhr.send(formData);
  } else {
    alert('You must choose a file to upload.');
  }
}

function changeFormStatus() {
  icon.classList.remove('fa-cloud-download-alt');
  icon.classList.add('fa-spinner');
  icon.classList.add('fa-pulse');
  label.innerText = 'PROCESSING FILE';
  submitButton.classList.add('hide');
}
