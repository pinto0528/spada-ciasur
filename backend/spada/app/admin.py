import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base  # Importa tus configuraciones de base de datos
from .models import User  # Asegúrate de importar tu modelo de usuario
from fastapi import Depends, HTTPException
import os
import jwt
from dotenv import load_dotenv
from requests import Session
from app.models import User as UserModel

# Cargar las variables del archivo .env
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

def create_admin_user():
    # Configura la sesión de la base de datos
    session = Session(bind=engine)

    try:
        # Variables de entorno para email y contraseña
        admin_email = os.getenv("ADMIN_EMAIL")
        admin_password = os.getenv("ADMIN_PASSWORD")

        # Verifica si el usuario administrador ya existe
        existing_admin = session.query(User).filter_by(email=admin_email).first()
        if existing_admin:
            print("Admin user already exists.")
            print("ADMIN USER:", admin_email)
            print("ADMIN PASS:", admin_password)
            return

        # Crear el nuevo usuario administrador
        admin_user = User(
            name="Admin",
            last_name="User",
            email=admin_email,
            is_admin=True,
            is_active=True
        )
        # Hashear la contraseña y establecerla
        admin_user.set_password(admin_password)

        # Agregar el usuario a la sesión y confirmar los cambios
        session.add(admin_user)
        session.commit()
        print("Admin user created successfully.")
        print("ADMIN USER:", admin_email)
        print("ADMIN PASS:", admin_password)
    except Exception as e:
        print("An error occurred while creating the admin user:", e)
        session.rollback()
    finally:
        session.close()


from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    # Decodifica el token y obtiene el usuario
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")

        db = SessionLocal()
        user = db.query(UserModel).filter(UserModel.email == email).first()
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
        
        return user
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication credentials")


if __name__ == "__main__":
    create_admin_user()