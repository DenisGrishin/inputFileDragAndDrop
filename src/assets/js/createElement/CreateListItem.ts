import { findMaxNumId } from '../common/functions.ts'

export default class CreateListItem {
  fileInput: HTMLInputElement | null
  listLoad: HTMLElement | null
  itemListLoad: NodeListOf<HTMLElement>

  constructor() {
    this.fileInput = document.getElementById('file-input') as HTMLInputElement
    this.listLoad = document.querySelector('.list-load')
    this.itemListLoad = document.querySelectorAll('.list-load__item')
  }

  createItem = (uploadFileList: any) => {
    if (!this.listLoad || uploadFileList?.length === 0 || !uploadFileList)
      return

    this.listLoad.classList.add('_show')

    let idCount = findMaxNumId(this.listLoad.children)

    Array.from(uploadFileList).forEach((file: any) => {
      const raeder = new FileReader()

      const li = document.createElement('li')
      li.id = `loadFile-${(idCount += 1)}`
      li.classList.add('list-load__item')
      const img = document.createElement('img')
      img.draggable = false
      const spanImg = document.createElement('span')
      spanImg.appendChild(img)

      raeder.onload = () => {
        img.setAttribute('src', String(raeder.result))
        this.createBigPreviewFile(img, li)
        li.prepend(spanImg)
      }

      this.createInfoAndBtnDel(file, li)
      this.listLoad?.appendChild(li)

      raeder.readAsDataURL(file)
    })
  }

  createInfoAndBtnDel = (file: any, li: HTMLElement) => {
    const { name, size } = file

    const nameAndType = name.split('.')
    const fileSizeInMegabytes = `${(Number(size) / 1048576).toFixed(2)} MB`

    ;[
      nameAndType[0],
      fileSizeInMegabytes,
      nameAndType[1].toUpperCase(),
    ].forEach((item, indx) => {
      const span = document.createElement('span')

      if (indx === 0) {
        span.dataset.name = name
      }

      span.innerText = item
      li.appendChild(span)
    })

    const button = document.createElement('button')
    button.classList.add('list-load__btn')
    button.type = 'button'
    li.appendChild(button)
  }

  createBigPreviewFile = (img: HTMLElement, li: HTMLElement) => {
    const span = document.createElement('span')
    li.prepend(span)
    const cloneImg = img.cloneNode(true)
    span.appendChild(cloneImg)
  }
}
