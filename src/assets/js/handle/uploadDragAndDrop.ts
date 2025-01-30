import ValidateFiles from '../validateFile/mainValidateFile'
import CreateListItem from '../createElement/CreateListItem'
import { Toast } from '../createElement/toast'

export class UploadDragAndDrop {
  root: HTMLElement | null = document.getElementById('root')
  ValidateFiles: ValidateFiles = new ValidateFiles()
  CreateListItem: CreateListItem = new CreateListItem()
  toast: Toast = new Toast()
  listLoad = document.querySelector('.list-load')
  initUploadDragAndDrop = () => {
    // когда файл находится в окно браузера, добавляем класс
    document.body.addEventListener('dragover', this.handleFileDragOver, false)
    // когда файл не находится в окно браузера, удаляем класс
    document.body.addEventListener('dragleave', this.handleFileDragLeave, false)
    // отпускаем файл над зоной загрузки
    document.body.addEventListener('drop', this.handleFileDrop, false)
  }

  handleFileDragLeave = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.relatedTarget === null) {
      document.body.classList.remove('_active')
    }
  }
  handleFileDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    document.body.classList.remove('_active')
    const draggedFile = e.dataTransfer
    const { files } = draggedFile

    if (this.listLoad) {
      const [newFiles, errors] = this.ValidateFiles.initValidate(
        Array.from(files),
        this.listLoad,
      )

      this.CreateListItem.createItem(newFiles)

      this.toast.createToast(errors)
    }
  }

  handleFileDragOver = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const draggedElement = e.dataTransfer?.items[0]
    if (draggedElement) {
      document.body.classList.add('_active')
    }
  }
}
