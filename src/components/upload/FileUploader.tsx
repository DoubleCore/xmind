import React, { useCallback } from 'react';
import { useFileUpload } from '../../hooks/useFileUpload';
import { UploadDropzone } from './UploadDropzone';
import { FilePreview } from './FilePreview';
import { ProgressBar } from './ProgressBar';
import { ErrorBoundary } from '../error/ErrorBoundary';

export function FileUploader() {
  const {
    handleFileUpload,
    clearFile,
    isUploading,
    error,
    progress,
    selectedFile,
    maxFileSize
  } = useFileUpload();

  const onFileSelect = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  return (
    <ErrorBoundary>
      <div className="w-full max-w-2xl mx-auto">
        {!selectedFile && (
          <UploadDropzone onFileSelect={onFileSelect} isUploading={isUploading} />
        )}
        
        {selectedFile && (
          <FilePreview file={selectedFile} onRemove={clearFile} />
        )}
        
        {isUploading && <ProgressBar progress={progress} />}
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Supported format: .xmind (Max size: {maxFileSize}MB)</p>
        </div>
      </div>
    </ErrorBoundary>
  );
}