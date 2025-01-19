import validateLengthFiles from './validateLengthFiles';
import validateSizeFiles from './validateSizeFiles';
import validateTypeFiles from './validateTypeFiles';

const mainValidate = (files, loadFile) => {
  const newFilesLenght = validateLengthFiles(files, loadFile);

  if (newFilesLenght.length === 0) return [];

  const newFilesSize = validateSizeFiles(newFilesLenght);

  if (newFilesSize.length === 0) return [];

  return validateTypeFiles(newFilesSize);
};
export default mainValidate;
