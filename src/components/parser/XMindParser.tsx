import React, { useEffect, useState } from 'react';
import JSZip from 'jszip';
import { MindMapNode } from '../../types/mindMap';

interface XMindParserProps {
  file: File;
  onParsed: (data: MindMapNode) => void;
  onError: (error: string) => void;
  onProgress: (progress: number) => void;
}

export function XMindParser({ file, onParsed, onError, onProgress }: XMindParserProps) {
  const [parsing, setParsing] = useState(false);

  useEffect(() => {
    async function parseFile() {
      try {
        setParsing(true);
        const zip = new JSZip();
        
        // 加载并解压文件
        const contents = await zip.loadAsync(file, {
          async: true,
          onProgress: (metadata) => {
            onProgress(Math.round((metadata.percent || 0) * 100));
          }
        });

        // 首先尝试读取 content.json (新版格式)
        let contentFile = contents.file('content.json');
        let content;

        if (contentFile) {
          // 新版格式处理
          const jsonContent = await contentFile.async('string');
          content = JSON.parse(jsonContent);
        } else {
          // 尝试读取 content.xml (旧版格式)
          contentFile = contents.file('content.xml');
          if (!contentFile) {
            throw new Error('Invalid XMind file: Neither content.json nor content.xml found');
          }
          
          const xmlContent = await contentFile.async('string');
          content = await parseXmlContent(xmlContent);
        }

        // 转换为统一的数据结构
        const mindMapData = convertToMindMap(content);
        onParsed(mindMapData);
      } catch (error) {
        console.error('Parse error:', error);
        onError(error instanceof Error ? error.message : 'Failed to parse XMind file');
      } finally {
        setParsing(false);
      }
    }

    if (file) {
      parseFile();
    }
  }, [file, onParsed, onError, onProgress]);

  return null;
}

// 解析 XML 内容
function parseXmlContent(xmlContent: string) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
  
  // 检查解析错误
  const parseError = xmlDoc.getElementsByTagName('parsererror');
  if (parseError.length > 0) {
    throw new Error('Invalid XML content');
  }

  // 获取根主题
  const topics = xmlDoc.getElementsByTagName('topic');
  if (topics.length === 0) {
    throw new Error('No topics found in XML');
  }

  function processTopicElement(element: Element) {
    const topic: any = {
      id: element.getAttribute('id') || generateId(),
      title: '',
      children: { attached: [] }
    };

    // 处理标题
    const titleElement = element.getElementsByTagName('title')[0];
    if (titleElement) {
      topic.title = titleElement.textContent || '';
    }

    // 处理子主题
    const childrenElement = element.getElementsByTagName('children')[0];
    if (childrenElement) {
      const childTopics = childrenElement.getElementsByTagName('topic');
      for (let i = 0; i < childTopics.length; i++) {
        topic.children.attached.push(processTopicElement(childTopics[i]));
      }
    }

    // 处理备注
    const notesElement = element.getElementsByTagName('notes')[0];
    if (notesElement) {
      const plainElement = notesElement.getElementsByTagName('plain')[0];
      if (plainElement) {
        topic.notes = {
          plain: {
            content: plainElement.textContent || ''
          }
        };
      }
    }

    return topic;
  }

  const rootTopic = processTopicElement(topics[0]);
  return [{
    rootTopic: rootTopic
  }];
}

// 转换为统一的思维导图数据结构
function convertToMindMap(content: any): MindMapNode {
  // 确保我们有正确的数据结构
  const rootTopic = Array.isArray(content) ? content[0]?.rootTopic : content.rootTopic;
  if (!rootTopic) {
    throw new Error('Invalid mind map structure');
  }

  function convertTopic(topic: any): MindMapNode {
    const node: MindMapNode = {
      id: topic.id || generateId(),
      title: topic.title || '',
      children: [],
      notes: topic.notes?.plain?.content || topic.notes || '',
      labels: topic.labels || [],
      markers: Array.isArray(topic.markers) ? topic.markers : []
    };

    // 处理子节点
    const attachedChildren = topic.children?.attached || [];
    node.children = attachedChildren.map(convertTopic);

    return node;
  }

  return convertTopic(rootTopic);
}

// 生成唯一ID
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
} 