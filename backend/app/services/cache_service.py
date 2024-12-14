from datetime import datetime, timedelta
from typing import Dict, Optional
import json
from collections import OrderedDict
from app.core.constants import CACHE_EXPIRE_MINUTES, MAX_CACHE_ITEMS

class CacheService:
    def __init__(self):
        self.cache: OrderedDict = OrderedDict()
        self.expire_times: Dict[str, datetime] = {}

    def set(self, key: str, value: dict):
        """设置缓存"""
        # 检查缓存大小
        if len(self.cache) >= MAX_CACHE_ITEMS:
            # 移除最早的项
            self.cache.popitem(last=False)
            
        # 存储数据和过期时间
        self.cache[key] = value
        self.expire_times[key] = datetime.now() + timedelta(minutes=CACHE_EXPIRE_MINUTES)
        
    def get(self, key: str) -> Optional[dict]:
        """获取缓存"""
        if key not in self.cache:
            return None
            
        # 检查是否过期
        if datetime.now() > self.expire_times[key]:
            self.remove(key)
            return None
            
        return self.cache[key]
        
    def remove(self, key: str):
        """移除缓���"""
        self.cache.pop(key, None)
        self.expire_times.pop(key, None)

cache_service = CacheService() 