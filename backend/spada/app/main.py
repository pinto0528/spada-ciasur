from fastapi import FastAPI
from routers import auth, data, scheduler
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Incluir los routers
app.include_router(auth.router)
app.include_router(data.router)
app.include_router(scheduler.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ajusta esto para permitir solo los orígenes específicos que necesitas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Weather Data API"}
