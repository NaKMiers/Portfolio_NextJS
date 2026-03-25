export type IconPickerTarget =
  | { kind: 'skill'; groupIndex: number; itemIndex: number }
  | { kind: 'service'; serviceIndex: number }
  | { kind: 'social'; socialIndex: number }
  | null

export type UploadingState = {
  avatar: boolean
  background: boolean
  cv: boolean
  projects: Record<number, boolean>
}

