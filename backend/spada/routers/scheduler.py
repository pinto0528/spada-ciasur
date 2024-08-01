from fastapi import HTTPException, APIRouter
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
import requests

router = APIRouter()

# Inicializa el scheduler
scheduler = BackgroundScheduler()

# Define la función que realiza la solicitud
def send_request():
    url = 'http://127.0.0.1:8000/update-records'
    try:
        response = requests.get(url)
        print(f"Response: {response.status_code}")
    except requests.RequestException as e:
        print(f"Error: {e}")

# Añade la tarea al scheduler, pero no la inicia automáticamente
scheduler.add_job(send_request, IntervalTrigger(minutes=30), id='update_records_job')

scheduler_running = False

@router.post("/scheduler/start")
async def start_scheduler():
    global scheduler_running
    if scheduler_running:
        raise HTTPException(status_code=400, detail="Scheduler is already running.")
    scheduler.start()
    scheduler_running = True
    return {"status": "Scheduler started"}

@router.post("/scheduler/stop")
async def stop_scheduler():
    global scheduler_running
    if not scheduler_running:
        raise HTTPException(status_code=400, detail="Scheduler is not running.")
    scheduler.shutdown()
    scheduler_running = False
    return {"status": "Scheduler stopped"}
