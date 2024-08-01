from fastapi import FastAPI
from routers import auth, data
from apscheduler.schedulers.background import BackgroundScheduler
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Incluir los routers
app.include_router(auth.router)
app.include_router(data.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ajusta esto para permitir solo los orígenes específicos que necesitas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define la función que realiza la solicitud
def send_request():
    url = 'http://127.0.0.1:8000/update-records'
    try:
        response = requests.get(url)
        print(f"Response: {response.status_code}")
    except requests.RequestException as e:
        print(f"Error: {e}")

# Configura el scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(send_request, 'interval', minutes=30)

@app.on_event("startup")
async def startup_event():
    # Inicia el scheduler en el evento de inicio
    if not scheduler.running:
        scheduler.start()

@app.on_event("shutdown")
async def shutdown_event():
    # Detiene el scheduler cuando la aplicación se cierra
    if scheduler.running:
        scheduler.shutdown()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Weather Data API"}
