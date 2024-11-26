import sys
import os

# Añadir la carpeta raíz (una carpeta arriba de la actual) al sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import requests
import time
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.database import get_db  
from app.models import IonosphericData, SolarData  # Asegúrate de que tienes un modelo para los datos solares
from contextlib import contextmanager
from decimal import Decimal

# Constantes
STATION_CODE = "wstuj2o_auto"  # Código de la estación
BASE_URL = "http://ws-eswua.rm.ingv.it/ais.php/records/"
SOLAR_URL = "w"
MONTHLY_FETCH_DAY = 1  # Día del mes para descargar datos solares

@contextmanager
def get_db_session():
    db = next(get_db())  # Obtiene la sesión de la base de datos
    try:
        yield db
    finally:
        db.close()  # Cierra la sesión después de usarla
       
def save_data(db: Session, records, data_type='ionospheric'):
    for record in records:
        try:
            if data_type == 'ionospheric':
                ionospheric_data = IonosphericData(
                dt=datetime.strptime(record['dt'], '%Y-%m-%d %H:%M:%S'),
                station=record['station'],
                fof2=Decimal(record['fof2']) if record['fof2'] is not None else None,
                fof2_eval=record['fof2_eval'],
                muf3000f2=Decimal(record['muf3000f2']) if record['muf3000f2'] is not None else None,
                muf3000f2_eval=record['muf3000f2_eval'],
                m3000f2=Decimal(record['m3000f2']) if record['m3000f2'] is not None else None,
                m3000f2_eval=record['m3000f2_eval'],
                fxi=Decimal(record['fxi']) if record['fxi'] is not None else None,
                fxi_eval=record['fxi_eval'],
                fof1=Decimal(record['fof1']) if record['fof1'] is not None else None,
                fof1_eval=record['fof1_eval'],
                ftes=Decimal(record['ftes']) if record['ftes'] is not None else None,
                ftes_eval=record['ftes_eval'],
                h_es=Decimal(record['h_es']) if record['h_es'] is not None else None,
                h_es_eval=record['h_es_eval'],
                aip_hmf2=Decimal(record['aip_hmf2']) if record['aip_hmf2'] is not None else None,
                aip_fof2=Decimal(record['aip_fof2']) if record['aip_fof2'] is not None else None,
                aip_fof1=Decimal(record['aip_fof1']) if record['aip_fof1'] is not None else None,
                aip_hmf1=Decimal(record['aip_hmf1']) if record['aip_hmf1'] is not None else None,
                aip_d1=Decimal(record['aip_d1']) if record['aip_d1'] is not None else None,
                aip_foe=Decimal(record['aip_foe']) if record['aip_foe'] is not None else None,
                aip_hme=Decimal(record['aip_hme']) if record['aip_hme'] is not None else None,
                aip_yme=Decimal(record['aip_yme']) if record['aip_yme'] is not None else None,
                aip_h_ve=Decimal(record['aip_h_ve']) if record['aip_h_ve'] is not None else None,
                aip_ewidth=Decimal(record['aip_ewidth']) if record['aip_ewidth'] is not None else None,
                aip_deln_ve=Decimal(record['aip_deln_ve']) if record['aip_deln_ve'] is not None else None,
                aip_b0=Decimal(record['aip_b0']) if record['aip_b0'] is not None else None,
                aip_b1=Decimal(record['aip_b1']) if record['aip_b1'] is not None else None,
                tec_bottom=Decimal(record['tec_bottom']) if record['tec_bottom'] is not None else None,
                tec_top=Decimal(record['tec_top']) if record['tec_top'] is not None else None,
                profile=record['profile'],
                trace=record['trace'],
                modified=datetime.strptime(record['modified'], '%Y-%m-%d %H:%M:%S'),
                fof2_med_27_days=Decimal(record['fof2_med_27_days']) if record['fof2_med_27_days'] is not None else None
            )
                db.add(ionospheric_data)
            elif data_type == 'solar':
                solar_data = SolarData(
                    dt=datetime.strptime(record['time-tag'], '%Y-%m'),
                    ssn=Decimal(record['ssn']) if record['ssn'] is not None else None,
                    smoothed_ssn=Decimal(record['smoothed_ssn']) if record['smoothed_ssn'] is not None else None,
                    observed_swpc_ssn=Decimal(record['observed_swpc_ssn']) if record['observed_swpc_ssn'] is not None else None,
                    smoothed_swpc_ssn=Decimal(record['smoothed_swpc_ssn']) if record['smoothed_swpc_ssn'] is not None else None,
                    f10_7=Decimal(record['f10.7']) if record['f10.7'] is not None else None,
                    smoothed_f10_7=Decimal(record['smoothed_f10.7']) if record['smoothed_f10.7'] is not None else None,
                )
                db.add(solar_data)
            
            db.commit()  # Commit después de cada inserción
            print(f"{data_type.capitalize()} data saved")
            time.sleep(1)
        except IntegrityError as e:
            db.rollback()  # Deshacer la transacción en caso de error
            if 'duplicate key value violates unique constraint' in str(e.orig):
                print(f"Duplicate entry for {data_type} data: {record['dt'] if data_type == 'ionospheric' else record['time-tag']}. Skipping.")
            else:
                print(f"Error inserting {data_type} data for record {record['time-tag'] if data_type == 'solar' else record['dt']}: {e.orig}")
        except Exception as e:
            db.rollback()  # Deshacer la transacción en caso de error no esperado
            print(f"Unexpected error for {data_type} record {record['time-tag'] if data_type == 'solar' else record['dt']}: {e}")

def fetch_ionospheric_data(start_time, end_time):
    url = f"{BASE_URL}{STATION_CODE}?filter=dt,bt,{start_time},{end_time}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(f"Ionospheric data fetched from {start_time} to {end_time}")
        time.sleep(1)
        with get_db_session() as db:
            save_data(db, data['records'], data_type='ionospheric')
    else:
        print(f"Error fetching ionospheric data: {response.status_code}")

def fetch_solar_data():
    response = requests.get(SOLAR_URL)
    if response.status_code == 200:
        data = response.json()
        if data:
            last_record = data[-1]  # Obtiene el último registro
            print(f"Solar data fetched: {last_record}")
            with get_db_session() as db:
                save_data(db, [last_record], data_type='solar')  # Envía solo el último registro
        else:
            print("No solar data found in the response.")
    else:
        print(f"Error fetching solar data: {response.status_code}")

def main():
    last_solar_fetch = None  # Para llevar un registro de la última descarga solar
    print("Download client is running...\n")
    while True:
        
        # Obtener el tiempo actual
        now = datetime.now()
        
        # Calcular el tiempo de inicio y fin para la solicitud de datos ionosféricos
        end_time = now.replace(second=0, microsecond=0)  # Redondear al minuto
        start_time = end_time - timedelta(minutes=10)  # 10 minutos antes
        
        # Formatear los tiempos en el formato adecuado
        start_time_str = start_time.strftime('%Y-%m-%d %H:%M:%S')
        end_time_str = end_time.strftime('%Y-%m-%d %H:%M:%S')

        # Hacer la solicitud de datos ionosféricos
        fetch_ionospheric_data(start_time_str, end_time_str)

        # Verificar si es el día de descargar datos solares
        if now.day == MONTHLY_FETCH_DAY:
            if last_solar_fetch is None or now.date() > last_solar_fetch.date():
                fetch_solar_data()
                print("today's a sunny day!!\n")
                last_solar_fetch = now  # Actualizar la última fecha de descarga solar
        else:
            print("today's not a sunny day\n")

        time.sleep(300)  # Espera 300 segundos (5 minutos)

if __name__ == "__main__":
    main()
