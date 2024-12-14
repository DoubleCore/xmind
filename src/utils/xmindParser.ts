import { MindMapNode } from '../types/mindMap';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function parseXMindFile(file: File): Promise<MindMapNode> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_URL}/api/parse-xmind`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to parse XMind file');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to parse XMind file');
  }
}