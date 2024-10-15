from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app.pydantic_models import SolarData
from app.database import get_db  # función para obtener la sesión de la base de datos

router = APIRouter()

# Crear un nuevo registro de datos solares
@router.post("/solar-data/", response_model=SolarData)
def create_solar_data(data: SolarData, db: Session = Depends(get_db)):
    db.add(data)
    db.commit()
    db.refresh(data)
    return data

# Obtener todos los registros de datos solares
@router.get("/solar-data/", response_model=List[SolarData])
def read_solar_data(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(SolarData).offset(skip).limit(limit).all()

# Obtener un registro de datos solares por ID
@router.get("/solar-data/{data_id}", response_model=SolarData)
def read_solar_data(data_id: int, db: Session = Depends(get_db)):
    data = db.query(SolarData).filter(SolarData.id == data_id).first()
    if data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return data

# Actualizar un registro de datos solares
@router.put("/solar-data/{data_id}", response_model=SolarData)
def update_solar_data(data_id: int, data: SolarData, db: Session = Depends(get_db)):
    db_data = db.query(SolarData).filter(SolarData.id == data_id).first()
    if db_data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    
    for key, value in data.dict(exclude_unset=True).items():
        setattr(db_data, key, value)
    
    db.commit()
    db.refresh(db_data)
    return db_data

# Eliminar un registro de datos solares
@router.delete("/solar-data/{data_id}")
def delete_solar_data(data_id: int, db: Session = Depends(get_db)):
    db_data = db.query(SolarData).filter(SolarData.id == data_id).first()
    if db_data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    
    db.delete(db_data)
    db.commit()
    return {"detail": "Data deleted successfully"}
