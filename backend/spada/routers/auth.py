# auth.py
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
import datetime
import os
import jwt  # Asegúrate de tener instalado PyJWT
from dotenv import load_dotenv

# Cargar las variables de entorno
load_dotenv()

# Obtener la SECRET_KEY
SECRET_KEY = os.getenv("SECRET_KEY")

# Crear el router de FastAPI para autenticación
router = APIRouter()

class User(BaseModel):
    username: str
    password: str

def verify_user(username: str, password: str):
    # Valida tus usuarios de alguna manera; aquí, solo una demo
    return username == "user" and password == "password"

@router.post("/api/login")
async def login(user: User):
    if not verify_user(user.username, user.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    token = jwt.encode({"sub": user.username, "exp": expiration}, SECRET_KEY, algorithm="HS256")
    
    return {"token": token}