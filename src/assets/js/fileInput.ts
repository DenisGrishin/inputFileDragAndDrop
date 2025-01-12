import CreateListLoadItem from './createElement/CreateListItem.ts'

export default class FileInput {
  protected fileInput: HTMLInputElement | null
  protected listLoad: HTMLElement | null
  protected itemListLoad: NodeListOf<HTMLElement>
  protected uploadFileList: FileList | null
  constructor() {
    this.fileInput = document.getElementById('file-input') as HTMLInputElement
    this.listLoad = document.querySelector('.list-load')
    this.itemListLoad = document.querySelectorAll('.list-load__item')
    this.uploadFileList = null
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
      new CreateListLoadItem(this.uploadFileList).createlistLoad()
    }
  }
}
