export interface FileList {}

export type typeObjProps = {
  inputSelector: string
  fileListSelector: string
  dropZoneSelector?: string
  errorItem?: maxFileUploads | duplicateName | maxFileSize | typeFile
  fileValidationRules?: fileValidationRules
  toast?: {
    durationTime?: number
  }
  on?: {
    // События
    beforeValidation: (Event: Event, files: any) => void
    afterValidation: (Event: Event, files: any) => void
    beforeListCreate: (Event: Event, files: any) => void
    afterListCreate: (Event: Event, files: any) => void
    finalEvent: (Event: Event, files: any) => void
  }
}

export type errorItem = maxFileUploads | duplicateName | maxFileSize | typeFile
export type fileValidationRules = {
  type?: string[]
  max?: number
  maxFileSize?: number
  isNameDuplicate?: boolean
}

export type maxFileUploads = {
  max: number
  type: 'maxFileUploads'
}
export type duplicateName = {
  nameFile: string
  type: 'duplicateName'
}
export type maxFileSize = {
  nameFile: string
  size: number
  type: 'maxFileSize'
}
export type typeFile = {
  nameFile: string
  typeFile: string
  allowedFileTypes: string[]
  type: 'typeFile'
}
