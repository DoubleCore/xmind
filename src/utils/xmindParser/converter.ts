import { XMindContent, XMindTopic } from './types';
import { MindMapNode } from '../../types/mindMap';

export function convertXMindToMindMap(content: XMindContent): MindMapNode {
  const convertTopic = (topic: XMindTopic): MindMapNode => {
    const children = topic.children?.attached || [];
    
    return {
      id: topic.id,
      title: topic.title,
      children: children.map(convertTopic),
      notes: topic.notes,
      labels: topic.labels,
      markers: topic.markers,
    };
  };

  return convertTopic(content.rootTopic);
}