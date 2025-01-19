import { findMaxNumId } from '../common/functions';

// Удалить уведомления
const removeToast = (id) => {
  const item = document.getElementById(`toast-${id}`);

  setTimeout(() => {
    item.remove();
  }, 10000);
  setTimeout(() => {
    item.firstElementChild.classList.add('_lineProgress');
  }, 30);
};

const createToast = (arrText, IsSuccess = false) => {
  const toast = document.querySelector('.toast');
  let idCount = findMaxNumId(toast.children);

  if (toast) {
    arrText.forEach((text) => {
      toast.insertAdjacentHTML(
        'beforeend',
        ` <div class="toast__item" id="toast-${(idCount += 1)}" >
      			<div class="toast__wrapper-item ${
              IsSuccess ? '_success' : ''
            }"> <span> ${text}</span></div>
    			</div>`
      );
      removeToast(idCount);
    });
  }
};
export default createToast;
