from typing import Set

# 文件限制
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS: Set[str] = {'.xmind'}

# 缓存配置
CACHE_EXPIRE_MINUTES = 30
MAX_CACHE_ITEMS = 100

# 错误信息
ERROR_MESSAGES = {
    'file_too_large': '文件大小超过限制（最大10MB）',
    'invalid_file_type': '不支持的文件类型（仅支持.xmind）',
    'parse_error': 'XMind文件解析失败：{error}',
    'file_not_found': '文件不存在或已过期',
} 