from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Date, Numeric
from sqlalchemy.orm import DeclarativeBase, Mapped
from sqlalchemy.sql.sqltypes import Numeric
from typing import Type


Base = declarative_base()

class WeatherData(Base):
    __tablename__ = "weather_data"

    id = Column(Integer, primary_key=True, index=True)
    temperature = Column(Float)
    humidity = Column(Float)
    timestamp = Column(DateTime)

class Record(Base):
    __tablename__ = 'records'

    id = Column(Integer, primary_key=True, index=True)
    dt = Column(DateTime, index=True)
    station = Column(String)
    fromfile = Column(String)
    producer = Column(String, nullable=True)
    evaluated = Column(Boolean, default=False)
    fof2 = Column(String, nullable=True)
    fof2_eval = Column(Boolean, default=False)
    muf3000f2 = Column(String, nullable=True)
    muf3000f2_eval = Column(Boolean, default=False)
    m3000f2 = Column(String, nullable=True)
    m3000f2_eval = Column(Boolean, default=False)
    fxi = Column(String, nullable=True)
    fxi_eval = Column(Boolean, default=False)
    fof1 = Column(String, nullable=True)
    fof1_eval = Column(Boolean, default=False)
    ftes = Column(String, nullable=True)
    ftes_eval = Column(Boolean, default=False)
    h_es = Column(String, nullable=True)
    h_es_eval = Column(Boolean, default=False)
    aip_hmf2 = Column(String, nullable=True)
    aip_fof2 = Column(String, nullable=True)
    aip_fof1 = Column(String, nullable=True)
    aip_hmf1 = Column(String, nullable=True)
    aip_d1 = Column(String, nullable=True)
    aip_foe = Column(String, nullable=True)
    aip_hme = Column(String, nullable=True)
    aip_yme = Column(String, nullable=True)
    aip_h_ve = Column(String, nullable=True)
    aip_ewidth = Column(String, nullable=True)
    aip_deln_ve = Column(String, nullable=True)
    aip_b0 = Column(String, nullable=True)
    aip_b1 = Column(String, nullable=True)
    tec_bottom = Column(String, nullable=True)
    tec_top = Column(String, nullable=True)
    profile = Column(String, nullable=True)
    trace = Column(String, nullable=True)
    modified = Column(DateTime, nullable=True)
    fof2_med_27_days = Column(String, nullable=True)

