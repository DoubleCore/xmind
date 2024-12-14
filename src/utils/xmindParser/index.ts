import JSZip from 'jszip';
import { XMindContent } from './types';
import { convertXMindToMindMap } from './converter';
import { validateFileSize, validateFileType } from '../validators';
import { MindMapNode } from '../../types/mindMap';

interface ProgressCallback {
  (progress: { loaded: number; total: number }): void;
}

export async function parseXMindFile(
  file: File,
  onProgress?: ProgressCallback
): Promise<MindMapNode> {
  // Validate file
  const sizeError = validateFileSize(file);
  if (sizeError) throw new Error(sizeError);
  
  const typeError = validateFileType(file);
  if (typeError) throw new Error(typeError);

  try {
    const zip = new JSZip();
    
    // Load the file with progress tracking
    const contents = await zip.loadAsync(file, {
      async: true,
      onProgress: onProgress
    });
    
    // XMind files contain a content.json file in their structure
    const contentFile = contents.file('content.json');
    if (!contentFile) {
      throw new Error('Invalid XMind file structure');
    }

    // Read and parse the content.json file
    const contentJson = await contentFile.async('string');
    const content: XMindContent[] = JSON.parse(contentJson);
    
    if (!content || !Array.isArray(content) || content.length === 0) {
      throw new Error('Invalid XMind content structure');
    }

    // Convert the first sheet (XMind can have multiple sheets)
    return convertXMindToMindMap(content[0]);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to parse XMind file');
  }
}