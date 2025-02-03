export interface FileList {}
export type typeObjProps = {
  inputSelector: string
  fileListSelector: string
  handelDragAndDrop: {
    isDragAndDropEnabled: boolean
    dropZoneSelector: string
  }
  fileValidationRules?: fileValidationRules
}
export type fileValidationRules = {
  type?: string[]
  max?: number
  size?: number
  isNameDuplicate?: boolean
}
