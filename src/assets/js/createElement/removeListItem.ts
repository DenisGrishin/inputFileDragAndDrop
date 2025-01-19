import CreateListItem from './CreateListItem'

export class RemoveListItem extends CreateListItem {
  reomoveListLoadItem = () => {
    this.listLoad?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement

      if (target && target.classList.contains('list-load__btn')) {
        if (target && target.classList.contains('list-load__btn')) {
          const parentElement = target.parentElement
          if (parentElement) {
            this.removeFile(parentElement.id)
            document.getElementById(parentElement.id)?.remove()
          }
        }
      }

      if (this.listLoad && this.listLoad.children.length === 0) {
        this.listLoad.classList.remove('_show')
      }
    })
  }

  removeFile = (id: any) => {
    const loadNamefile = document.querySelector(
      `#${id} span[data-name]`,
    ) as HTMLElement

    const dataName = loadNamefile?.dataset.name

    const fileInput = this.fileInput

    if (fileInput && dataName && fileInput.files) {
      const files = Array.from(fileInput.files)

      const updateFile = files
        .map((file) => {
          if (!dataName.includes(file.name)) {
            return file
          }
          return undefined
        })
        .filter((file) => file !== undefined)

      const dataTransfer = new DataTransfer()

      updateFile.forEach((file) => {
        dataTransfer.items.add(file)
      })

      fileInput.files = dataTransfer.files
    }
  }

  removeAllLoadFile = () => {
    if (!this.listLoad || this.listLoad.children.length === 0) return

    Array.from(this.listLoad.children).forEach((file) => file.remove())
    this.listLoad?.classList.remove('_show')
  }
}
