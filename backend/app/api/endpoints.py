from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.xmind_parser import XMindParser
from app.services.cache_service import cache_service
from app.utils.validators import validate_file_size, validate_file_type
from app.core.constants import ERROR_MESSAGES
from app.core.logger import logger
import os
import tempfile
import uuid

router = APIRouter()

@router.post("/parse-xmind")
async def parse_xmind(file: UploadFile = File(...)):
    try:
        # 生成唯一文件ID
        file_id = str(uuid.uuid4())
        
        # 验证文件
        if not file.filename.endswith('.xmind'):
            logger.warning(f"Invalid file type: {file.filename}")
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Only .xmind files are supported."
            )

        # 创建临时文件
        with tempfile.NamedTemporaryFile(delete=False, suffix='.xmind') as temp_file:
            try:
                content = await file.read()
                temp_file.write(content)
                temp_path = temp_file.name

                # 解析文件
                parser = XMindParser()
                result = parser.parse(temp_path)
                
                logger.info(f"Successfully parsed file: {file.filename}")
                return result
                
            except Exception as e:
                logger.error(f"Parse error for file {file.filename}: {str(e)}")
                raise HTTPException(
                    status_code=400,
                    detail=f"Failed to parse XMind file: {str(e)}"
                )
            finally:
                # 清理临时文件
                try:
                    os.unlink(temp_path)
                except:
                    pass
                
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Server error: {str(e)}"
        ) 