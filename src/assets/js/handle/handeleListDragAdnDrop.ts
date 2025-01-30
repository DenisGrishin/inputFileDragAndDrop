import CreateListItem from '../createElement/CreateListItem.ts'
import { UploadDragAndDrop } from './uploadDragAndDrop.ts'

export class HandeleListDragAdnDrop extends CreateListItem {
  root: HTMLElement | null = document.getElementById('root')
  uploadDragAndDrop: UploadDragAndDrop = new UploadDragAndDrop()

  initHandeleListDragAdnDrop = () => {
    //  события когда элемент находиться над другим
    this.listLoad?.addEventListener('dragover', this.handleDragOver)
    // отпускаем и удаляем класс
    this.listLoad?.addEventListener('dragend', this.handleDragEnd)
    //  хватаем  элемент и даем ему класс
    this.listLoad?.addEventListener('dragstart', this.handleDragStart)
  }

  handleDragOver = (e: any) => {
    e.preventDefault()

    const activeElement = this.listLoad?.querySelector('._chosen')

    if (this.root) document.body.classList.remove('_active')
    if (!activeElement) return

    const currentElement = e.target

    const isMoveable =
      activeElement !== currentElement &&
      currentElement.classList.contains('list-load__item')

    if (!isMoveable) {
      return
    }

    const nextElement =
      currentElement === activeElement.nextElementSibling
        ? currentElement.nextElementSibling
        : currentElement

    this.listLoad?.insertBefore(activeElement, nextElement)
  }
  handleDragEnd = (e: any) => {
    e.target.classList.remove('_chosen')
    if (!this.root) return
    this.root.addEventListener(
      'dragover',
      this.uploadDragAndDrop.handleFileDragOver,
      false,
    )
  }
  handleDragStart = (e: any) => {
    e.target.classList.add('_chosen')
  }
}
