import requests
import time
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.database import get_db  
from app.models import IonosphericData 
from contextlib import contextmanager
from decimal import Decimal

STATION_CODE = "wstuj2o_auto"  # Código de la estación
BASE_URL = "http://ws-eswua.rm.ingv.it/ais.php/records/"

@contextmanager
def get_db_session():
    db = next(get_db())  # Obtiene la sesión de la base de datos
    try:
        yield db
    finally:
        db.close()  # Cierra la sesión después de usarla

def save_data(db: Session, records):
    for record in records:
        try:
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
            db.commit()  # Commit después de cada inserción
            print(f"Data saved")
            time.sleep(1)
        except IntegrityError as e:
            db.rollback()  # Deshacer la transacción en caso de error
            print(f"Error inserting data for record {record['dt']}: {e.orig}")  # Imprimir el error para depuración
        except Exception as e:
            db.rollback()  # Deshacer la transacción en caso de error no esperado
            print(f"Unexpected error for record {record['dt']}: {e}")

def fetch_ionospheric_data(start_time, end_time):
    url = f"{BASE_URL}{STATION_CODE}?filter=dt,bt,{start_time},{end_time}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print(f"Data fetched")
        time.sleep(1) 
        with get_db_session() as db:  # Usar el context manager
            save_data(db, data['records'])  # Pasa la sesión y los registros
    else:
        print(f"Error fetching data: {response.status_code}")

def main():
    while True:
        print("Download client is running...")

        # Obtener el tiempo actual
        now = datetime.now()
        
        # Calcular el tiempo de inicio y fin para la solicitud
        end_time = now.replace(second=0, microsecond=0)  # Redondear al minuto
        start_time = end_time - timedelta(minutes=10)  # 10 minutos antes
        
        # Formatear los tiempos en el formato adecuado
        start_time_str = start_time.strftime('%Y-%m-%d %H:%M:%S')
        end_time_str = end_time.strftime('%Y-%m-%d %H:%M:%S')

        # Hacer la solicitud
        fetch_ionospheric_data(start_time_str, end_time_str)

        # Esperar 10 minutos
        time.sleep(300)  # Espera 300 segundos (5 minutos)

if __name__ == "__main__":
    main()
