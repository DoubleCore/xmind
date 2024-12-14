import xmind
from typing import Dict, List, Optional
import uuid

class XMindParser:
    def __init__(self):
        self.workbook = None
        
    def parse(self, file_path: str) -> Dict:
        """解析XMind文件并返回符合前端MindMapNode接口的数据结构"""
        self.workbook = xmind.load(file_path)
        sheet = self.workbook.getPrimarySheet()
        root_topic = sheet.getRootTopic()
        
        return self._convert_topic(root_topic)
    
    def _convert_topic(self, topic) -> Dict:
        """将XMind主题转换为MindMapNode格式"""
        return {
            "id": str(uuid.uuid4()),
            "title": topic.getTitle(),
            "children": [self._convert_topic(sub) for sub in topic.getSubTopics()],
            "notes": topic.getNotes() or "",
            "labels": topic.getLabels() or [],
            "markers": [marker.getMarkerId() for marker in topic.getMarkers()] or []
        } 