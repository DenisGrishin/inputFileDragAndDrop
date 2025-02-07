import { findMaxNumId } from '../common/functions'

export class Toast {
  createToast = (
    arrText: string[],
    durationTime: number | undefined,
    IsSuccess: boolean = false,
  ) => {
    const toast = document.querySelector('.toast')
    if (!toast) return
    let idCount = findMaxNumId(toast.children)
    const animTime = durationTime ? durationTime : 0

    const styleTransition = `transition-property:width;transition-duration: ${animTime}ms;transition-timing-function: linear;`

    if (toast) {
      arrText.forEach((text) => {
        toast.insertAdjacentHTML(
          'afterbegin',
          ` <div class="toast__item" id="toast-${(idCount += 1)}" >
              <div class="toast__wrapper-item ${
                IsSuccess ? '_success' : ''
              }"> <span> ${text}</span>
              <div class='toast__progress-row' style="${styleTransition}"></div>
              </div>
              
            </div>`,
        )

        this.removeToast(idCount, animTime)
      })
    }
  }

  removeToast = (id: number, animTime: number) => {
    const item = document.getElementById(`toast-${id}`)
    if (!item) return

    setTimeout(() => {
      item.remove()
    }, animTime)

    setTimeout(() => {
      item
        .querySelector('.toast__progress-row')
        ?.classList.add('_startProgress')
    }, 30)
  }
}
