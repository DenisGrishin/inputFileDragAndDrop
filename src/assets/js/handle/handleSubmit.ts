import { RemoveListItem } from '../createElement/removeListItem'
import { Toast } from '../createElement/toast'

export class HandleSubmit {
  fileInput: HTMLInputElement | null
  listLoad: HTMLElement | null
  toast: Toast
  removeListItem: RemoveListItem
  constructor() {
    this.fileInput = document.getElementById('file-input') as HTMLInputElement
    this.listLoad = document.querySelector('.list-load')
    this.toast = new Toast()
    this.removeListItem = new RemoveListItem()
  }
  sendFile = () => {
    const form = document.querySelector('.upload-file__form')
    const fileInput = this.fileInput as HTMLInputElement
    const listLoad = this.listLoad

    if (form && fileInput && listLoad) {
      form.addEventListener('submit', (event) => {
        event.preventDefault()
        if (!fileInput.files) return

        this.sortFile(fileInput, listLoad)

        const formData = new FormData()

        if (fileInput.files.length === 0) {
          this.toast.createToast([
            '<b>Ошибка:</b> Файлы не загружены. Попробуйте снова.',
          ])
          return
        }

        for (let i = 0; i < fileInput.files.length; i += 1) {
          formData.append('files', fileInput.files[i])
        }

        form.classList.add('_preloader')
        listLoad.classList.add('_preloader')

        fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Сетевая ошибка')
            }
            return response.json()
          })
          .then((data) => {
            // имитация лоадера,т.к node отправляет мгновенно файлы
            this.resetStatus(form, listLoad)
            fileInput.value = ''
            console.log('Ответ от сервера:', data)
          })
          .catch((error) => {
            console.error('Ошибка:', error)
            console.error(
              'Ошибка:',
              'нужно скачать сервер с репозитория https://github.com/DenisGrishin/node_server',
            )
          })
      })
    }
  }

  resetStatus = (form: Element, listLoadFile: HTMLElement) => {
    setTimeout(() => {
      form.classList.remove('_preloader')
      listLoadFile.classList.remove('_preloader')
      this.removeListItem.removeAllLoadFile()

      this.toast.createToast(['Отправлено успешно.'], true)
    }, 1000)
  }

  sortFile = (fileInput: HTMLInputElement, listLoadFile: HTMLElement) => {
    const files = Array.from(fileInput.files)
    if (files.length === 0) return
    const arrLoadName = Array.from(listLoadFile.children).map((it) => {
      const name = it.querySelector('li span[data-name]') as HTMLElement
      if (name) {
        return name.dataset.name
      }
    })
    const newFile = files.map((element, indx) =>
      files.filter((it) => it.name === arrLoadName[indx]).pop(),
    )

    const dataTransfer = new DataTransfer()

    newFile.forEach((file) => {
      if (file) {
        dataTransfer.items.add(file)
      }
    })

    fileInput.files = dataTransfer.files
  }
}
