# Backend - CyberAttack Analytics API

API FastAPI pour l'analyse de données de cyberattaques dans le secteur financier.

## Structure

```
backend/
├── main.py                 # Application FastAPI principale
├── routers/                # Endpoints API
│   ├── dataset.py          # Info dataset
│   ├── analysis.py         # KPIs et statistiques
│   └── visualizations.py   # Graphiques Plotly
├── services/               # Logique métier
│   ├── preprocess.py       # Chargement données
│   ├── analysis_engine.py  # Calculs statistiques
│   └── visualization_engine.py  # Génération graphiques
├── data/                   # Dataset CSV
├── notebooks/              # Notebooks Jupyter
└── requirements.txt        # Dépendances Python
```

## Installation

```bash
# Créer l'environnement virtuel
python -m venv venv

# Activer l'environnement
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt
```

## Démarrage

```bash
# Avec uvicorn
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Ou directement
python main.py
```

L'API sera accessible sur `http://localhost:8000`

Documentation interactive: `http://localhost:8000/docs`

## Endpoints Disponibles

### Health Check
- `GET /` - Root endpoint
- `GET /api/health` - Health check

### Dataset (Phase 1)
- `GET /api/dataset/info` - Informations sur le dataset

### Dashboard (Phase 2)
- `GET /api/dashboard/kpis` - KPIs globaux
- `GET /api/dashboard/top-incidents` - Top 5 incidents
- `GET /api/dashboard/top-countries` - Top 10 pays
- `GET /api/dashboard/map` - Carte géographique

### Analyse Univariée (Phase 3)
- `GET /api/univariate/temporal-evolution` - Évolution temporelle
- `GET /api/univariate/attack-types-distribution` - Types d'attaques
- `GET /api/univariate/attack-sources` - Sources d'attaques
- `GET /api/univariate/vulnerabilities` - Vulnérabilités
- `GET /api/univariate/countries-distribution` - Répartition par pays

### Analyse Bivariée (Phase 4)
- `GET /api/bivariate/types-by-country` - Types par pays
- `GET /api/bivariate/losses-by-type-temporal` - Pertes par type
- `GET /api/bivariate/defense-efficiency` - Efficacité défenses

## Dataset

Placez votre fichier CSV dans `backend/data/cyberattacks_clean.csv`

Le dataset doit contenir les colonnes suivantes:
- Country
- Year
- Attack Type
- Target Industry
- Financial Loss (in Million $)
- Number of Affected Users
- Attack Source
- Security Vulnerability Type
- Defense Mechanism Used
- Incident Resolution Time (in Hours)

## Développement

### Ajouter un nouvel endpoint

1. Créer la route dans le fichier router approprié
2. Implémenter la logique dans le service correspondant
3. Tester avec `http://localhost:8000/docs`

### Tests

```bash
pytest
```

## CORS

Le backend autorise les requêtes depuis:
- `http://localhost:3000` (Frontend Next.js)

Pour ajouter d'autres origines, modifier [main.py](main.py):

```python
allow_origins=["http://localhost:3000", "https://example.com"]
```

## Notes

- Le dataset est chargé en mémoire au démarrage
- Utiliser Pandas pour les calculs vectorisés
- Tous les graphiques utilisent le thème `plotly_dark`
- Les endpoints retournent du JSON
