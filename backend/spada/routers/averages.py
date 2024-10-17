from fastapi import APIRouter, HTTPException, Query, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db  # Ajusta esta importación según la ubicación de tu función
from fastapi.responses import JSONResponse
from typing import List, Dict, Any
from datetime import datetime

router = APIRouter()

@router.get("/averages")
def get_averages(
    data_type: str = Query(..., enum=["ionospheric", "solar"]), 
    interval: str = Query(..., enum=["hourly", "daily", "monthly"]), 
    db: Session = Depends(get_db)  # Aquí usamos Depends para obtener la sesión
) -> List[Dict[str, Any]]:  # Especifica el tipo de retorno
    try:
        # Diccionario para las consultas
        queries = {
            "hourly": {
                "ionospheric": "SELECT * FROM hourly_averages_iono();",
                "solar": "SELECT * FROM hourly_averages_solar();"
            },
            "daily": {
                "ionospheric": "SELECT * FROM daily_averages_iono();",
                "solar": "SELECT * FROM daily_averages_solar();"
            },
            "monthly": {
                "ionospheric": "SELECT * FROM monthly_averages_iono();",
                "solar": "SELECT * FROM monthly_averages_solar();"
            }
        }
        
        # Verifica si el intervalo y el tipo de dato existen
        if interval not in queries:
            raise HTTPException(status_code=400, detail="Invalid interval specified.")
        
        if data_type not in queries[interval]:
            raise HTTPException(status_code=400, detail="Invalid data type specified.")
        
        query = text(queries[interval][data_type])  # Obtener la consulta correspondiente
        
        result = db.execute(query).fetchall()  # Ejecuta la consulta
        
        # Convertir el resultado a una lista de diccionarios
        data = []
        for row in result:
            # row[0] es el timestamp y row[1] es el JSON
            data.append({
                "avg_time": row[0].isoformat() if isinstance(row[0], datetime) else row[0],
                "avg_data": row[1]
            })
        
        return JSONResponse(content=data)  # Retornamos el resultado como JSON
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

