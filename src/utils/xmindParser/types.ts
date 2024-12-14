export interface XMindContent {
  rootTopic: XMindTopic;
  title?: string;
  theme?: string;
}

export interface XMindTopic {
  id: string;
  title: string;
  children?: {
    attached?: XMindTopic[];
    detached?: XMindTopic[];
  };
  markers?: string[];
  notes?: string;
  labels?: string[];
}