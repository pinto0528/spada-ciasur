from fastapi import FastAPI
from routers import auth, ionospheric_data, solar_data, averages
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .admin import create_admin_user

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Incluir los routers
app.include_router(auth.router) 
app.include_router(ionospheric_data.router)
app.include_router(solar_data.router)
app.include_router(averages.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Weather Data API"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ajusta esto para permitir solo los orígenes específicos que necesitas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_admin_user()





