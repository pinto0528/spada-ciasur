from fastapi import FastAPI, APIRouter, HTTPException
import subprocess
import psutil
import os

router = APIRouter()

download_client_pid = None  # Variable para almacenar el PID del cliente de descarga

@router.post("/download-client/start")
def start_download_client():
    global download_client_pid  # Usamos la variable global

    # Comando para ejecutar el script
    command = ["python", "download_client.py"]

    # Iniciar el proceso
    process = subprocess.Popen(command, cwd=os.path.dirname(__file__))
    download_client_pid = process.pid  # Guardamos el PID
    return {"status": "Download client started", "pid": download_client_pid}

@router.post("/download-client/stop")
def stop_download_client():
    global download_client_pid  # Usamos la variable global

    if download_client_pid is not None:
        try:
            proc = psutil.Process(download_client_pid)
            proc.terminate()  # O usar proc.kill() para forzar la terminación
            download_client_pid = None  # Reseteamos el PID después de detener el proceso
            return {"status": "Download client stopped", "pid": proc.pid}
        except psutil.NoSuchProcess:
            download_client_pid = None  # Reseteamos si el proceso ya no existe
            raise HTTPException(status_code=404, detail="Download client not running")
    else:
        raise HTTPException(status_code=404, detail="Download client not running")

# Crear una instancia de FastAPI
app = FastAPI()

# Incluir el router
app.include_router(router)

# Para ejecutar el servidor directamente desde este archivo, aunque normalmente usarías el comando uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)
