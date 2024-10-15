from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app.pydantic_models import IonosphericData
from app.database import get_db  # función para obtener la sesión de la base de datos

router = APIRouter()

# Crear un nuevo registro de datos ionosféricos
@router.post("/ionospheric-data/", response_model=IonosphericData)
def create_ionospheric_data(data: IonosphericData, db: Session = Depends(get_db)):
    db.add(data)
    db.commit()
    db.refresh(data)
    return data

# Obtener todos los registros de datos ionosféricos
@router.get("/ionospheric-data/", response_model=List[IonosphericData])
def read_ionospheric_data(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(IonosphericData).offset(skip).limit(limit).all()

# Obtener un registro de datos ionosféricos por ID
@router.get("/ionospheric-data/{data_id}", response_model=IonosphericData)
def read_ionospheric_data(data_id: int, db: Session = Depends(get_db)):
    data = db.query(IonosphericData).filter(IonosphericData.id == data_id).first()
    if data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return data

# Actualizar un registro de datos ionosféricos
@router.put("/ionospheric-data/{data_id}", response_model=IonosphericData)
def update_ionospheric_data(data_id: int, data: IonosphericData, db: Session = Depends(get_db)):
    db_data = db.query(IonosphericData).filter(IonosphericData.id == data_id).first()
    if db_data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    
    for key, value in data.dict(exclude_unset=True).items():
        setattr(db_data, key, value)
    
    db.commit()
    db.refresh(db_data)
    return db_data

# Eliminar un registro de datos ionosféricos
@router.delete("/ionospheric-data/{data_id}")
def delete_ionospheric_data(data_id: int, db: Session = Depends(get_db)):
    db_data = db.query(IonosphericData).filter(IonosphericData.id == data_id).first()
    if db_data is None:
        raise HTTPException(status_code=404, detail="Data not found")
    
    db.delete(db_data)
    db.commit()
    return {"detail": "Data deleted successfully"}
