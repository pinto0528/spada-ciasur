from sqlalchemy import Column, Integer, String, Numeric, Boolean, JSON, TIMESTAMP, Date
from .database import Base

class IonosphericData(Base):
    __tablename__ = "ionospheric_data"

    id = Column(Integer, primary_key=True, index=True)
    dt = Column(TIMESTAMP, nullable=False)
    station = Column(String, nullable=False)
    fof2 = Column(Numeric(5, 2), nullable=True)  # Con 2 decimales
    fof2_eval = Column(Boolean, nullable=True)
    muf3000f2 = Column(Numeric(5, 2), nullable=True)
    muf3000f2_eval = Column(Boolean, nullable=True)
    m3000f2 = Column(Numeric(5, 2), nullable=True)
    m3000f2_eval = Column(Boolean, nullable=True)
    fxi = Column(Numeric(5, 2), nullable=True)
    fxi_eval = Column(Boolean, nullable=True)
    fof1 = Column(Numeric(5, 2), nullable=True)
    fof1_eval = Column(Boolean, nullable=True)
    ftes = Column(Numeric(5, 2), nullable=True)
    ftes_eval = Column(Boolean, nullable=True)
    h_es = Column(Numeric(5, 2), nullable=True)
    h_es_eval = Column(Boolean, nullable=True)
    aip_hmf2 = Column(Numeric(5, 2), nullable=True)
    aip_fof2 = Column(Numeric(5, 2), nullable=True)
    aip_fof1 = Column(Numeric(5, 2), nullable=True)
    aip_hmf1 = Column(Numeric(5, 2), nullable=True)
    aip_d1 = Column(Numeric(5, 2), nullable=True)
    aip_foe = Column(Numeric(5, 2), nullable=True)
    aip_hme = Column(Numeric(5, 2), nullable=True)
    aip_yme = Column(Numeric(5, 2), nullable=True)
    aip_h_ve = Column(Numeric(5, 2), nullable=True)
    aip_ewidth = Column(Numeric(5, 2), nullable=True)
    aip_deln_ve = Column(Numeric(5, 2), nullable=True)
    aip_b0 = Column(Numeric(5, 2), nullable=True)
    aip_b1 = Column(Numeric(5, 2), nullable=True)
    tec_bottom = Column(Numeric(5, 2), nullable=True)
    profile = Column(JSON, nullable=True)
    trace = Column(JSON, nullable=True)
    modified = Column(TIMESTAMP, nullable=True)
    fof2_med_27_days = Column(Numeric(5, 2), nullable=True)

class SolarData(Base):
    __tablename__ = "solar_data"

    id = Column(Integer, primary_key=True, index=True)
    time_tag = Column(Date, nullable=False)  # Se puede usar DATE o TIMESTAMP
    ssn = Column(Numeric(5, 2), nullable=True)
    smoothed_ssn = Column(Numeric(5, 2), nullable=True)
    observed_swpc_ssn = Column(Numeric(5, 2), nullable=True)
    smoothed_swpc_ssn = Column(Numeric(5, 2), nullable=True)
    f10_7 = Column(Numeric(5, 2), nullable=True)
    smoothed_f10_7 = Column(Numeric(5, 2), nullable=True)
