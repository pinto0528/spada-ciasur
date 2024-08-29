from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from datetime import date

class WeatherData(BaseModel):
    temperature: float
    humidity: float
    timestamp: datetime

    class Config:
        orm_mode = True

class Record(BaseModel):
    id: int
    dt: datetime
    station: str
    fromfile: str
    producer: Optional[str] = None
    evaluated: bool = False
    fof2: Optional[str] = None
    fof2_eval: bool = False
    muf3000f2: Optional[str] = None
    muf3000f2_eval: bool = False
    m3000f2: Optional[str] = None
    m3000f2_eval: bool = False
    fxi: Optional[str] = None
    fxi_eval: bool = False
    fof1: Optional[str] = None
    fof1_eval: bool = False
    ftes: Optional[str] = None
    ftes_eval: bool = False
    h_es: Optional[str] = None
    h_es_eval: bool = False
    aip_hmf2: Optional[str] = None
    aip_fof2: Optional[str] = None
    aip_fof1: Optional[str] = None
    aip_hmf1: Optional[str] = None
    aip_d1: Optional[str] = None
    aip_foe: Optional[str] = None
    aip_hme: Optional[str] = None
    aip_yme: Optional[str] = None
    aip_h_ve: Optional[str] = None
    aip_ewidth: Optional[str] = None
    aip_deln_ve: Optional[str] = None
    aip_b0: Optional[str] = None
    aip_b1: Optional[str] = None
    tec_bottom: Optional[str] = None
    tec_top: Optional[str] = None
    profile: Optional[str] = None
    trace: Optional[str] = None
    modified: Optional[datetime] = None
    fof2_med_27_days: Optional[str] = None

class HourlyAverages(BaseModel):
    dt: date 
    avg_fof2: Optional[float] = None 
    avg_muf3000f2: Optional[float] = None 
    avg_m3000f2: Optional[float] = None 
    avg_fxi: Optional[float] = None 
    avg_fof1: Optional[float] = None 
    avg_ftes: Optional[float] = None 
    avg_h_es: Optional[float] = None

class DailyAverages(BaseModel):
    dt: date 
    avg_fof2: Optional[float] = None 
    avg_muf3000f2: Optional[float] = None 
    avg_m3000f2: Optional[float] = None 
    avg_fxi: Optional[float] = None 
    avg_fof1: Optional[float] = None 
    avg_ftes: Optional[float] = None 
    avg_h_es: Optional[float] = None

class MonthlyAverages(BaseModel):
    dt: date 
    avg_fof2: Optional[float] = None 
    avg_muf3000f2: Optional[float] = None 
    avg_m3000f2: Optional[float] = None 
    avg_fxi: Optional[float] = None 
    avg_fof1: Optional[float] = None 
    avg_ftes: Optional[float] = None 
    avg_h_es: Optional[float] = None

class YearlyAverages(BaseModel):
    dt: date 
    avg_fof2: Optional[float] = None 
    avg_muf3000f2: Optional[float] = None 
    avg_m3000f2: Optional[float] = None 
    avg_fxi: Optional[float] = None 
    avg_fof1: Optional[float] = None 
    avg_ftes: Optional[float] = None 
    avg_h_es: Optional[float] = None

class Config:
    from_attributes = True