import logging
from logging.handlers import RotatingFileHandler
import os

def setup_logger():
    # 创建日志目录
    log_dir = "logs"
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    # 配置日志
    logger = logging.getLogger("xmind_parser")
    logger.setLevel(logging.INFO)

    # 文件处理器
    file_handler = RotatingFileHandler(
        os.path.join(log_dir, "app.log"),
        maxBytes=1024 * 1024,  # 1MB
        backupCount=5
    )
    file_handler.setFormatter(
        logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    )
    logger.addHandler(file_handler)

    return logger

logger = setup_logger() 