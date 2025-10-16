"""
Analysis Router
Endpoints pour les calculs de KPIs et statistiques
"""

from fastapi import APIRouter, HTTPException
from services.preprocess import data_loader
from services.analysis_engine import AnalysisEngine

router = APIRouter()

@router.get("/dashboard/kpis")
async def get_global_kpis():
    """
    Calcule les 4 KPIs globaux du dashboard
    """
    try:
        if data_loader.df is None:
            data_loader.load_dataset()

        engine = AnalysisEngine(data_loader.df)
        kpis = engine.calculate_global_kpis()

        return kpis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard/top-incidents")
async def get_top_incidents():
    """
    Retourne les 5 incidents les plus coûteux
    """
    try:
        if data_loader.df is None:
            data_loader.load_dataset()

        engine = AnalysisEngine(data_loader.df)
        top_incidents = engine.get_top_incidents(5)

        return {"top_incidents": top_incidents}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard/top-countries")
async def get_top_countries():
    """
    Retourne les 10 pays avec le plus de pertes cumulées
    """
    try:
        if data_loader.df is None:
            data_loader.load_dataset()

        engine = AnalysisEngine(data_loader.df)
        top_countries = engine.get_top_countries(10)

        return {"top_countries": top_countries}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
