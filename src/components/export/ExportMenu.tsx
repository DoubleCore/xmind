import React, { useState } from 'react';
import { Download, FileType, Image } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useMindMapStore } from '../../store/mindMapStore';

interface ExportMenuProps {
  onExport: (format: 'xmind' | 'png' | 'jpg') => void;
  disabled?: boolean;
}

export function ExportMenu({ onExport, disabled }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mindMapData } = useMindMapStore();

  const handleExport = async (format: 'xmind' | 'png' | 'jpg') => {
    if (!mindMapData) return;

    try {
      let blob: Blob;
      let filename: string;

      switch (format) {
        case 'xmind':
          // 导出原始 XMind 文件
          blob = new Blob([JSON.stringify(mindMapData)], { type: 'application/vnd.xmind.workbook' });
          filename = 'mindmap.xmind';
          break;

        case 'png':
        case 'jpg':
          // 获取画布元素并转换为图片
          const canvas = document.querySelector('.mind-map-container canvas') as HTMLCanvasElement;
          if (!canvas) throw new Error('Canvas not found');

          const dataUrl = canvas.toDataURL(`image/${format}`);
          const base64Data = dataUrl.split(',')[1];
          blob = base64ToBlob(base64Data, `image/${format}`);
          filename = `mindmap.${format}`;
          break;

        default:
          throw new Error('Unsupported format');
      }

      // 创建下载链接并触发下载
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      onExport(format);
      setIsOpen(false);
    } catch (error) {
      console.error('Export failed:', error);
      // 这里可以添加错误提示
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg",
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        )}
      >
        <Download size={16} />
        Export
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-10">
          <button
            onClick={() => handleExport('xmind')}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50"
          >
            <FileType size={16} />
            XMind
          </button>
          <button
            onClick={() => handleExport('png')}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50"
          >
            <Image size={16} />
            PNG
          </button>
          <button
            onClick={() => handleExport('jpg')}
            className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50"
          >
            <Image size={16} />
            JPG
          </button>
        </div>
      )}
    </div>
  );
}

// 辅助函数：将 base64 转换为 Blob
function base64ToBlob(base64: string, type: string): Blob {
  const binStr = window.atob(base64);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  
  return new Blob([arr], { type });
}