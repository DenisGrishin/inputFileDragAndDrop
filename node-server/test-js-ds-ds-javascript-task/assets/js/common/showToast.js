import createToast from '../createElement/createToast';

const arrText = [];

export const showToast = () => {
  createToast(arrText);
  arrText.length = 0;
};

export const addTextToast = (textItem) => {
  arrText.push(textItem);
};
