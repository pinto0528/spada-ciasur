import json
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.spada.app.models import Record  # Asegúrate de importar tu modelo

# Conectar a la base de datos
DATABASE_URL = "postgresql://postgres:admin@localhost/spada-records-new"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
session = SessionLocal()

# Función para convertir cadenas a booleanos
def to_boolean(value):
    if isinstance(value, str):
        value = value.strip().lower()
        if value == 'true':
            return True
        elif value == 'false':
            return False
        elif value == '':
            return None
    return value

# Cargar y parsear el archivo JSON
with open('records.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Insertar datos en la base de datos
for item in data:
    record = Record(
        dt=item.get('dt'),
        station=item.get('station'),
        fromfile=item.get('fromfile'),
        producer=item.get('producer'),
        evaluated=to_boolean(item.get('evaluated')),  # Convertir a booleano
        fof2=item.get('fof2'),
        fof2_eval=to_boolean(item.get('fof2_eval')),  # Convertir a booleano
        muf3000f2=item.get('muf3000f2'),
        muf3000f2_eval=to_boolean(item.get('muf3000f2_eval')),  # Convertir a booleano
        m3000f2=item.get('m3000f2'),
        m3000f2_eval=to_boolean(item.get('m3000f2_eval')),  # Convertir a booleano
        fxi=item.get('fxi'),
        fxi_eval=to_boolean(item.get('fxi_eval')),  # Convertir a booleano
        fof1=item.get('fof1'),
        fof1_eval=to_boolean(item.get('fof1_eval')),  # Convertir a booleano
        ftes=item.get('ftes'),
        ftes_eval=to_boolean(item.get('ftes_eval')),  # Convertir a booleano
        h_es=item.get('h_es'),
        h_es_eval=to_boolean(item.get('h_es_eval')),  # Convertir a booleano
        aip_hmf2=item.get('aip_hmf2'),
        aip_fof2=item.get('aip_fof2'),
        aip_fof1=item.get('aip_fof1'),
        aip_hmf1=item.get('aip_hmf1'),
        aip_d1=item.get('aip_d1'),
        aip_foe=item.get('aip_foe'),
        aip_hme=item.get('aip_hme'),
        aip_yme=item.get('aip_yme'),
        aip_h_ve=item.get('aip_h_ve'),
        aip_ewidth=item.get('aip_ewidth'),
        aip_deln_ve=item.get('aip_deln_ve'),
        aip_b0=item.get('aip_b0'),
        aip_b1=item.get('aip_b1'),
        tec_bottom=item.get('tec_bottom'),
        tec_top=item.get('tec_top'),
        profile=item.get('profile'),
        trace=item.get('trace'),
        modified=item.get('modified'),
        fof2_med_27_days=item.get('fof2_med_27_days')
    )
    session.add(record)

# Confirmar la transacción
try:
    session.commit()
except Exception as e:
    session.rollback()
    print(f"Error: {e}")
finally:
    session.close()