import { addTextToast } from '../common/showToast';

const validateSizeFiles = (files) => {
  const maxSizeBytes = 10 * 1024 * 1024;

  const newFiles = files
    .map((file) => {
      if (file.size < maxSizeBytes) {
        return file;
      }

      addTextToast(
        `<b>Ошибка:</b> Файл "${file.name}" не загружен: превышен размер изображения.`
      );
      return undefined;
    })
    .filter((it) => it !== undefined);

  return newFiles;
};
export default validateSizeFiles;
