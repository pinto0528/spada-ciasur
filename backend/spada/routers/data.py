from fastapi import APIRouter

router = APIRouter()

@router.get("/data")
def get_data():
    # Lógica para obtener datos atmosféricos
    pass

@router.post("/data")
def add_data():
    # Lógica para añadir datos atmosféricos
    pass
