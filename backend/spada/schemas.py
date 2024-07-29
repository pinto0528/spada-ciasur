from pydantic import BaseModel
from datetime import datetime

class WeatherData(BaseModel):
    temperature: float
    humidity: float
    timestamp: datetime

    class Config:
        orm_mode = True
