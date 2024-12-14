export const FILE_SIZE_LIMITS = {
  MAX_SIZE_MB: 10,
  MAX_SIZE_BYTES: 10 * 1024 * 1024, // 10MB in bytes
} as const;

export const XMIND_MIME_TYPES = [
  'application/vnd.xmind.workbook',
  'application/x-xmind-workbook',
] as const;