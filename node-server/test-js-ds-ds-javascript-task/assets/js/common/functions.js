// находим максимальное число из всех id
export const findMaxNumId = (selectorAll) => {
  if (selectorAll.length === 0) return 0;

  return Math.max.apply(
    null,
    Array.from(selectorAll).map((el) => Number(el.id.replace(/[^\d]/g, '')))
  );
};

// удаление файла из инпута
const removeFile = (id) => {
  const loadNamefile = document.querySelector(`#${id} span[data-name]`).dataset
    .name;

  const fileInput = document.getElementById('file-input');
  const files = Array.from(fileInput.files);

  const updateFile = files
    .map((file) => {
      if (!loadNamefile.includes(file.name)) {
        return file;
      }
      return undefined;
    })
    .filter((file) => file !== undefined);

  const dataTransfer = new DataTransfer();

  updateFile.forEach((file) => {
    dataTransfer.items.add(file);
  });

  fileInput.files = dataTransfer.files;
};
// удаление UI  из списка загруженных  файлов
export const reomoveListLoadItem = (selectorParent) => {
  selectorParent.addEventListener('click', (e) => {
    const { target } = e;

    if (target.classList.contains('list-load__btn')) {
      removeFile(target.parentElement.id);
      document.getElementById(target.parentElement.id).remove();
    }

    if (selectorParent.children.length === 0) {
      selectorParent.classList.remove('_show');
    }
  });
};

// сортировка файлов
export const sortFile = (fileInput, listLoadFile) => {
  const files = Array.from(fileInput.files);
  if (files.length === 0) return;
  const arrLoadName = Array.from(listLoadFile.children).map(
    (it) => it.querySelector('li span[data-name]').dataset.name
  );
  const newFile = files.map((element, indx) =>
    /* eslint-disable */
    files.filter((it) => it.name === arrLoadName[indx]).pop()
  );

  const dataTransfer = new DataTransfer();

  newFile.forEach((file) => {
    dataTransfer.items.add(file);
  });

  fileInput.files = dataTransfer.files;
};

// удалить все загруженые файлы
export const removeAllLoadFile = (listLoadFile) => {
  if (listLoadFile.length === 0) return;

  Array.from(listLoadFile.children).forEach((file) => file.remove());
  listLoadFile.classList.remove('_show');
};
