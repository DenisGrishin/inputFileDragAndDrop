// const mainValidate = (files, loadFile) => {
//   const newFilesLenght = validateLengthFiles(files, loadFile)

//   if (newFilesLenght.length === 0) return []

//   const newFilesSize = validateSizeFiles(newFilesLenght)

//   if (newFilesSize.length === 0) return []

//   return validateTypeFiles(newFilesSize)
// }
// export default mainValidate

export default class ValidateFile {
  listFile: FileList | [] = []
  constructor(listFile: FileList) {
    this.listFile = listFile
  }

  initValidate = () => {
    if (this.listFile.length === 0) return []
  }

  // validateSizeFiles = (files: any) => {
  //   const maxSizeBytes = 10 * 1024 * 1024

  //   const newFiles = files
  //     .map((file: any) => {
  //       if (file.size < maxSizeBytes) {
  //         return file
  //       }

  //       // addTextToast(
  //       //   `<b>Ошибка:</b> Файл "${file.name}" не загружен: превышен размер изображения.`,
  //       // )
  //       return undefined
  //     })
  //     .filter((file: any) => file !== undefined)

  //   return newFiles
  // }
}
