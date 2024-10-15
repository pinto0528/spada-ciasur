from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import subprocess
import psutil

router = FastAPI()

# Variable para almacenar el proceso del cliente de descarga
download_client_process = None

def start_download_client():
    global download_client_process
    download_client_process = subprocess.Popen(["python", "download_client.py"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

def stop_download_client():
    global download_client_process
    if download_client_process is not None:
        # Encuentra y termina el proceso
        pid = download_client_process.pid
        process = psutil.Process(pid)
        process.terminate()  # Termina el proceso
        download_client_process = None  # Resetea la variable

@router.get("/")
def read_root():
    return {"message": "Welcome to the Download Server API"}

@router.post("/download-client/start")
def start_client():
    if download_client_process is not None:
        return JSONResponse(content={"message": "Download client is already running"}, status_code=400)

    start_download_client()
    return JSONResponse(content={"message": "Download client started"}, status_code=200)

@router.post("/download-client/stop")
def stop_client():
    if download_client_process is None:
        return JSONResponse(content={"message": "Download client is not running"}, status_code=400)

    stop_download_client()
    return JSONResponse(content={"message": "Download client stopped"}, status_code=200)
