import { handleFileDragOver } from './uploadDragAndDrop';

const handeleListDragAdnDrop = (listLoadFile) => {
  const root = document.getElementById('root');

  const handleDragOver = (e) => {
    e.preventDefault();

    const activeElement = listLoadFile.querySelector('._chosen');
    document.getElementById('root').classList.remove('_active');

    const currentElement = e.target;

    const isMoveable =
      activeElement !== currentElement &&
      currentElement.classList.contains('list-load__item');

    if (!isMoveable) {
      return;
    }

    const nextElement =
      currentElement === activeElement.nextElementSibling
        ? currentElement.nextElementSibling
        : currentElement;

    listLoadFile.insertBefore(activeElement, nextElement);
  };
  const handleDragEnd = (e) => {
    e.target.classList.remove('_chosen');

    root.addEventListener('dragover', handleFileDragOver, false);
  };
  const handleDragStart = (e) => {
    e.target.classList.add('_chosen');
    root.removeEventListener('dragover', handleFileDragOver);
  };
  //  события когда элемент находиться над другим
  listLoadFile.addEventListener('dragover', handleDragOver);
  // отпускаем и удаляем класс
  listLoadFile.addEventListener('dragend', handleDragEnd);
  //  хватаем  элемент и даем ему класс
  listLoadFile.addEventListener('dragstart', handleDragStart);
};

export default handeleListDragAdnDrop;
