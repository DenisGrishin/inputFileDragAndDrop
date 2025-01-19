import '../style/style.scss';
import createDom from './createElement/createDom';
import uploadFile from './handle/uploadFile';
import handleSubmit from './handle/handleSubmit';
import handeleListDragAdnDrop from './handle/handeleListDragAdnDrop';
import { uploadDragAndDrop } from './handle/uploadDragAndDrop';

// создаем DOM
createDom();

if (document.querySelector('.upload-file')) {
  const fileInput = document.getElementById('file-input');
  const listLoadFile = document.querySelector('.list-load');
  // загрузка файла, через события onChange
  uploadFile(fileInput, listLoadFile);

  // загрузка файла, через события Drag and Drop
  uploadDragAndDrop(listLoadFile);
  // отпракка формы
  handleSubmit(fileInput, listLoadFile);
  // сортировка списка файлов с помощью Drag and Drop
  handeleListDragAdnDrop(listLoadFile);
}
