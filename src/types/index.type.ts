export interface FileList {}
export type typeObjProps = {
  inputSelector: string
  fileListSelector: string
  dropZoneSelector?: string
  fileValidationRules?: fileValidationRules
}
export type fileValidationRules = {
  type?: string[]
  max?: number
  size?: number
  isNameDuplicate?: boolean
}
