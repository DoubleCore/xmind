import React from 'react';
import { MindMapNode } from '../../types/mindMap';
import { MindMapRenderer } from '../renderer/MindMapRenderer';

interface MindMapViewerProps {
  data: MindMapNode;
  scale: number;
}

export function MindMapViewer({ data, scale }: MindMapViewerProps) {
  const handleNodeClick = (node: MindMapNode) => {
    console.log('Node clicked:', node);
  };

  return (
    <div className="w-full h-full">
      <MindMapRenderer
        data={data}
        scale={scale}
        onNodeClick={handleNodeClick}
      />
    </div>
  );
} 