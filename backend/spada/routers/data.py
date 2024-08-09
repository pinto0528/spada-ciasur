from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import Record, DailyAverage
from app.models import Record as DBRecord
from app.utils import download_json, generate_url
from typing import List
from app.database import get_db
from pydantic import BaseModel
import asyncpg

router = APIRouter()



@router.get("/update-records")
def update_records():
    base_url = "http://ws-eswua.rm.ingv.it/ais.php/records/wstuj2o_auto"
    download_url = generate_url(base_url)
    exit_code = download_json(download_url)

    if exit_code == 0:
        return {"message": "Descarga completada exitosamente."}
    elif exit_code == 1:
        return {"message": "Descarga abortada: Los datos ya están en la base de datos."}
    elif exit_code == 2:
        return {"message": "Descarga abortada: No se encontraron registros en la respuesta."}
    elif exit_code == 3:
        return {"message": "Descarga abortada: Error al intentar acceder a la URL."}
    elif exit_code == 4:
        return {"message": "Descarga abortada: Error al procesar la respuesta JSON."}
    else:
        return {"message": "Descarga abortada: Error desconocido. Revisar consola"}

@router.get("/records", response_model=List[Record])
def get_records(skip: int = 0, limit: int = 1000, db: Session = Depends(get_db)):
    records = db.query(DBRecord).offset(skip).limit(limit).all()
    return records

@router.get("/daily-average", response_model=List[DailyAverage])
async def get_daily_average():
    conn = await asyncpg.connect(user='postgres', password='admin', database='spada-records-new', host='localhost')
    results = await conn.fetch('SELECT * FROM daily_average();')
    await conn.close()
    return [dict(result) for result in results]
    