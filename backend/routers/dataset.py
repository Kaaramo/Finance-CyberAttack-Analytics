"""
Dataset Router
Endpoints pour les informations sur le dataset
"""

from fastapi import APIRouter

router = APIRouter()

@router.get("/info")
async def get_dataset_info():
    """
    Retourne les informations générales sur le dataset
    """
    # À implémenter dans Phase 1
    return {
        "message": "Dataset info endpoint - to be implemented"
    }
