import { addTextToast } from '../common/showToast';
import valideteRepeatNameFile from './valideteRepeatNameFile';

const validateLengthFiles = (files, loadFile) => {
  // lengthLoadImg Длина созданых файлов, если они есть
  const lengthLoadImg = loadFile.children.length;
  const maxLength = 5;

  if (lengthLoadImg + files.length >= maxLength + 1) {
    addTextToast(
      '<b>Ошибка:</b> Превышено допустимое количество изображений: максимум 5.'
    );
  }

  if (!lengthLoadImg) {
    return files.length <= 5 ? files : files.slice(0, maxLength);
  }

  const noRepeatNameFiles = valideteRepeatNameFile(files, loadFile);

  return noRepeatNameFiles.slice(0, maxLength - lengthLoadImg);
};
export default validateLengthFiles;
