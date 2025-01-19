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
    this.root?.addEventListener('dragover', this.handleFileDragOver, false)
    // когда файл не находится в окно браузера, удаляем класс
    this.root?.addEventListener('dragleave', this.handleFileDragLeave, false)
    // отпускаем файл над зоной загрузки
    this.root?.addEventListener('drop', this.handleFileDrop, false)
  }

  handleFileDragLeave = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    this.root?.classList.remove('_active')
  }
  handleFileDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    this.root?.classList.remove('_active')
    const draggedFile = e.dataTransfer
    const { files } = draggedFile
    debugger
    // const newFiles = mainValidate(Array.from(files), listLoadFile)
    // createListLoadItem(newFiles, listLoadFile)
    // showToast()

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

    this.root?.classList.add('_active')
  }
}
