import { FILE_SIZE_LIMITS, XMIND_MIME_TYPES } from './constants';

export function validateFileSize(file: File): string | null {
  if (file.size > FILE_SIZE_LIMITS.MAX_SIZE_BYTES) {
    return `File size exceeds ${FILE_SIZE_LIMITS.MAX_SIZE_MB}MB limit`;
  }
  return null;
}

export function validateFileType(file: File): string | null {
  if (!file.name.endsWith('.xmind')) {
    return 'Invalid file type. Please upload an XMind file';
  }
  return null;
}