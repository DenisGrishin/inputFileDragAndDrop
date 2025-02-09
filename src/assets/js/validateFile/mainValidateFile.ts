import { errorItem, fileValidationRules } from '../../../types/index.type'

export default class ValidateFiles {
  errors: string[] = []
  errorItem: errorItem[] = []
  fileValidationRules
  constructor(fileValidationRules: fileValidationRules | undefined) {
    this.fileValidationRules = fileValidationRules
  }
  initValidate = (files: any, listLoad: HTMLElement | Element) => {
    this.errors = []
    this.errorItem = []
    if (files.length === 0) return []

    const newFilesLenght = this.fileValidationRules?.max
      ? this.validateLengthFiles(files, listLoad)
      : files

    if (newFilesLenght.length === 0) return [[], this.errors]

    const newFilesSize = this.fileValidationRules?.maxFileSize
      ? this.validateSizeFiles(newFilesLenght)
      : files

    if (newFilesSize.length === 0) return [[], this.errors]

    const newFileTupe = this.fileValidationRules?.type
      ? this.validateTypeFiles(newFilesSize)
      : files

    if (newFileTupe.length === 0) return [[], this.errors]

    return [newFileTupe, this.errors, this.errorItem]
  }

  validateLengthFiles = (files: any, listLoad: HTMLElement | Element) => {
    const maxLength = this.fileValidationRules?.max
    if (!maxLength) return files

    if (listLoad.children.length + files.length >= maxLength + 1) {
      this.errorItem.push({
        max: maxLength,
        type: 'maxFileUploads',
      })
      this.errors.push(
        `<b>Ошибка:</b> Превышено допустимое количество изображений: максимум ${maxLength}.`,
      )
    }
    if (listLoad.children.length === 0) {
      return files.length <= 5 ? files : files.slice(0, maxLength)
    }

    const noRepeatNameFiles = this.fileValidationRules?.isNameDuplicate
      ? this.valideteRepeatNameFile(files, listLoad)
      : files

    return noRepeatNameFiles.slice(0, maxLength - listLoad.children.length)
  }

  valideteRepeatNameFile = (files: any, loadFile: HTMLElement | Element) => {
    // собираем массив имен файлов уже загруженных в инпут
    const nameLoadFiles = Array.from(loadFile.querySelectorAll('li')).map(
      (item) => {
        const span = item.querySelector('span[data-name]') as HTMLElement
        return span.dataset.name
      },
    )

    const newFiles = files
      .map((file: any) => {
        if (nameLoadFiles.includes(file.name)) {
          this.errorItem.push({
            nameFile: file.name,
            type: 'duplicateName',
          })
          this.errors.push(
            `<b>Ошибка:</b> Изображение с таким <b>${file.name}</b>  именем уже существует.`,
          )

          return undefined
        }
        return file
      })
      .filter((it: any) => it !== undefined)
    return newFiles
  }

  validateSizeFiles = (files: any) => {
    if (!this.fileValidationRules) return files
    if (!this.fileValidationRules.maxFileSize) return files
    const maxSizeBytes = this.fileValidationRules.maxFileSize * 1024 * 1024

    const newFiles = files
      .map((file: any) => {
        if (file.size < maxSizeBytes) {
          return file
        }
        this.errorItem.push({
          nameFile: file.name,
          size: maxSizeBytes,
          type: 'maxFileSize',
        })
        this.errors.push(
          `<b>Ошибка:</b> Файл <b>"${file.name}"</b>  не загружен: превышен размер изображения.`,
        )

        return undefined
      })
      .filter((it: any) => it !== undefined)

    return newFiles
  }

  validateTypeFiles = (files: any) => {
    if (!this.fileValidationRules?.type) return files
    const allowedTypes = this.fileValidationRules?.type

    const newFiles = files
      .map((file: any) => {
        if (allowedTypes.includes(file.type)) {
          return file
        }

        this.errorItem.push({
          nameFile: file.name,
          typeFile: file.type,
          allowedFileTypes: allowedTypes,
          type: 'typeFile',
        })
        this.errors.push('<b>Ошибка:</b> Неверный формат файла.')

        return undefined
      })
      .filter((it: any) => it !== undefined)

    return newFiles
  }
}
