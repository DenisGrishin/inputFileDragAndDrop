import createListLoadItem from '../createElement/createListLoadItem';
import mainValidate from '../validateFile/mainValidateFile';

import { showToast } from '../common/showToast';

const root = document.getElementById('root');

export const handleFileDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();

  document.getElementById('root').classList.add('_active');
};

export const uploadDragAndDrop = (listLoadFile) => {
  if (!root) return;

  const handleFileDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    root.classList.remove('_active');
  };
  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    root.classList.remove('_active');
    const draggedFile = e.dataTransfer;
    const { files } = draggedFile;

    const newFiles = mainValidate(Array.from(files), listLoadFile);
    createListLoadItem(newFiles, listLoadFile);
    showToast();
  };

  // когда файл находится в окно браузера, добавляем класс
  root.addEventListener('dragover', handleFileDragOver, false);
  // когда файл не находится в окно браузера, удаляем класс
  root.addEventListener('dragleave', handleFileDragLeave, false);
  // отпускаем файл над зоной загрузки
  root.addEventListener('drop', handleFileDrop, false);
};
