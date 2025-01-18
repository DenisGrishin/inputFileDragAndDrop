export default class ValidateFiles {
  initValidate = (files: any, listLoad: HTMLElement) => {
    if (files.length === 0) return []

    const newFilesLenght = this.validateLengthFiles(files, listLoad)
    if (newFilesLenght.length === 0) return []

    const newFilesSize = this.validateSizeFiles(newFilesLenght)
    if (newFilesSize.length === 0) return []

    return this.validateTypeFiles(newFilesSize)
  }

  validateLengthFiles = (files: any, listLoad: HTMLElement) => {
    const maxLength = 5

    if (listLoad.children.length + files.length >= maxLength + 1) {
      alert(
        '<b>Ошибка:</b> Превышено допустимое количество изображений: максимум 5.',
      )
      // addTextToast(
      //   '<b>Ошибка:</b> Превышено допустимое количество изображений: максимум 5.',
      // )
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
          alert(
            `<b>Ошибка:</b> Изображение с таким ${file.name} именем уже существует.`,
          )
          // addTextToast(
          //   `<b>Ошибка:</b> Изображение с таким ${file.name} именем уже существует.`,
          // )
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
        alert(
          `<b>Ошибка:</b> Файл "${file.name}" не загружен: превышен размер изображения.`,
        )
        // addTextToast(
        //   `<b>Ошибка:</b> Файл "${file.name}" не загружен: превышен размер изображения.`,
        // )
        return undefined
      })
      .filter((it: any) => it !== undefined)

    return newFiles
  }
  // переписать
  validateTypeFiles = (files: any) => {
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png']

    const newFiles = files
      .map((file: any) => {
        if (allowedTypes.includes(file.type)) {
          return file
        }
        alert(
          '<b>Ошибка:</b> Неверный формат файла. Разрешены только JPG,JPEG, PNG.',
        )
        // addTextToast(
        //   '<b>Ошибка:</b> Неверный формат файла. Разрешены только JPG,JPEG, PNG.',
        // )

        return undefined
      })
      .filter((it: any) => it !== undefined)

    return newFiles
  }
}
