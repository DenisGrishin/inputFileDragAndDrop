import { findMaxNumId } from '../common/functions';
import { createSpanAndBtnDel } from './createSpanAndBtnDel';

function createBigPreviewFile(img, li) {
  const span = document.createElement('span');
  li.prepend(span);
  const cloneImg = img.cloneNode(true);
  span.appendChild(cloneImg);
}

const createListLoadItem = (files, listFile) => {
  if (files.length === 0) return;

  listFile.classList.add('_show');

  let idCount = findMaxNumId(listFile.children);

  files.forEach((file) => {
    const raeder = new FileReader();

    const li = document.createElement('li');
    li.draggable = true;
    li.id = `loadFile-${(idCount += 1)}`;
    li.classList.add('list-load__item');
    const img = document.createElement('img');
    img.draggable = false;
    const spanImg = document.createElement('span');
    spanImg.appendChild(img);

    raeder.onload = () => {
      img.setAttribute('src', raeder.result);
      createBigPreviewFile(img, li);
      li.prepend(spanImg);
    };

    createSpanAndBtnDel(file, li);
    listFile.appendChild(li);
    raeder.readAsDataURL(file);
  });
};
export default createListLoadItem;
