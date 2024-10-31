# auth.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr
import datetime
import os
import jwt
from dotenv import load_dotenv
from requests import Session
from app.models import User as UserModel
from app.pydantic_models import LoginUser as LoginUser
from app.database import SessionLocal, get_db
from app.admin import get_current_user

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

    # Verifica si el usuario existe y si la contraseña es correcta
    if not db_user or not db_user.verify_password(user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Verifica si el usuario ha sido aprobado
    if not db_user.is_active:
        raise HTTPException(status_code=403, detail="User is not approved")

    # Si todo es correcto, genera el token
    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    token = jwt.encode({
        "sub": db_user.email,
        "exp": expiration,
        "is_admin": db_user.is_admin  # Incluye is_admin en el token
    }, SECRET_KEY, algorithm="HS256")

    return {
        "token": token,
        "is_admin": db_user.is_admin  # Esto aún puede quedar si deseas
    }


@router.post("/api/register")
async def register(user: User):
    db = SessionLocal()
    
    # Verifica si el usuario ya está registrado
    existing_user = db.query(UserModel).filter(UserModel.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Crea un nuevo usuario con el estado de "is_active" en False
    new_user = UserModel(
        name=user.name,
        last_name=user.last_name,
        email=user.email,
        is_active=False,  # El usuario queda inactivo hasta aprobación
        is_admin=False    # Asumimos que el registro regular no es administrador
    )
    new_user.set_password(user.password)  # Establece la contraseña encriptada

    # Agrega el usuario a la base de datos
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully, awaiting admin approval"}

@router.get("/api/admin/pending-users")
async def get_pending_users():
    db = SessionLocal()
    users = db.query(UserModel).filter(UserModel.is_active == False).all()
    return users

@router.post("/api/users/{user_id}/approve")
async def approve_user(user_id: str):
    db = SessionLocal()
    user = db.query(UserModel).filter(UserModel.id == user_id).first()  # Asegúrate de que este campo sea el correcto

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.is_active = True
    db.commit()
    
    return {"message": "User approved successfully"}


@router.delete("/api/users/{user_id}/reject")
async def reject_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return {"message": "User rejected"}



