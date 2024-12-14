import { create } from 'zustand';
import { MindMapNode } from '../types/mindMap';

interface MindMapStore {
  mindMapData: MindMapNode | null;
  setMindMapData: (data: MindMapNode) => void;
}

export const useMindMapStore = create<MindMapStore>((set) => ({
  mindMapData: null,
  setMindMapData: (data) => set({ mindMapData: data }),
}));