import { findMaxNumId } from '../common/functions'

export class Toast {
  createToast = (arrText: string[], IsSuccess: boolean = false) => {
    const toast = document.querySelector('.toast')
    if (!toast) return
    let idCount = findMaxNumId(toast.children)

    if (toast) {
      arrText.forEach((text) => {
        toast.insertAdjacentHTML(
          'beforeend',
          ` <div class="toast__item" id="toast-${(idCount += 1)}" >
              <div class="toast__wrapper-item ${
                IsSuccess ? '_success' : ''
              }"> <span> ${text}</span></div>
            </div>`,
        )
        this.removeToast(idCount)
      })
    }
  }

  removeToast = (id: number) => {
    const item = document.getElementById(`toast-${id}`)
    if (!item) return

    setTimeout(() => {
      item.remove()
    }, 10000)
    setTimeout(() => {
      item.firstElementChild?.classList.add('_lineProgress')
    }, 30)
  }
}
