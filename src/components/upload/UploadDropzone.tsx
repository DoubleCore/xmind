import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '../../utils/cn';

interface UploadDropzoneProps {
  onFileSelect: (files: FileList | null) => void;
  isUploading: boolean;
}

export function UploadDropzone({ onFileSelect, isUploading }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    onFileSelect(e.dataTransfer.files);
  }, [onFileSelect]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
        isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-500",
        isUploading && "opacity-50 cursor-not-allowed"
      )}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={(e) => onFileSelect(e.target.files)}
        accept=".xmind"
        disabled={isUploading}
      />
      <label
        htmlFor="file-upload"
        className={cn(
          "cursor-pointer flex flex-col items-center",
          isUploading && "pointer-events-none"
        )}
      >
        <Upload className="w-12 h-12 text-indigo-500 mb-4" />
        <p className="text-lg font-medium mb-2">
          {isUploading ? 'Uploading...' : 'Drop your XMind file here'}
        </p>
        <p className="text-sm text-gray-500">
          or click to select
        </p>
      </label>
    </div>
  );
}