from fastapi import APIRouter
from app.models import Record
from app.utils import download_json, generate_url

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