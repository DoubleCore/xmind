import React, { useEffect, useRef } from 'react';
import { MindMapNode } from '../../types/mindMap';

interface MindMapRendererProps {
  data: MindMapNode;
  scale?: number;
  onNodeClick?: (node: MindMapNode) => void;
}

export function MindMapRenderer({ data, scale = 1, onNodeClick }: MindMapRendererProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    // 清除现有内容
    const svg = svgRef.current;
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    // 创建图层
    const linesGroup = createSVGElement('g');
    const nodesGroup = createSVGElement('g');
    svg.appendChild(linesGroup);
    svg.appendChild(nodesGroup);

    // 计算布局
    const layoutData = calculateLayout(data);

    // 渲染思维导图
    renderMindMap(layoutData, nodesGroup, linesGroup, onNodeClick);

    // 调整视图以适应内容
    const bbox = svg.getBBox();
    svg.setAttribute('viewBox', `${bbox.x - 20} ${bbox.y - 20} ${bbox.width + 40} ${bbox.height + 40}`);
  }, [data, scale, onNodeClick]);

  return (
    <div className="w-full h-full overflow-auto">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          transition: 'transform 0.2s'
        }}
      />
    </div>
  );
}

// 创建 SVG 元素的辅助函数
function createSVGElement(type: string): SVGElement {
  return document.createElementNS('http://www.w3.org/2000/svg', type);
}

// 布局计算
function calculateLayout(node: MindMapNode, level = 0, y = 0): any {
  const NODE_HEIGHT = 40;
  const NODE_WIDTH = 200;
  const LEVEL_GAP = 100;
  const VERTICAL_GAP = 20;

  const layout = {
    ...node,
    x: level * (NODE_WIDTH + LEVEL_GAP),
    y,
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    children: []
  };

  let currentY = y;
  layout.children = node.children.map(child => {
    const childLayout = calculateLayout(child, level + 1, currentY);
    currentY += childLayout.totalHeight + VERTICAL_GAP;
    return childLayout;
  });

  layout.totalHeight = Math.max(
    NODE_HEIGHT,
    layout.children.reduce((sum, child) => sum + child.totalHeight + VERTICAL_GAP, 0) - VERTICAL_GAP
  );

  return layout;
}

// 渲染思维导图
function renderMindMap(
  node: any,
  nodesGroup: SVGElement,
  linesGroup: SVGElement,
  onNodeClick?: (node: MindMapNode) => void
) {
  // 渲染节点
  const nodeGroup = createSVGElement('g');
  const rect = createSVGElement('rect');
  const text = createSVGElement('text');

  // 设置节点样式和属性
  rect.setAttribute('x', node.x.toString());
  rect.setAttribute('y', node.y.toString());
  rect.setAttribute('width', node.width.toString());
  rect.setAttribute('height', node.height.toString());
  rect.setAttribute('rx', '5');
  rect.setAttribute('fill', 'white');
  rect.setAttribute('stroke', '#ddd');

  text.setAttribute('x', (node.x + node.width / 2).toString());
  text.setAttribute('y', (node.y + node.height / 2).toString());
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('dominant-baseline', 'middle');
  text.textContent = node.title;

  nodeGroup.appendChild(rect);
  nodeGroup.appendChild(text);
  nodesGroup.appendChild(nodeGroup);

  // 添加点击事件
  if (onNodeClick) {
    nodeGroup.style.cursor = 'pointer';
    nodeGroup.onclick = () => onNodeClick(node);
  }

  // 渲染连线和子节点
  node.children.forEach((child: any) => {
    // 绘制连线
    const line = createSVGElement('path');
    const startX = node.x + node.width;
    const startY = node.y + node.height / 2;
    const endX = child.x;
    const endY = child.y + child.height / 2;
    const controlX = (startX + endX) / 2;

    line.setAttribute(
      'd',
      `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}`
    );
    line.setAttribute('stroke', '#ddd');
    line.setAttribute('fill', 'none');
    linesGroup.appendChild(line);

    // 递归渲染子节点
    renderMindMap(child, nodesGroup, linesGroup, onNodeClick);
  });
} 