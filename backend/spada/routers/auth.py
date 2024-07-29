from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
def login():
    # Lógica para el login
    pass
