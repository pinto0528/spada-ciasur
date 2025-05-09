from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from spada.app.models import IonosphericData as SqlAlchemy  # Modelo SQLAlchemy
from spada.app.pydantic_models import IonosphericData as Pydantic  # Modelo Pydantic
from spada.app.database import get_db  # función para obtener la sesión de la base de datos
from datetime import datetime

router = APIRouter()

# Crear un nuevo registro de datos ionosféricos
@router.post("/ionospheric-data/", response_model=Pydantic)
def create_ionospheric_data(data: Pydantic, db: Session = Depends(get_db)):
    # Convertir el modelo de Pydantic a SQLAlchemy
    db_data = SqlAlchemy(**data.dict())
    db.add(db_data)
    db.commit()
    db.refresh(db_data)
    return db_data

# Obtener todos los registros de datos ionosféricos
@router.get("/ionospheric-data/", response_model=List[Pydantic])
def read_ionospheric_data(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    # Consultar los registros desde la base de datos usando el modelo SQLAlchemy
    return db.query(SqlAlchemy).offset(skip).limit(limit).all()

# Obtener un registro de datos ionosféricos por dt
@router.get("/ionospheric-data/{dt}", response_model=Pydantic)
def read_ionospheric_data(dt: datetime, db: Session = Depends(get_db)):
    data = db.query(SqlAlchemy).filter(SqlAlchemy.dt == dt).first()
    if data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return data

# Actualizar un registro de datos ionosféricos por dt
@router.put("/ionospheric-data/{dt}", response_model=Pydantic)
def update_ionospheric_data(dt: datetime, data: Pydantic, db: Session = Depends(get_db)):
    db_data = db.query(SqlAlchemy).filter(SqlAlchemy.dt == dt).first()
    if db_data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    
    # Actualizar los campos del registro
    for key, value in data.dict(exclude_unset=True).items():
        setattr(db_data, key, value)
    
    db.commit()
    db.refresh(db_data)
    return db_data

# Eliminar un registro de datos ionosféricos por dt
@router.delete("/ionospheric-data/{dt}")
def delete_ionospheric_data(dt: datetime, db: Session = Depends(get_db)):
    db_data = db.query(SqlAlchemy).filter(SqlAlchemy.dt == dt).first()
    if db_data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    
    db.delete(db_data)
    db.commit()
    return {"detail": "Data deleted successfully"}
