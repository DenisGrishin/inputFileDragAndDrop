import '../style/style.scss'

import ValidateFiles from './validateFile/mainValidateFile.ts'
import { Toast } from './createElement/toast'
import CreateListItem from './createElement/CreateListItem.ts'
import { RemoveListItem } from './createElement/removeListItem.ts'
import { HandleSubmit } from './handle/handleSubmit.ts'

import { UploadDragAndDrop } from './handle/uploadDragAndDrop.ts'

type typeObjProps = {
  inputSelector: string
  fileListSelector: string
  handelDragAndDrop: {
    isDragAndDropEnabled: boolean
    dropZoneSelector: string
  }
}

export default class FileInput {
  // парметры инпута
  fileInput: HTMLInputElement | null
  listLoad: HTMLElement | null
  isDragAndDropEnabled = false
  dropZoneSelector = 'body'
  // =====
  uploadFileList: FileList | null
  CreateListItem: CreateListItem
  ValidateFiles: ValidateFiles
  toast: Toast
  removeListItem: RemoveListItem
  uploadDragAndDrop: UploadDragAndDrop
  constructor(objProps: typeObjProps) {
    // парметры инпута
    this.fileInput = document.querySelector(
      objProps.inputSelector,
    ) as HTMLInputElement
    this.listLoad = document.querySelector(objProps.fileListSelector)
    this.isDragAndDropEnabled = objProps.handelDragAndDrop.isDragAndDropEnabled
    this.dropZoneSelector = objProps.handelDragAndDrop.dropZoneSelector
    // =====
    this.uploadFileList = null
    this.CreateListItem = new CreateListItem()
    this.ValidateFiles = new ValidateFiles()
    this.toast = new Toast()
    this.removeListItem = new RemoveListItem()

    this.uploadDragAndDrop = new UploadDragAndDrop(
      this.listLoad,
      this.dropZoneSelector,
    )
  }

  initInputFile = () => {
    if (this.fileInput) {
      this.fileInput.addEventListener('change', this.handleUploadFile)
    }

    this.removeListItem.reomoveListLoadItem()
    if (this.isDragAndDropEnabled) {
      this.uploadDragAndDrop.initUploadDragAndDrop()
    }
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
  const fileInput = new FileInput({
    inputSelector: '#file-input',
    fileListSelector: '.list-load',
    handelDragAndDrop: {
      isDragAndDropEnabled: true,
      dropZoneSelector: 'body',
    },
  })
  fileInput.initInputFile()
})
//  делаем универсальный селктор
// 1. пердача элемент инпута чтоб свой протсовить слектор
// 2. слектор спсика файлов котрый заргузили
// 3. загрузка файла по DnD отключить включить
// 4.задать dropZone по дефолту стоит на body(весь экран)
