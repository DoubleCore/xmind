import { useState, useCallback } from 'react';
import { parseXMindFile } from '../utils/xmindParser';
import { useNavigate } from 'react-router-dom';
import { useMindMapStore } from '../store/mindMapStore';
import { FILE_SIZE_LIMITS } from '../utils/constants';

interface UploadProgress {
  loaded: number;
  total: number;
}

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const navigate = useNavigate();
  const { setMindMapData } = useMindMapStore();

  const updateProgress = ({ loaded, total }: UploadProgress) => {
    const percentage = Math.round((loaded / total) * 100);
    setProgress(percentage);
  };

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);
      setSelectedFile(file);
      setProgress(0);

      const mindMapData = await parseXMindFile(file, updateProgress);
      setMindMapData(mindMapData);
      navigate('/preview');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse XMind file');
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  }, [navigate, setMindMapData]);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
    setError(null);
    setProgress(0);
  }, []);

  return { 
    handleFileUpload,
    clearFile,
    isUploading,
    error,
    progress,
    selectedFile,
    maxFileSize: FILE_SIZE_LIMITS.MAX_SIZE_MB 
  };
}