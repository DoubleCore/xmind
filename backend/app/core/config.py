from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "XMind Parser"
    CORS_ORIGINS: list = ["http://localhost:5173"]
    
    class Config:
        case_sensitive = True

settings = Settings() 