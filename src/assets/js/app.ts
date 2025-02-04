import '../style/style.scss'

import ValidateFiles from './validateFile/mainValidateFile.ts'
import { Toast } from './createElement/toast'
import CreateListItem from './createElement/CreateListItem.ts'
import { RemoveListItem } from './createElement/removeListItem.ts'
import { HandleSubmit } from './handle/handleSubmit.ts'

import { UploadDragAndDrop } from './handle/uploadDragAndDrop.ts'
import { fileValidationRules, typeObjProps } from '../../types/index.type.ts'

export default class FileInput {
  // парметры инпута
  fileInput: HTMLInputElement | null
  listLoad: HTMLElement | null

  dropZoneSelector: string | undefined
  fileValidationRules: fileValidationRules | undefined
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

    this.dropZoneSelector = objProps.dropZoneSelector
    this.fileValidationRules = objProps.fileValidationRules
    // =====
    this.uploadFileList = null
    this.CreateListItem = new CreateListItem()
    this.ValidateFiles = new ValidateFiles(this.fileValidationRules)
    this.toast = new Toast()
    this.removeListItem = new RemoveListItem()
    this.uploadDragAndDrop = new UploadDragAndDrop(
      this.listLoad,
      this.dropZoneSelector,
      this.fileValidationRules,
    )
  }

  initInputFile = () => {
    if (this.fileInput) {
      this.fileInput.addEventListener('change', this.handleUploadFile)
    }

    this.removeListItem.reomoveListLoadItem()
    if (this.dropZoneSelector) {
      this.uploadDragAndDrop.initUploadDragAndDrop()
    }
  }

  handleUploadFile = (event: Event) => {
    const target = event.target as HTMLInputElement

    if (target.files) {
      this.uploadFileList = target.files

      if (this.listLoad && this.fileValidationRules) {
        const [files, errors] = this.ValidateFiles.initValidate(
          Array.from(target.files),
          this.listLoad,
        )

        this.CreateListItem.createItem(files)

        this.toast.createToast(errors)
      } else {
        this.CreateListItem.createItem(Array.from(target.files))
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const fileInput = new FileInput({
    inputSelector: '#file-input',
    fileListSelector: '.list-load',
    dropZoneSelector: '.upload-file__wrapper-input',
    fileValidationRules: {
      type: ['image/jpg', 'image/jpeg', 'image/png'],
      isNameDuplicate: true,
      max: 3,
      size: 3.5,
    },
    // toast: {},
  })
  fileInput.initInputFile()
})
// ! add HandleSubmit
//  делаем универсальный селктор
// 1. пердача элемент инпута чтоб свой протсовить слектор
// 2. слектор спсика файлов котрый заргузили
// 3. загрузка файла по DnD отключить включить
// 4.задать dropZone по дефолту стоит на body(весь экран)
// валидацию
// 1.валидация вкл/выкл
// 2.валидация по кол-ву
// 3.валидация по размеру, указывать в мб где 0,1 это 100кб
// 4.валидация по вторению имени
// сдлеать чтоб можно бло задвать тостом свои текста
// 1. сдлеать саксес линию прогреса
// 2. установливать таймер
// сдеалть чтоб списку более универсальный
