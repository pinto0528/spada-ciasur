from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from app.database import Base

Base = declarative_base()

class WeatherData(Base):
    __tablename__ = "weather_data"

    id = Column(Integer, primary_key=True, index=True)
    temperature = Column(Float)
    humidity = Column(Float)
    timestamp = Column(DateTime)

from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

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
