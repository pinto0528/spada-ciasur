from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from spada.app.models import SolarData as SqlAlchemy  # Modelo SQLAlchemy
from spada.app.pydantic_models import SolarData as Pydantic  # Modelo Pydantic
from spada.app.database import get_db  # función para obtener la sesión de la base de datos
from datetime import datetime

router = APIRouter()

# Crear un nuevo registro de datos solares
@router.post("/solar-data/", response_model=Pydantic)  # Cambié SolarData a Pydantic
def create_solar_data(data: Pydantic, db: Session = Depends(get_db)):  # Cambié SolarData a Pydantic
    db_data = SqlAlchemy(**data.dict())  # Crear instancia de SqlAlchemy con datos
    db.add(db_data)
    db.commit()
    db.refresh(db_data)
    return db_data

# Obtener todos los registros de datos solares
@router.get("/solar-data/", response_model=List[Pydantic])  # Cambié SolarData a Pydantic
def read_solar_data(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(SqlAlchemy).offset(skip).limit(limit).all()  # Cambié SolarData a SqlAlchemy

# Obtener un registro de datos solares por dt
@router.get("/solar-data/{dt}", response_model=Pydantic)  # Cambié SolarData a Pydantic
def read_solar_data(dt: datetime, db: Session = Depends(get_db)):
    data = db.query(SqlAlchemy).filter(SqlAlchemy.dt == dt).first()  # Cambié SolarData a SqlAlchemy
    if data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return data

# Actualizar un registro de datos solares por dt
@router.put("/solar-data/{dt}", response_model=Pydantic)  # Cambié SolarData a Pydantic
def update_solar_data(dt: datetime, data: Pydantic, db: Session = Depends(get_db)):  # Cambié SolarData a Pydantic
    db_data = db.query(SqlAlchemy).filter(SqlAlchemy.dt == dt).first()  # Cambié SolarData a SqlAlchemy
    if db_data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    
    for key, value in data.dict(exclude_unset=True).items():
        setattr(db_data, key, value)
    
    db.commit()
    db.refresh(db_data)
    return db_data

# Eliminar un registro de datos solares por dt
@router.delete("/solar-data/{dt}")
def delete_solar_data(dt: datetime, db: Session = Depends(get_db)):
    db_data = db.query(SqlAlchemy).filter(SqlAlchemy.dt == dt).first()  # Cambié SolarData a SqlAlchemy
    if db_data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    
    db.delete(db_data)
    db.commit()
    return {"detail": "Data deleted successfully"}
