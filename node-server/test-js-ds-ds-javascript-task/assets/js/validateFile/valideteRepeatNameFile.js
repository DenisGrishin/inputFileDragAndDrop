import { addTextToast } from '../common/showToast';

const valideteRepeatNameFile = (files, loadFile) => {
  // собираем массив имен файлов уже загруженных в инпут
  const nameLoadFiles = Array.from(loadFile.querySelectorAll('li')).map(
    (item) => item.querySelector('span[data-name]').dataset.name
  );

  const newFiles = files
    .map((file) => {
      if (nameLoadFiles.includes(file.name)) {
        addTextToast(
          `<b>Ошибка:</b> Изображение с таким ${file.name} именем уже существует.`
        );
        return undefined;
      }
      return file;
    })
    .filter((it) => it !== undefined);
  return newFiles;
};
export default valideteRepeatNameFile;
