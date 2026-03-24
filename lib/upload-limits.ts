export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024 // 4 MiB

export const MAX_PROFILE_JSON_BYTES = MAX_UPLOAD_BYTES

export function formatMaxUploadMb(): string {
  return String(MAX_UPLOAD_BYTES / (1024 * 1024))
}
