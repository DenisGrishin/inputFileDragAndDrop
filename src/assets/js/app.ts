import '../style/style.scss'

import ValidateFiles from './validateFile/mainValidateFile.ts'
import { Toast } from './createElement/toast'
import CreateListItem from './createElement/CreateListItem.ts'
import { RemoveListItem } from './createElement/removeListItem.ts'
import { HandleSubmit } from './handle/handleSubmit.ts'

export default class FileInput {
  fileInput: HTMLInputElement | null
  listLoad: HTMLElement | null
  itemListLoad: NodeListOf<HTMLElement>
  uploadFileList: FileList | null
  CreateListItem: CreateListItem
  ValidateFiles: ValidateFiles
  toast: Toast
  removeListItem: RemoveListItem
  handleSubmit: HandleSubmit
  constructor() {
    this.fileInput = document.getElementById('file-input') as HTMLInputElement
    this.listLoad = document.querySelector('.list-load')
    this.itemListLoad = document.querySelectorAll('.list-load li')
    this.uploadFileList = null
    this.CreateListItem = new CreateListItem()
    this.ValidateFiles = new ValidateFiles()
    this.toast = new Toast()
    this.removeListItem = new RemoveListItem()
    this.handleSubmit = new HandleSubmit()
  }

  initInputFile = () => {
    if (this.fileInput) {
      this.fileInput.addEventListener('change', this.handleUploadFile)
    }

    this.removeListItem.reomoveListLoadItem()

    this.handleSubmit.sendFile()
  }

  handleUploadFile = (event: Event) => {
    const target = event.target as HTMLInputElement

    if (target.files) {
      this.uploadFileList = target.files

      if (this.listLoad) {
        const [files, errors] = this.ValidateFiles.initValidate(
          Array.from(target.files),
          this.listLoad,
        )

        this.CreateListItem.createItem(files)

        this.toast.createToast(errors)
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const fileInput = new FileInput()
  fileInput.initInputFile()
})
// ! 1. сдлеать  чтоб список сам создавасял загрженных файлов
// ! 2. Сортировка файла на почту
