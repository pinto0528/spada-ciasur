from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from decimal import Decimal

class IonosphericData(BaseModel):

    dt: datetime
    station: str = Field(..., description="Nombre de la estación")  # Asegura que 'station' es un string
    fof2: Optional[Decimal] = None
    fof2_eval: Optional[bool] = None
    muf3000f2: Optional[Decimal] = None
    muf3000f2_eval: Optional[bool] = None
    m3000f2: Optional[Decimal] = None
    m3000f2_eval: Optional[bool] = None
    fxi: Optional[Decimal] = None
    fxi_eval: Optional[bool] = None
    fof1: Optional[Decimal] = None
    fof1_eval: Optional[bool] = None
    ftes: Optional[Decimal] = None
    ftes_eval: Optional[bool] = None
    h_es: Optional[Decimal] = None
    h_es_eval: Optional[bool] = None
    aip_hmf2: Optional[Decimal] = None
    aip_fof2: Optional[Decimal] = None
    aip_fof1: Optional[Decimal] = None
    aip_hmf1: Optional[Decimal] = None
    aip_d1: Optional[Decimal] = None
    aip_foe: Optional[Decimal] = None
    aip_hme: Optional[Decimal] = None
    aip_yme: Optional[Decimal] = None
    aip_h_ve: Optional[Decimal] = None
    aip_ewidth: Optional[Decimal] = None
    aip_deln_ve: Optional[Decimal] = None
    aip_b0: Optional[Decimal] = None
    aip_b1: Optional[Decimal] = None
    tec_bottom: Optional[Decimal] = None
    profile: Optional[dict] = None  # Asumiendo que es un JSON que puede ser convertido a un dict
    trace: Optional[dict] = None  # Lo mismo para 'trace'
    modified: Optional[datetime] = None
    fof2_med_27_days: Optional[Decimal] = None

    class Config:
        orm_mode = True  # Permite que Pydantic use objetos ORM


class SolarData(BaseModel):
    dt: datetime
    ssn: float
    smoothed_ssn: Optional[float] = None
    observed_swpc_ssn: float
    smoothed_swpc_ssn: Optional[float] = None
    f10_7: float  # Usar el mismo nombre que en SQLAlchemy
    smoothed_f10_7: Optional[float] = None

    class Config:
        orm_mode = True  # Permite que Pydantic use objetos ORM
