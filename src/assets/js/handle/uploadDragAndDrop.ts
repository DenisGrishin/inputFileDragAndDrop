import ValidateFiles from '../validateFile/mainValidateFile'
import CreateListItem from '../createElement/CreateListItem'
import { Toast } from '../createElement/toast'

export class UploadDragAndDrop {
  ValidateFiles: ValidateFiles = new ValidateFiles()
  CreateListItem: CreateListItem = new CreateListItem()
  toast: Toast = new Toast()
  listLoad: HTMLElement | null
  dropZone: HTMLElement | null
  constructor(listLoad: HTMLElement | null, dropZoneSelector: string) {
    this.listLoad = listLoad
    this.dropZone = document.querySelector(dropZoneSelector) as HTMLElement
  }

  initUploadDragAndDrop = () => {
    if (this.dropZone) {
      // когда файл находится в окно браузера, добавляем класс
      this.dropZone.addEventListener('dragover', this.handleFileDragOver, false)
      // когда файл не находится в окно браузера, удаляем класс
      this.dropZone.addEventListener(
        'dragleave',
        this.handleFileDragLeave,
        false,
      )
      // отпускаем файл над зоной загрузки
      this.dropZone.addEventListener('drop', this.handleFileDrop, false)
    }
  }

  handleFileDragLeave = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    console.log(e.relatedTarget)

    if (!this.dropZone) return
    if (e.relatedTarget === null) {
      this.dropZone.classList.remove('_active')
    }
  }
  handleFileDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const draggedFile = e.dataTransfer

    if (!this.dropZone || !draggedFile) return

    this.dropZone.classList.remove('_active')

    const { files } = draggedFile

    if (this.listLoad && files.length !== 0) {
      const [newFiles, errors] = this.ValidateFiles.initValidate(
        Array.from(files),
        this.listLoad,
      )

      this.CreateListItem.createItem(newFiles)

      this.toast.createToast(errors)
    }
  }

  handleFileDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const draggedElement = e.dataTransfer?.items[0]
    if (this.dropZone && draggedElement) {
      this.dropZone.classList.add('_active')
    }
  }
}
