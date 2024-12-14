from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api import endpoints
from app.core.logger import logger
import os

app = FastAPI(title="XMind Parser API")

# 获取环境变量中的前端URL
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    """请求日志中间件"""
    logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    return response

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """全局异常处理"""
    logger.error(f"Global error: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

# 注册路由
app.include_router(endpoints.router, prefix="/api") 