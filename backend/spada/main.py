from fastapi import FastAPI
from spada.routers import auth, data
from spada.database import engine
from spada import models

app = FastAPI()

# Crear las tablas en la base de datos
models.Base.metadata.create_all(bind=engine)

# Incluir los routers
app.include_router(auth.router)
app.include_router(data.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Weather Data API"}
