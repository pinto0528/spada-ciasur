import requests
from app.models import Record
import requests
import json
from datetime import datetime, timedelta
from urllib.parse import urlencode
import math
from app.database import SessionLocal
from sqlalchemy.orm import Session

#DOWNLOAD-DATA#

def round_time(dt):
    minutes = math.floor(dt.minute / 10) * 10
    return dt.replace(minute=minutes, second=0, microsecond=0)

def get_latest_record(session: Session):
    latest_record = session.query(Record).order_by(Record.dt.desc()).first()
    if latest_record:
        return latest_record.dt
    return None

def generate_url(base_url):
    current_time = datetime.utcnow()
    rounded_time = round_time(current_time)
    start_time = (rounded_time - timedelta(minutes=10)).strftime('%Y-%m-%d %H:%M:%S')
    end_time = rounded_time.strftime('%Y-%m-%d %H:%M:%S')

    params = {
        'filter': f'dt,bt,{start_time},{end_time}'
    }
    query_string = urlencode(params)
    print(f"Descargando datos desde {start_time} hasta {end_time}")
    return f"{base_url}?{query_string}"

def download_json(url):
    print(f"Descargando datos desde: {url}")
    
    # Obtener una sesión de base de datos
    db = SessionLocal()

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        # Obtener la última fecha y hora de la base de datos
        latest_record_datetime = get_latest_record(db)
        print(f"Última fecha y hora descargada: {latest_record_datetime}")

        new_records = data.get('records', [])
        if new_records:
            new_record_datetime = datetime.strptime(new_records[0]['dt'], '%Y-%m-%d %H:%M:%S')
            print(f"Fecha y hora de los datos a descargar: {new_record_datetime}")
            if latest_record_datetime and latest_record_datetime == new_record_datetime:
                print(f"Los datos ya están en la base de datos (fecha: {new_record_datetime}).")
                return 1  # Código de error para datos duplicados

        if 'records' in data and data['records']:
            for record in data['records']:
                db.add(Record(**record))  # Ajusta según tu ORM
            db.commit()
            print(f'Datos guardados en la base de datos')
            return 0  # Código de éxito
        else:
            print('No se encontraron registros en la respuesta.')
            return 2  # Código de error para no encontrar registros

    except requests.exceptions.RequestException as e:
        print(f"Error al intentar acceder a {url}: {e}")
        return 3  # Código de error para problemas de solicitud
    except json.JSONDecodeError as e:
        print(f"Error al procesar la respuesta JSON: {e}")
        return 4  # Código de error para problemas de JSON
    finally:
        db.close()