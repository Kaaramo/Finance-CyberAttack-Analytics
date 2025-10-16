"""
FastAPI Main Application
CyberAttack Analytics Dashboard Backend
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import analysis, visualizations
from services.preprocess import data_loader

app = FastAPI(
    title="CyberAttack Analytics API",
    description="API d'analyse de données de cyberattaques dans le secteur financier",
    version="1.0.0"
)

# Configuration CORS pour permettre les requêtes du frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Charger le dataset au démarrage
@app.on_event("startup")
async def startup_event():
    """Charger le dataset au démarrage de l'application"""
    try:
        data_loader.load_dataset()
        if data_loader.validate_dataset():
            print("✅ Dataset chargé et validé avec succès!")
        else:
            print("⚠️ Dataset chargé mais validation échouée")
    except Exception as e:
        print(f"❌ Erreur lors du chargement du dataset: {e}")

@app.get("/")
async def root():
    """Route racine - Health check"""
    return {
        "message": "CyberAttack Analytics API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    dataset_loaded = data_loader.df is not None
    return {
        "status": "ok",
        "message": "Backend is running",
        "dataset_loaded": dataset_loaded,
        "total_records": len(data_loader.df) if dataset_loaded else 0
    }

# Include routers
app.include_router(analysis.router, prefix="/api", tags=["analysis"])
app.include_router(visualizations.router, prefix="/api", tags=["visualizations"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
