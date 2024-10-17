# Esta funcion genera n datos aleatorios para los modelos incluidos

import sys
import os

# Añadir la carpeta raíz (una carpeta arriba de la actual) al sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import sys
import os
import random
from datetime import datetime, timedelta
from sqlalchemy import Boolean, Numeric, String, JSON, TIMESTAMP
from sqlalchemy.orm import Session
from spada.app.models import IonosphericData, SolarData  # Asegúrate de tener los modelos correctos
from spada.app.database import get_db  # Para obtener la sesión de la base de datos

# Función para generar un valor aleatorio según el tipo de dato
def generate_random_value(column_type):
    if isinstance(column_type, Numeric):
        return round(random.uniform(0, 100), 2)  # Valores numéricos aleatorios
    elif isinstance(column_type, Boolean):
        return random.choice([True, False])  # Valores booleanos aleatorios
    elif isinstance(column_type, String):
        return random.choice(["tucuman", "other_station", "example_string"])  # Strings aleatorios
    elif isinstance(column_type, JSON):
        return {"example_key": "example_value"}  # Datos JSON ficticios
    elif isinstance(column_type, TIMESTAMP):
        return datetime.now() - timedelta(minutes=random.randint(0, 1440))  # Timestamps aleatorios
    else:
        return None  # Si el tipo de dato no está soportado, retornar None

# Función para generar datos aleatorios dinámicamente según el modelo
def generate_random_record(model_class, dt_value):
    record_data = {}
    for column in model_class.__table__.columns:
        if column.primary_key:
            # Usar el timestamp calculado (`dt_value`) como valor de la clave primaria
            record_data[column.name] = dt_value
        else:
            # Generamos el valor aleatorio en función del tipo de dato
            record_data[column.name] = generate_random_value(column.type)
    return model_class(**record_data)

# Guardar los datos generados en la base de datos
def save_random_data(n: int, db: Session, models):
    # Hora inicial: ahora mismo, redondeada a los minutos
    current_time = datetime.now().replace(second=0, microsecond=0)

    for i in range(n):
        for model_class in models:
            # Para cada registro, incrementar 5 minutos en `current_time`
            dt_value = current_time + timedelta(minutes=i * 15)

            # Generar el registro con el valor incremental de `dt`
            record = generate_random_record(model_class, dt_value)

            db.add(record)
    
    db.commit()
    print(f"{n * len(models)} registros generados y guardados en la base de datos.")

if __name__ == "__main__":
    n = 1000
    db = next(get_db())  # Obtener la sesión de la base de datos
    models_to_generate = [IonosphericData, SolarData]  # Agrega aquí cualquier nuevo modelo en el futuro
    save_random_data(n, db, models_to_generate)  # Generar 100 registros para cada modelo
