import ValidateFiles from '../validateFile/mainValidateFile'
import CreateListItem from '../createElement/CreateListItem'
import { Toast } from '../createElement/toast'
import { fileValidationRules } from '../../../types/index.type'

export class UploadDragAndDrop {
  ValidateFiles: ValidateFiles
  CreateListItem: CreateListItem = new CreateListItem()
  toast: Toast = new Toast()
  listLoad: HTMLElement | null
  dropZone: HTMLElement | null
  fileValidationRules
  constructor(
    listLoad: HTMLElement | null,
    dropZoneSelector: string | undefined,
    fileValidationRules: fileValidationRules | undefined,
  ) {
    this.listLoad = listLoad

    this.dropZone = document.querySelector(
      dropZoneSelector || '',
    ) as HTMLElement
    this.fileValidationRules = fileValidationRules
    this.ValidateFiles = new ValidateFiles(this.fileValidationRules)
  }

  initUploadDragAndDrop = () => {
    if (this.dropZone) {
      // когда файл находится в окно браузера, добавляем класс
      this.dropZone.addEventListener('dragover', this.handleFileDragOver)
      // когда файл не находится в окно браузера, удаляем класс
      this.dropZone.addEventListener('dragleave', this.handleFileDragLeave)
      // отпускаем файл над зоной загрузки
      this.dropZone.addEventListener('drop', this.handleFileDrop)
    }
  }

  handleFileDragLeave = (e: DragEvent) => {
    e.preventDefault()

    if (this.dropZone) {
      this.dropZone.classList.remove('_active')
    }
  }
  handleFileDrop = (e: DragEvent) => {
    e.preventDefault()

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

    const draggedElement = e.dataTransfer?.items[0]
    if (this.dropZone && draggedElement) {
      this.dropZone.classList.add('_active')
    }
  }
}
