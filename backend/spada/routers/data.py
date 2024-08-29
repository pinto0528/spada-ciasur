from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import Record
from app.models import Record as DBRecord
from app.utils import download_json, generate_url
from typing import Optional, List, Dict, Any
from app.database import get_db
from sqlalchemy import text

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

@router.get("/data", response_model=List[Dict[str, Any]])
def get_data(interval: Optional[str] = None, data_type: str = 'raw', db: Session = Depends(get_db)):
    print(f"Endpoint /data hit with interval={interval} and data_type={data_type}")
    try:
        if data_type == 'average' and interval:
            # Llamada al stored procedure con el parámetro de intervalo
            result = db.execute(text("SELECT * FROM calculate_averages(:interval_param)"), {"interval_param": interval}).fetchall()
        else:
            # Consulta para obtener datos crudos
            result = db.execute(text("SELECT * FROM records")).fetchall()

        # Convertir las filas a diccionarios
        data = [dict(row._mapping) for row in result]

        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()


    