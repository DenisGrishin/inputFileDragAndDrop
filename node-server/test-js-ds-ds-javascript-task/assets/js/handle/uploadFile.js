import createListLoadItem from '../createElement/createListLoadItem';
import mainValidate from '../validateFile/mainValidateFile';
import { reomoveListLoadItem } from '../common/functions';
import { showToast } from '../common/showToast';

const uploadFile = (fileInput, listLoadFile) => {
  document.addEventListener('change', () => {
    const files = mainValidate(Array.from(fileInput.files), listLoadFile);
    createListLoadItem(files, listLoadFile);
    showToast();
  });

  reomoveListLoadItem(listLoadFile);
};

export default uploadFile;
