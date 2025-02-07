export interface FileList {}
export type typeObjProps = {
  inputSelector: string
  fileListSelector: string
  dropZoneSelector?: string
  fileValidationRules?: fileValidationRules
  toast?: {
    durationTime?: number
  }
}
export type fileValidationRules = {
  type?: string[]
  max?: number
  size?: number
  isNameDuplicate?: boolean
}
