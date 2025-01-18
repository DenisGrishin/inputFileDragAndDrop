import { Toast } from '../createElement/toast'

export default class ValidateFiles {
  errors: string[] = []

  initValidate = (files: any, listLoad: HTMLElement) => {
    if (files.length === 0) return []

    const newFilesLenght = this.validateLengthFiles(files, listLoad)

    if (newFilesLenght.length === 0) return [[], this.errors]

    const newFilesSize = this.validateSizeFiles(newFilesLenght)

    if (newFilesSize.length === 0) return [[], this.errors]

    const newFileTupe = this.validateTypeFiles(newFilesSize)

    if (newFileTupe.length === 0) return [[], this.errors]

    return [newFileTupe, this.errors]
  }

  validateLengthFiles = (files: any, listLoad: HTMLElement) => {
    const maxLength = 5

    if (listLoad.children.length + files.length >= maxLength + 1) {
      this.errors.push(
        '<b>Ошибка:</b> Превышено допустимое количество изображений: максимум 5.',
      )
    }
    if (listLoad.children.length === 0) {
      return files.length <= 5 ? files : files.slice(0, maxLength)
    }

    const noRepeatNameFiles = this.valideteRepeatNameFile(files, listLoad)

    return noRepeatNameFiles.slice(0, maxLength - listLoad.children.length)
  }

  valideteRepeatNameFile = (files: any, loadFile: HTMLElement) => {
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
    const maxSizeBytes = 10 * 1024 * 1024

    const newFiles = files
      .map((file: any) => {
        if (file.size < maxSizeBytes) {
          return file
        }

        this.errors.push(
          `<b>Ошибка:</b> Файл <b>"${file.name}"</b>  не загружен: превышен размер изображения.`,
        )

        return undefined
      })
      .filter((it: any) => it !== undefined)

    return newFiles
  }

  validateTypeFiles = (files: any) => {
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png']

    const newFiles = files
      .map((file: any) => {
        if (allowedTypes.includes(file.type)) {
          return file
        }
        this.errors.push(
          '<b>Ошибка:</b> Неверный формат файла. Разрешены только JPG,JPEG, PNG.',
        )

        return undefined
      })
      .filter((it: any) => it !== undefined)

    return newFiles
  }
}
