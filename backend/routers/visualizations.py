"""
Visualizations Router
Endpoints pour la génération des graphiques Plotly
"""

from fastapi import APIRouter, HTTPException
from services.preprocess import data_loader
from services.visualization_engine import VisualizationEngine

router = APIRouter()

@router.get("/dashboard/map")
async def get_map_visualization():
    """
    Génère la carte géographique mondiale
    """
    try:
        if data_loader.df is None:
            data_loader.load_dataset()

        engine = VisualizationEngine(data_loader.df)
        map_chart = engine.generate_map_visualization()

        return {"chart": map_chart}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/univariate/temporal-evolution")
async def get_temporal_evolution():
    """
    Graphique d'évolution temporelle des attaques
    """
    try:
        if data_loader.df is None:
            data_loader.load_dataset()

        engine = VisualizationEngine(data_loader.df)
        chart = engine.generate_temporal_evolution()

        return {"chart": chart}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/univariate/attack-types-distribution")
async def get_attack_types_distribution():
    """
    Graphique en camembert des types d'attaques
    """
    try:
        if data_loader.df is None:
            data_loader.load_dataset()

        engine = VisualizationEngine(data_loader.df)
        chart = engine.generate_attack_types_pie()

        return {"chart": chart}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/univariate/attack-sources")
async def get_attack_sources():
    """
    Graphique des sources d'attaques
    """
    try:
        if data_loader.df is None:
            data_loader.load_dataset()

        engine = VisualizationEngine(data_loader.df)
        chart = engine.generate_attack_sources_bar()

        return {"chart": chart}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/univariate/vulnerabilities")
async def get_vulnerabilities():
    """
    Graphique des vulnérabilités exploitées
    """
    try:
        if data_loader.df is None:
            data_loader.load_dataset()

        engine = VisualizationEngine(data_loader.df)
        chart = engine.generate_vulnerabilities_bar()

        return {"chart": chart}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/univariate/countries-distribution")
async def get_countries_distribution():
    """
    Graphique de la répartition par pays
    """
    try:
        if data_loader.df is None:
            data_loader.load_dataset()

        engine = VisualizationEngine(data_loader.df)
        chart = engine.generate_countries_bar()

        return {"chart": chart}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/bivariate/types-by-country")
async def get_types_by_country():
    """
    Graphique groupé des types d'attaques par pays
    """
    try:
        if data_loader.df is None:
            data_loader.load_dataset()

        engine = VisualizationEngine(data_loader.df)
        chart = engine.generate_types_by_country()

        return {"chart": chart}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/bivariate/losses-by-type-temporal")
async def get_losses_by_type_temporal():
    """
    Graphique d'évolution des pertes par type d'attaque
    """
    try:
        if data_loader.df is None:
            data_loader.load_dataset()

        engine = VisualizationEngine(data_loader.df)
        chart = engine.generate_losses_temporal()

        return {"chart": chart}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/bivariate/defense-efficiency")
async def get_defense_efficiency():
    """
    Graphique de l'efficacité des mécanismes de défense
    """
    try:
        if data_loader.df is None:
            data_loader.load_dataset()

        engine = VisualizationEngine(data_loader.df)
        chart = engine.generate_defense_efficiency()

        return {"chart": chart}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
