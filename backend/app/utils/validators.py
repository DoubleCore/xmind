import os
from typing import Optional
from app.core.constants import MAX_FILE_SIZE, ALLOWED_EXTENSIONS

def validate_file_size(file_size: int) -> Optional[str]:
    """验证文件大小"""
    if file_size > MAX_FILE_SIZE:
        return 'file_too_large'
    return None

def validate_file_type(filename: str) -> Optional[str]:
    """验证文件类型"""
    ext = os.path.splitext(filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return 'invalid_file_type'
    return None 