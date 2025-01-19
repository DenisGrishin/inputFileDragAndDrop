import { addTextToast } from '../common/showToast';

const validateTypeFiles = (files) => {
  const allowedTypes = ['jpg', 'jpeg', 'png'];

  const newFiles = files
    .map((file) => {
      const indexSymbol = file.type.lastIndexOf('/');
      const nameType = file.type.slice(indexSymbol + 1);

      if (allowedTypes.includes(nameType)) {
        return file;
      }
      addTextToast(
        '<b>Ошибка:</b> Неверный формат файла. Разрешены только JPG,JPEG, PNG.'
      );

      return undefined;
    })
    .filter((it) => it !== undefined);

  return newFiles;
};
export default validateTypeFiles;
