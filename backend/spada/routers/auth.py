# auth.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import datetime
import os
import jwt
from dotenv import load_dotenv
from app.models import User as UserModel
from app.pydantic_models import LoginUser as LoginUser
from app.database import SessionLocal

# Cargar las variables de entorno
load_dotenv()

# Obtener la SECRET_KEY
SECRET_KEY = os.getenv("SECRET_KEY")
print("SECRET_KEY:", SECRET_KEY) 

# Crear el router de FastAPI para autenticación
router = APIRouter()

class User(BaseModel):
    name: str
    last_name: str
    email: EmailStr
    password: str

def verify_user(email: str, password: str):
    db = SessionLocal()
    user = db.query(UserModel).filter(UserModel.email == email).first()
    
    if user and user.verify_password(password):  # Asegúrate de tener este método en tu modelo
        return user
    return None

@router.post("/api/login")
async def login(user: LoginUser):
    db = SessionLocal()
    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()

    if not db_user or not db_user.verify_password(user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    token = jwt.encode({"sub": db_user.email, "exp": expiration}, SECRET_KEY, algorithm="HS256")

    return {"token": token}

@router.post("/api/register")
async def register(user: User):
    db = SessionLocal()
    existing_user = db.query(UserModel).filter(UserModel.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = UserModel(
        name=user.name,
        last_name=user.last_name,
        email=user.email
    )
    new_user.set_password(user.password)  # Establecer la contraseña encriptada

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}
