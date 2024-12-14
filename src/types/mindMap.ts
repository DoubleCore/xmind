export interface MindMapNode {
  id: string;
  title: string;
  children: MindMapNode[];
  notes?: string;
  labels?: string[];
  markers?: string[];
}