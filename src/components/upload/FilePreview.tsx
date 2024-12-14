import React from 'react';
import { X, FileType } from 'lucide-react';
import { formatFileSize } from '../../utils/formatters';

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  return (
    <div className="mt-4 p-4 bg-white rounded-lg border flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FileType className="w-8 h-8 text-indigo-500" />
        <div>
          <p className="font-medium text-gray-900">{file.name}</p>
          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-gray-100 rounded-full"
        aria-label="Remove file"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}