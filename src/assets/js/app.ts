import '../style/style.scss'

import ValidateFiles from './validateFile/mainValidateFile.ts'
import { Toast } from './createElement/toast'
import CreateListItem from './createElement/CreateListItem.ts'

export default class FileInput {
  protected fileInput: HTMLInputElement | null
  protected listLoad: HTMLElement | null
  protected uploadFileList: FileList | null
  protected CreateListItem: CreateListItem
  protected ValidateFiles: ValidateFiles
  protected toast: Toast
  protected itemListLoad: NodeListOf<HTMLElement>
  constructor() {
    this.fileInput = document.getElementById('file-input') as HTMLInputElement
    this.listLoad = document.querySelector('.list-load')
    this.itemListLoad = document.querySelectorAll('.list-load li')
    this.uploadFileList = null
    this.CreateListItem = new CreateListItem()
    this.ValidateFiles = new ValidateFiles()
    this.toast = new Toast()
  }

  initInputFile = () => {
    if (this.fileInput) {
      this.fileInput.addEventListener('change', this.handleUploadFile)
    }
  }

  handleUploadFile = (event: Event) => {
    const target = event.target as HTMLInputElement

    if (target.files) {
      this.uploadFileList = target.files

      const [files, errors] = this.ValidateFiles.initValidate(
        Array.from(target.files),
        this.listLoad,
      )

      this.CreateListItem.createItem(files)

      this.toast.createToast(errors)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const fileInput = new FileInput()
  fileInput.initInputFile()
})
