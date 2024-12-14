import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MindMapViewer } from '../components/mindmap/MindMapViewer';
import { useMindMapStore } from '../store/mindMapStore';
import { ExportMenu } from '../components/export/ExportMenu';

function Preview() {
  const [scale, setScale] = useState(1);
  const { mindMapData } = useMindMapStore();

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));

  const handleExport = (format: 'xmind' | 'png' | 'jpg') => {
    // TODO: 实现导出功能
    console.log('Exporting as:', format);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
          Back
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Zoom out"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-sm text-gray-600">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Zoom in"
          >
            <ZoomIn size={20} />
          </button>
          <ExportMenu onExport={handleExport} disabled={!mindMapData} />
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-gray-50 overflow-auto">
        {mindMapData ? (
          <MindMapViewer data={mindMapData} scale={scale} />
        ) : (
          <div className="min-h-full p-8 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-500">Upload an XMind file to preview</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Preview;