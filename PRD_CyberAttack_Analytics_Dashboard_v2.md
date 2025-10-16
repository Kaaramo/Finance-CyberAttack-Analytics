# 🎯 PRD COMPLET - CYBERATTACK ANALYTICS DASHBOARD v2.0

## 📋 Contexte du projet

Tu construis une **application web d'analyse de données de cyberattaques dans le secteur des services financiers** qui permet de visualiser, analyser et comprendre l'évolution des menaces cyber de 2015 à 2025.

**Objectif académique** : Mini-projet de présentation sur la collecte et l'analyse de données de cyberattaques dans le secteur financier.

La stack technique est :

- **Frontend** : Next.js 15 avec composants Shadcn UI, TypeScript, Tailwind CSS
- **Backend** : FastAPI (Python) pour l'analyse et génération de visualisations
- **Librairies d'analyse** : Pandas, NumPy pour le traitement de données
- **Visualisation** : Plotly Express (backend) → Plotly.js (frontend) pour des graphiques interactifs
- **Données** : Dataset CSV unique (~486 incidents) traité en mémoire
- **Environnement Python** : Virtual environment (venv) + requirements.txt
- **Déploiement** : Application locale lancée depuis le terminal

---

## 🏗️ STRUCTURE DU PROJET

```
project-root/
│
├── frontend/                        # Application Next.js
│   ├── app/
│   │   ├── page.tsx                 # Page 1 : Dashboard principal
│   │   ├── univariate/
│   │   │   └── page.tsx             # Page 2 : Analyse univariée
│   │   ├── bivariate/
│   │   │   └── page.tsx             # Page 3 : Analyse bivariée
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Navigation entre pages
│   │   │   ├── Hero.tsx             # Hero Section avec KPIs
│   │   │   ├── KPICard.tsx          # Composant carte KPI
│   │   │   ├── DataTable.tsx        # Composant tableau de données
│   │   │   ├── Chart.tsx            # Composant affichant les graphes Plotly.js
│   │   │   ├── MapVisualization.tsx # Carte géographique
│   │   │   └── SectionContainer.tsx # Container pour sections
│   │   ├── hooks/
│   │   │   ├── useAnalysisData.ts   # Hook pour récupérer les données du backend
│   │   │   └── useFilters.ts        # Hook pour gérer les filtres (optionnel)
│   │   ├── lib/
│   │   │   ├── api.ts               # Client API pour communiquer avec backend
│   │   │   └── utils.ts             # Fonctions utilitaires (formatage, etc.)
│   │   └── layout.tsx               # Layout principal de l'app
│   ├── public/                      # Logos, images, assets
│   ├── components/ui/               # Composants ShadCN/UI
│   ├── styles/
│   │   └── globals.css              # Styles globaux (Tailwind)
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
│
├── backend/                         # API d'analyse Python
│   ├── venv/                        # Virtual environment Python (à créer)
│   ├── main.py                      # Entrée FastAPI (API principale)
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── dataset.py               # Endpoints : info dataset, health
│   │   ├── analysis.py              # Endpoints : calculs KPIs et statistiques
│   │   └── visualizations.py        # Endpoints : génération des graphiques Plotly
│   ├── services/
│   │   ├── __init__.py
│   │   ├── preprocess.py            # Nettoyage et normalisation du dataset
│   │   ├── analysis_engine.py       # Analyses statistiques et calculs
│   │   └── visualization_engine.py  # Création des graphes avec Plotly Express
│   ├── data/
│   │   └── cyberattacks_clean.csv   # Dataset nettoyé utilisé pour le projet
│   ├── notebooks/                   # Explorations Jupyter
│   │   ├── 01_data_exploration.ipynb
│   │   ├── 02_data_cleaning.ipynb
│   │   ├── 03_statistical_analysis.ipynb
│   │   ├── 04_univariate_analysis.ipynb
│   │   └── 05_bivariate_analysis.ipynb
│   ├── requirements.txt             # Dépendances Python
│   ├── .env                         # Variables d'environnement (optionnel)
│   └── README.md                    # Documentation backend
│
├── .gitignore                       # Ignorer venv/, node_modules/, etc.
└── README.md                        # Documentation générale du projet
```

---

## 🐍 SETUP ENVIRONNEMENT PYTHON

### Création du Virtual Environment

```bash
# Depuis la racine du projet
cd backend

# Créer le virtual environment
python -m venv venv

# Activer le virtual environment
# Sur Windows:
venv\Scripts\activate

# Sur macOS/Linux:
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt
```

### Fichier `requirements.txt`

```txt
# FastAPI et serveur
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-multipart==0.0.6

# Analyse de données
pandas==2.2.0
numpy==1.26.3

# Visualisation
plotly==5.18.0

# CORS (pour communication frontend-backend)
python-dotenv==1.0.0

# Validation de données
pydantic==2.5.3

# Tests (optionnel)
pytest==7.4.4
httpx==0.26.0
```

---

## 🎯 ARCHITECTURE DE L'APPLICATION

### Structure en 3 pages

L'application est organisée en **3 pages distinctes** accessibles via une navigation principale :

1. **Page 1 : Dashboard Principal** (`/`)
   - KPIs globaux (4 cartes)
   - 2 tableaux de données (Top 5 incidents + Top 10 pays)
   - 1 carte géographique mondiale interactive

2. **Page 2 : Analyse Univariée** (`/univariate`)
   - 5 visualisations statistiques d'analyse univariée
   - Graphiques Plotly interactifs

3. **Page 3 : Analyse Bivariée** (`/bivariate`)
   - 3 visualisations de relations entre variables
   - Graphiques Plotly interactifs

### Navigation

**Navbar persistante** présente sur toutes les pages avec :
- Logo/Titre de l'application
- Liens de navigation : Dashboard | Analyse Univariée | Analyse Bivariée
- Design cohérent avec le dark mode

---

## 📊 SPÉCIFICATIONS DES PAGES

### PAGE 1 : DASHBOARD PRINCIPAL

#### Vision
Page d'accueil offrant une vue d'ensemble des cyberattaques avec les métriques clés, les incidents majeurs et une visualisation géographique globale.

#### Composants

**1. Hero Section avec 4 KPIs**

Affichage des métriques globales du dataset complet (2015-2025) :

| KPI | Description | Calcul | Format d'affichage |
|-----|-------------|--------|-------------------|
| **Total Attacks** | Nombre total d'incidents | `len(df)` | `486` incidents |
| **Total Financial Loss** | Pertes cumulées | `df['Financial Loss (in Million $)'].sum()` | `$25,432.5M` |
| **Total Affected Users** | Utilisateurs impactés | `df['Number of Affected Users'].sum()` | `145,000,000` utilisateurs |
| **Avg Resolution Time** | Temps moyen de résolution | `df['Incident Resolution Time (in Hours)'].mean()` | `38.2h` |

**Design des KPI Cards** :
- Grille responsive : 4 colonnes (desktop), 2 colonnes (tablet), 1 colonne (mobile)
- Card avec :
  - Icône (optionnelle)
  - Label du KPI
  - Valeur principale (grande, bold)
  - Animation count-up au chargement
- Couleur d'accent selon le KPI

**User Story** :
> En tant qu'utilisateur, je veux voir immédiatement les statistiques globales pour comprendre l'ampleur du phénomène des cyberattaques dans le secteur financier.

**Critères d'acceptation** :
- ✅ Les 4 KPIs s'affichent avec animation au chargement
- ✅ Valeurs formatées correctement (séparateurs de milliers, unités)
- ✅ Cards responsive
- ✅ Design cohérent dark mode

---

**2. Tableau : Top 5 des incidents les plus coûteux**

**Description** : Tableau de données présentant les 5 cyberattaques ayant causé le plus de pertes financières.

**Colonnes du tableau** :
| Colonne | Description | Type |
|---------|-------------|------|
| **Rang** | Position (1-5) | Number |
| **Pays** | Country | String |
| **Année** | Year | Number |
| **Type d'attaque** | Attack Type | String |
| **Pertes (M$)** | Financial Loss | Number (formaté) |
| **Utilisateurs affectés** | Number of Affected Users | Number (formaté) |

**Calcul backend** :
```python
top_incidents = df.nlargest(5, 'Financial Loss (in Million $)')[
    ['Country', 'Year', 'Attack Type', 'Financial Loss (in Million $)', 'Number of Affected Users']
]
```

**Formatage** :
- Pertes : `$64.3M` (1 décimale)
- Utilisateurs : `1,450,000` (séparateurs de milliers)
- Tri décroissant par pertes financières

**Design** :
- Tableau avec bordures
- Header en gras
- Lignes alternées (zebra striping)
- Responsive : scroll horizontal sur mobile si nécessaire

**User Story** :
> En tant qu'utilisateur, je veux identifier rapidement les incidents les plus graves pour comprendre les cas extrêmes.

**Critères d'acceptation** :
- ✅ Affichage des 5 incidents exacts
- ✅ Données triées par pertes décroissantes
- ✅ Formatage lisible
- ✅ Responsive

---

**3. Tableau : Impact financier total par pays (Top 10)**

**Description** : Tableau présentant les 10 pays ayant subi le plus de pertes financières cumulées.

**Colonnes du tableau** :
| Colonne | Description | Type |
|---------|-------------|------|
| **Rang** | Position (1-10) | Number |
| **Pays** | Country | String |
| **Pertes totales (M$)** | Somme des pertes | Number (formaté) |
| **Nombre d'incidents** | Nombre d'attaques | Number |
| **Perte moyenne (M$)** | Moyenne par incident | Number (formaté) |

**Calcul backend** :
```python
country_impact = df.groupby('Country').agg({
    'Financial Loss (in Million $)': ['sum', 'mean', 'count']
}).round(2)

country_impact.columns = ['Total_Loss', 'Avg_Loss', 'Attack_Count']
country_impact = country_impact.sort_values('Total_Loss', ascending=False).head(10)
```

**Design** :
- Même style que le tableau précédent
- Tri décroissant par pertes totales
- Possibilité de colorer les rangs (1-3 en couleur d'accent)

**User Story** :
> En tant qu'utilisateur, je veux voir quels pays sont les plus touchés financièrement pour identifier les zones à risque.

**Critères d'acceptation** :
- ✅ Top 10 pays corrects
- ✅ Pertes totales calculées correctement
- ✅ Perte moyenne affichée
- ✅ Nombre d'incidents visible

---

**4. Carte géographique mondiale interactive**

**Description** : Carte du monde (Scatter Geo Map) montrant la répartition géographique des cyberattaques avec intensité visuelle.

**Type de graphique** : `plotly.express.scatter_geo`

**Variables visualisées** :
- **Position** : Pays (locations)
- **Taille des bulles** : Nombre d'attaques (size)
- **Couleur** : Pertes financières totales (color)

**Calcul backend** :
```python
map_data = df.groupby('Country').agg({
    'Financial Loss (in Million $)': 'sum',
    'Country': 'count',
    'Number of Affected Users': 'sum'
}).round(2)

map_data.columns = ['Total_Loss', 'Attack_Count', 'Total_Users']
```

**Configuration Plotly** :
- Projection : `natural earth`
- Fond sombre : `landcolor='#1a1927'`, `oceancolor='#13121d'`
- Échelle de couleur : `Reds` (gradient rouge)
- `size_max=50` pour les bulles
- Hover data : Pays, Nombre d'attaques, Pertes totales, Utilisateurs affectés

**Interactions** :
- Zoom/Pan
- Hover tooltips avec détails
- Click pour focus (optionnel)

**Titre** : `"🌍 Cartographie Mondiale des Cyberattaques - Secteur Bancaire (2015-2025)"`

**User Story** :
> En tant qu'utilisateur, je veux visualiser géographiquement les cyberattaques pour comprendre la répartition mondiale des menaces.

**Critères d'acceptation** :
- ✅ Carte interactive avec Plotly.js
- ✅ Tous les pays du dataset affichés
- ✅ Taille et couleur représentent correctement les données
- ✅ Hover fonctionnel
- ✅ Design dark mode cohérent

---

### PAGE 2 : ANALYSE UNIVARIÉE

#### Vision
Page dédiée à l'analyse statistique univariée (distribution de chaque variable individuellement) avec 5 visualisations clés.

#### Composants

**Navigation** :
- Navbar en haut
- Titre de page : "Analyse Univariée - Distribution des Variables"
- Layout vertical (scroll)

---

**Graphique 1 : Évolution des Cyberattaques dans le Secteur Financier (2015-2025)**

**Type** : Line Chart (graphique en ligne)

**Variables** :
- Axe X : Année (Year)
- Axe Y : Nombre d'attaques (Count)

**Calcul backend** :
```python
attacks_by_year = df.groupby('Year').size().reset_index(name='Count')

fig = px.line(attacks_by_year,
              x='Year',
              y='Count',
              title='📈 Évolution des Cyberattaques dans le Secteur Financier (2015-2025)',
              markers=True)
```

**Configuration** :
- Ligne cyan (`#1fbec5`) avec markers
- Template dark mode
- Hover mode : `x unified`

**Insight à révéler** : Tendance temporelle (hausse/baisse), pics d'activité

**User Story** :
> En tant qu'utilisateur, je veux voir l'évolution temporelle pour identifier les périodes critiques.

---

**Graphique 2 : Répartition des Types d'Attaques Ciblant les Institutions Financières**

**Type** : Pie Chart / Donut Chart (graphique circulaire)

**Variables** :
- Segments : Attack Type
- Valeurs : Nombre d'occurrences

**Calcul backend** :
```python
attack_type_dist = df['Attack Type'].value_counts().reset_index()
attack_type_dist.columns = ['Attack Type', 'Count']

fig = px.pie(attack_type_dist,
             values='Count',
             names='Attack Type',
             title='🎯 Types d\'Attaques Ciblant les Institutions Financières',
             hole=0.4)  # Donut chart
```

**Configuration** :
- Couleurs : échelle de rouges (`Reds_r`)
- Labels : pourcentage + nom du type
- Position texte : `inside`

**Insight** : Types d'attaques dominants (ex : Phishing 25%, Ransomware 20%)

**User Story** :
> En tant qu'utilisateur, je veux voir la répartition des types pour comprendre les menaces principales.

---

**Graphique 3 : Origines des Menaces Cyber dans le Secteur Financier**

**Type** : Bar Chart (graphique en barres verticales)

**Variables** :
- Axe X : Attack Source
- Axe Y : Nombre d'attaques

**Calcul backend** :
```python
source_dist = df['Attack Source'].value_counts().reset_index()
source_dist.columns = ['Attack Source', 'Count']

fig = px.bar(source_dist,
             x='Attack Source',
             y='Count',
             title='🔍 Origines des Menaces Cyber dans le Secteur Financier')
```

**Configuration** :
- Couleurs : gradient orange (`Oranges`)
- Tri décroissant
- Valeurs affichées sur les barres

**Insight** : Sources principales (Nation-state, Hacker Groups, Insiders, Unknown)

**User Story** :
> En tant qu'utilisateur, je veux identifier qui attaque le secteur financier.

---

**Graphique 4 : Failles de Sécurité Exploitées - Systèmes Bancaires**

**Type** : Horizontal Bar Chart (barres horizontales)

**Variables** :
- Axe Y : Security Vulnerability Type
- Axe X : Nombre d'incidents

**Calcul backend** :
```python
vuln_dist = df['Security Vulnerability Type'].value_counts().reset_index()
vuln_dist.columns = ['Vulnerability', 'Count']

fig = px.bar(vuln_dist,
             x='Count',
             y='Vulnerability',
             orientation='h',
             title='🛡️ Failles de Sécurité Exploitées - Systèmes Bancaires')
```

**Configuration** :
- Couleurs : gradient rouge (`Reds`)
- Tri décroissant
- Labels complets visibles

**Insight** : Vulnérabilités les plus exploitées (Zero-day, Weak Passwords, etc.)

**User Story** :
> En tant qu'utilisateur, je veux connaître les failles critiques pour prioriser les correctifs.

---

**Graphique 5 : Cyberattaques par Pays - Secteur Bancaire et Financier**

**Type** : Horizontal Bar Chart (barres horizontales)

**Variables** :
- Axe Y : Country
- Axe X : Nombre d'attaques

**Calcul backend** :
```python
attacks_by_country = df['Country'].value_counts().reset_index()
attacks_by_country.columns = ['Country', 'Count']

fig = px.bar(attacks_by_country,
             x='Count',
             y='Country',
             orientation='h',
             title='🌍 Cyberattaques par Pays - Secteur Bancaire et Financier')
```

**Configuration** :
- Couleurs : gradient rouge (`Reds`)
- Tous les pays affichés (ou Top 15 si trop nombreux)
- Valeurs affichées

**Insight** : Pays les plus ciblés par nombre d'incidents

**User Story** :
> En tant qu'utilisateur, je veux voir le classement des pays ciblés par nombre d'attaques.

---

### PAGE 3 : ANALYSE BIVARIÉE

#### Vision
Page dédiée à l'analyse des relations entre deux variables avec 3 visualisations croisant différentes dimensions.

#### Composants

**Navigation** :
- Navbar en haut
- Titre de page : "Analyse Bivariée - Relations entre Variables"
- Layout vertical (scroll)

---

**Graphique 1 : Répartition des Types d'Attaques par Pays (Top 5)**

**Type** : Grouped Bar Chart (barres groupées)

**Variables** :
- Axe X : Country (Top 5 pays les plus attaqués)
- Axe Y : Nombre d'incidents
- Groupes : Attack Type (Top 4 types)

**Calcul backend** :
```python
top_countries = df['Country'].value_counts().head(5).index
top_attacks = df['Attack Type'].value_counts().head(4).index

df_filtered = df[df['Country'].isin(top_countries) & df['Attack Type'].isin(top_attacks)]

country_attack_counts = df_filtered.groupby(['Country', 'Attack Type']).size().reset_index(name='Count')

fig = px.bar(country_attack_counts,
             x='Country',
             y='Count',
             color='Attack Type',
             barmode='group',
             title='🌍 Répartition des Types d\'Attaques par Pays (Top 5) - Secteur Financier')
```

**Configuration** :
- Barmode : `group` (côte à côte)
- Légende horizontale en bas
- Couleurs distinctes par type

**Insight** : Profils de menaces différents selon les pays (ex : USA subit plus de Phishing, UK plus de Ransomware)

**User Story** :
> En tant qu'utilisateur, je veux comparer les types d'attaques entre pays pour adapter les défenses par géographie.

---

**Graphique 2 : Évolution des Pertes Financières par Type de Menace (2015-2025)**

**Type** : Multiple Lines Chart (lignes multiples)

**Variables** :
- Axe X : Year
- Axe Y : Pertes financières totales (M$)
- Lignes : Attack Type (Top 4 types)

**Calcul backend** :
```python
top_attacks = df['Attack Type'].value_counts().head(4).index
df_top_attacks = df[df['Attack Type'].isin(top_attacks)]

losses_by_year_type = df_top_attacks.groupby(['Year', 'Attack Type'])['Financial Loss (in Million $)'].sum().reset_index()

fig = px.line(losses_by_year_type,
              x='Year',
              y='Financial Loss (in Million $)',
              color='Attack Type',
              markers=True,
              title='📅 Évolution des Pertes Financières par Type de Menace (2015-2025)')
```

**Configuration** :
- Lignes épaisses (width=3)
- Markers visibles (size=8)
- Hover mode : `x unified`
- Légende horizontale

**Insight** : Identifier quels types d'attaques deviennent plus coûteux dans le temps

**User Story** :
> En tant qu'utilisateur, je veux voir l'évolution de l'impact financier de chaque type pour anticiper les menaces émergentes.

---

**Graphique 3 : Temps Moyen de Résolution par Mécanisme de Défense - Secteur Bancaire**

**Type** : Horizontal Bar Chart avec code couleur

**Variables** :
- Axe Y : Defense Mechanism Used
- Axe X : Temps moyen de résolution (heures)
- Couleur : Gradient vert (rapide) → rouge (lent)

**Calcul backend** :
```python
defense_efficiency = df.groupby('Defense Mechanism Used')['Incident Resolution Time (in Hours)'].mean().sort_values().reset_index()

fig = go.Figure()

# Code couleur selon efficacité
max_time = defense_efficiency['Incident Resolution Time (in Hours)'].max()
colors = ['rgb(39,174,96)' if t < max_time/2
          else 'rgb(230,126,34)' if t < max_time*0.75
          else 'rgb(231,76,60)'
          for t in defense_efficiency['Incident Resolution Time (in Hours)']]

fig.add_trace(go.Bar(
    y=defense_efficiency['Defense Mechanism Used'],
    x=defense_efficiency['Incident Resolution Time (in Hours)'],
    orientation='h',
    marker=dict(color=colors)
))
```

**Configuration** :
- Tri croissant (les plus efficaces en haut)
- Valeurs affichées sur les barres
- Code couleur : vert = efficace, orange = moyen, rouge = lent

**Insight** : Identifier les mécanismes de défense les plus rapides (ex : AI-based Detection vs Firewall)

**User Story** :
> En tant qu'utilisateur, je veux comparer l'efficacité des défenses pour orienter les investissements technologiques.

---

## 🔌 ENDPOINTS API BACKEND

### Architecture RESTful

**Base URL** : `http://localhost:8000/api`

---

#### **Route 1 : Health Check**
```
GET /api/health
```
**Description** : Vérifier que le backend est opérationnel

**Response** :
```json
{
  "status": "ok",
  "message": "Backend is running",
  "dataset_loaded": true,
  "total_records": 486
}
```

---

#### **Route 2 : Dataset Info**
```
GET /api/dataset/info
```
**Description** : Obtenir des informations sur le dataset chargé

**Response** :
```json
{
  "total_records": 486,
  "columns": ["Country", "Year", "Attack Type", ...],
  "date_range": {
    "min": 2015,
    "max": 2025
  },
  "countries": ["USA", "UK", "France", ...],
  "attack_types": ["Phishing", "Ransomware", "DDoS", ...]
}
```

---

#### **Route 3 : Global KPIs (Dashboard)**
```
GET /api/dashboard/kpis
```

**Description** : Calculer les 4 KPIs globaux

**Response** :
```json
{
  "total_attacks": 486,
  "total_financial_loss": 25432.5,
  "total_affected_users": 145000000,
  "avg_resolution_time": 38.2
}
```

---

#### **Route 4 : Top 5 Incidents (Dashboard)**
```
GET /api/dashboard/top-incidents
```

**Description** : Retourner les 5 incidents les plus coûteux

**Response** :
```json
{
  "top_incidents": [
    {
      "rank": 1,
      "country": "USA",
      "year": 2023,
      "attack_type": "Ransomware",
      "financial_loss": 98.5,
      "affected_users": 2500000
    },
    ...
  ]
}
```

---

#### **Route 5 : Top 10 Pays (Dashboard)**
```
GET /api/dashboard/top-countries
```

**Description** : Retourner les 10 pays avec le plus de pertes cumulées

**Response** :
```json
{
  "top_countries": [
    {
      "rank": 1,
      "country": "USA",
      "total_loss": 4523.7,
      "attack_count": 87,
      "avg_loss": 52.0
    },
    ...
  ]
}
```

---

#### **Route 6 : Carte Géographique (Dashboard)**
```
GET /api/dashboard/map
```

**Description** : Générer les données pour la carte mondiale

**Response** :
```json
{
  "map_chart": {
    "data": [...],  // Plotly Scatter Geo JSON
    "layout": {...}
  }
}
```

---

#### **Route 7 : Analyse Univariée - Graphique 1 (Évolution temporelle)**
```
GET /api/univariate/temporal-evolution
```

**Description** : Line chart de l'évolution des attaques par année

**Response** :
```json
{
  "chart": {
    "data": [...],
    "layout": {...}
  }
}
```

---

#### **Route 8 : Analyse Univariée - Graphique 2 (Types d'attaques)**
```
GET /api/univariate/attack-types-distribution
```

**Description** : Pie chart des types d'attaques

**Response** :
```json
{
  "chart": {
    "data": [...],
    "layout": {...}
  }
}
```

---

#### **Route 9 : Analyse Univariée - Graphique 3 (Sources)**
```
GET /api/univariate/attack-sources
```

**Description** : Bar chart des sources d'attaques

**Response** :
```json
{
  "chart": {
    "data": [...],
    "layout": {...}
  }
}
```

---

#### **Route 10 : Analyse Univariée - Graphique 4 (Vulnérabilités)**
```
GET /api/univariate/vulnerabilities
```

**Description** : Horizontal bar chart des vulnérabilités

**Response** :
```json
{
  "chart": {
    "data": [...],
    "layout": {...}
  }
}
```

---

#### **Route 11 : Analyse Univariée - Graphique 5 (Pays)**
```
GET /api/univariate/countries-distribution
```

**Description** : Horizontal bar chart des pays

**Response** :
```json
{
  "chart": {
    "data": [...],
    "layout": {...}
  }
}
```

---

#### **Route 12 : Analyse Bivariée - Graphique 1 (Types par pays)**
```
GET /api/bivariate/types-by-country
```

**Description** : Grouped bar chart

**Response** :
```json
{
  "chart": {
    "data": [...],
    "layout": {...}
  }
}
```

---

#### **Route 13 : Analyse Bivariée - Graphique 2 (Pertes par type)**
```
GET /api/bivariate/losses-by-type-temporal
```

**Description** : Multiple lines chart

**Response** :
```json
{
  "chart": {
    "data": [...],
    "layout": {...}
  }
}
```

---

#### **Route 14 : Analyse Bivariée - Graphique 3 (Efficacité défenses)**
```
GET /api/bivariate/defense-efficiency
```

**Description** : Horizontal bar chart avec code couleur

**Response** :
```json
{
  "chart": {
    "data": [...],
    "layout": {...}
  }
}
```

---

## 🎨 EXIGENCES UI/UX

### Design System

**Palette de couleurs** (dark mode professionnel) :

```css
--background-primary: #13121d;    /* Fond principal dark navy */
--background-secondary: #1a1927;  /* Cards/sections */
--background-card: #242332;       /* Cards individuelles */
--accent-cyan: #1fbec5;           /* Graphiques, highlights */
--accent-orange: #dd4d14;         /* Alertes, données critiques */
--accent-red: #c51d31;            /* Erreurs, dangers */
--accent-green: #27ae60;          /* Success, efficacité */
--text-primary: #ffffff;          /* Texte principal */
--text-secondary: #9ca3af;        /* Texte secondaire */
--border-color: #2d2c3d;          /* Bordures */
```

**Typographie** :
- Font principale : **Poppins** (Google Fonts)
- Headers : Poppins Bold (24-48px)
- Body : Poppins Regular (14-16px)
- KPIs : Poppins SemiBold (32-40px)
- Titres de graphiques : Poppins SemiBold (18-20px)

---

### Composants UI

#### **1. Navbar.tsx**
**Description** : Barre de navigation persistante

**Éléments** :
- Logo/Titre : "CyberAttack Analytics"
- 3 liens de navigation :
  - Dashboard (Page 1)
  - Analyse Univariée (Page 2)
  - Analyse Bivariée (Page 3)
- Indicateur de page active (underline ou background différent)

**Design** :
- Position : `sticky top-0`
- Background : `bg-background-secondary` avec `backdrop-blur`
- Border bottom : `border-b border-border-color`
- Hauteur : 64px

---

#### **2. KPICard.tsx**
**Description** : Carte d'affichage d'un KPI

**Props** :
- `title` : string (ex : "Total Attacks")
- `value` : string | number (ex : 486)
- `icon` : ReactNode (optionnel)
- `color` : string (couleur d'accent)

**Design** :
- Background : `bg-background-card`
- Padding : 24px
- Border radius : 12px
- Animation : Fade in + count up de la valeur
- Hover : Légère élévation (shadow)

---

#### **3. DataTable.tsx**
**Description** : Composant tableau de données générique

**Props** :
- `columns` : Array<{key: string, label: string, format?: Function}>
- `data` : Array<Object>
- `title` : string (optionnel)

**Design** :
- Table responsive
- Header sticky
- Zebra striping (lignes alternées)
- Border : `border border-border-color`
- Scroll horizontal sur mobile

---

#### **4. Chart.tsx**
**Description** : Wrapper pour graphiques Plotly.js

**Props** :
- `data` : Plotly data array
- `layout` : Plotly layout object
- `title` : string (optionnel, peut être dans layout)

**Features** :
- Loading state (skeleton)
- Error boundary
- Responsive resize
- Config Plotly : `{displayModeBar: true, responsive: true}`

---

#### **5. SectionContainer.tsx**
**Description** : Container pour sections de page

**Props** :
- `title` : string
- `children` : ReactNode

**Design** :
- Margin vertical : 48px
- Titre avec underline cyan
- Background : `bg-background-secondary` (optionnel)
- Padding : 32px

---

### Layout Structure

**Page 1 : Dashboard**
```jsx
<div className="min-h-screen bg-background-primary">
  <Navbar />

  <main className="container mx-auto px-4 py-8">
    {/* Hero Section avec KPIs */}
    <section className="mb-12">
      <h1 className="text-4xl font-bold mb-8">Dashboard Principal</h1>

      {/* Grille 4 KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard ... />
        <KPICard ... />
        <KPICard ... />
        <KPICard ... />
      </div>
    </section>

    {/* Tableaux */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <DataTable title="Top 5 Incidents" ... />
      <DataTable title="Top 10 Pays" ... />
    </div>

    {/* Carte géographique */}
    <SectionContainer title="Répartition Géographique Mondiale">
      <Chart ... />
    </SectionContainer>
  </main>
</div>
```

**Page 2 : Analyse Univariée**
```jsx
<div className="min-h-screen bg-background-primary">
  <Navbar />

  <main className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-8">Analyse Univariée</h1>

    <SectionContainer title="1. Évolution Temporelle">
      <Chart ... />
    </SectionContainer>

    <SectionContainer title="2. Types d'Attaques">
      <Chart ... />
    </SectionContainer>

    {/* ... 3 autres graphiques */}
  </main>
</div>
```

**Page 3 : Analyse Bivariée**
```jsx
<div className="min-h-screen bg-background-primary">
  <Navbar />

  <main className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold mb-8">Analyse Bivariée</h1>

    <SectionContainer title="1. Types par Pays">
      <Chart ... />
    </SectionContainer>

    {/* ... 2 autres graphiques */}
  </main>
</div>
```

---

### Responsive Design

**Breakpoints Tailwind** :
- Mobile : < 640px → 1 colonne
- Tablet : 640px - 1024px → 2 colonnes
- Desktop : > 1024px → 3-4 colonnes

**KPI Cards** :
- Mobile : 1 colonne
- Tablet : 2 colonnes
- Desktop : 4 colonnes

**Tableaux** :
- Desktop : 2 tableaux côte à côte
- Mobile/Tablet : 1 tableau par ligne

**Graphiques** :
- Toujours 100% de largeur de leur container
- Hauteur : 500-600px sur desktop, 400px sur mobile

---

### Animations & Interactions

**Au chargement** :
- Fade-in des sections (Framer Motion ou CSS)
- Count-up animation pour les KPIs
- Skeleton loaders pendant le fetch

**Interactions graphiques** :
- Hover tooltips (natif Plotly)
- Zoom/Pan (natif Plotly)
- Reset axes button

**Transitions** :
- Navigation entre pages : Smooth fade
- Hover sur cards : Scale 1.02 + shadow
- Loading spinners : Rotate animation

---

## 📊 STRUCTURE DES DONNÉES

### Dataset Source

**Fichier** : `backend/data/cyberattacks_clean.csv`

**Statistiques** :
- Nombre de lignes : 486 incidents
- Période : 2015-2025
- Pays : ~15 pays
- Types d'attaques : ~6-8 types

**Colonnes** :

| Colonne | Type | Description |
|---------|------|-------------|
| Country | string | Pays où l'attaque s'est produite |
| Year | int | Année de l'incident (2015-2025) |
| Attack Type | string | Type d'attaque (Phishing, Ransomware, DDoS, etc.) |
| Target Industry | string | Secteur ciblé (Banking, Finance, Fintech) |
| Financial Loss (in Million $) | float | Pertes financières en millions de dollars |
| Number of Affected Users | int | Nombre d'utilisateurs impactés |
| Attack Source | string | Origine (Nation-state, Hacker Group, Insider, Unknown) |
| Security Vulnerability Type | string | Type de vulnérabilité exploitée |
| Defense Mechanism Used | string | Mécanisme de défense déployé |
| Incident Resolution Time (in Hours) | int | Temps de résolution en heures |

### Qualité des données (confirmée par analyse exploratoire)

✅ **Aucune valeur manquante** (486 non-null pour toutes les colonnes)
✅ **Aucun doublon**
✅ **Aucune valeur aberrante** (années, pertes, temps tous valides)
✅ **Dataset propre et prêt à l'emploi**

### Transformations appliquées

**Dans `backend/services/preprocess.py`** :

1. **Chargement** :
```python
df = pd.read_csv('data/cyberattacks_clean.csv')
```

2. **Typage** :
```python
df['Year'] = df['Year'].astype(int)
df['Financial Loss (in Million $)'] = df['Financial Loss (in Million $)'].astype(float)
df['Number of Affected Users'] = df['Number of Affected Users'].astype(int)
```

3. **Validation** :
- Vérifier années dans [2015, 2025]
- Vérifier pertes > 0
- Vérifier temps de résolution > 0

4. **Aucun nettoyage supplémentaire nécessaire** (dataset déjà propre)

---

## 🧮 LOGIQUE MÉTIER

### Règles de calcul

#### KPIs Globaux

```python
# KPI 1: Total Attacks
total_attacks = len(df)

# KPI 2: Total Financial Loss
total_loss = df['Financial Loss (in Million $)'].sum()

# KPI 3: Total Affected Users
total_users = df['Number of Affected Users'].sum()

# KPI 4: Average Resolution Time
avg_resolution = df['Incident Resolution Time (in Hours)'].mean()
```

#### Top 5 Incidents

```python
top_incidents = df.nlargest(5, 'Financial Loss (in Million $)')[
    ['Country', 'Year', 'Attack Type', 'Financial Loss (in Million $)', 'Number of Affected Users']
]
```

#### Top 10 Pays

```python
country_impact = df.groupby('Country').agg({
    'Financial Loss (in Million $)': ['sum', 'mean', 'count']
}).round(2)

country_impact.columns = ['Total_Loss', 'Avg_Loss', 'Attack_Count']
country_impact = country_impact.sort_values('Total_Loss', ascending=False).head(10)
```

#### Carte Géographique

```python
map_data = df.groupby('Country').agg({
    'Financial Loss (in Million $)': 'sum',
    'Country': 'count',
    'Number of Affected Users': 'sum'
}).round(2)

map_data.columns = ['Total_Loss', 'Attack_Count', 'Total_Users']
```

#### Analyses Univariées

```python
# Évolution temporelle
attacks_by_year = df.groupby('Year').size()

# Distribution types
attack_types = df['Attack Type'].value_counts()

# Sources
sources = df['Attack Source'].value_counts()

# Vulnérabilités
vulnerabilities = df['Security Vulnerability Type'].value_counts()

# Pays
countries = df['Country'].value_counts()
```

#### Analyses Bivariées

```python
# Types par pays (Top 5 pays, Top 4 types)
top_countries = df['Country'].value_counts().head(5).index
top_attacks = df['Attack Type'].value_counts().head(4).index
filtered = df[df['Country'].isin(top_countries) & df['Attack Type'].isin(top_attacks)]
country_attack = filtered.groupby(['Country', 'Attack Type']).size()

# Pertes par type et année
losses_temporal = df.groupby(['Year', 'Attack Type'])['Financial Loss (in Million $)'].sum()

# Efficacité défenses
defense_efficiency = df.groupby('Defense Mechanism Used')['Incident Resolution Time (in Hours)'].mean()
```

---

### Formatage des données

#### Fonctions utilitaires (`lib/utils.ts`)

```typescript
// Formater les montants
export function formatCurrency(value: number): string {
  return `${value.toFixed(1)}M`;
}

// Formater les nombres avec séparateurs
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}

// Formater le temps
export function formatTime(hours: number): string {
  return `${hours.toFixed(1)}h`;
}

// Formater les pourcentages
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
```

---

## ⚡ CONTRAINTES TECHNIQUES

### Performance

**Objectifs** :
- Chargement initial backend : < 2 secondes
- Génération graphiques : < 500ms par endpoint
- Rendu frontend : < 300ms par graphique
- Navigation entre pages : < 200ms

**Optimisations backend** :
- Dataset chargé une seule fois au démarrage (global variable)
- Calculs mis en cache si nécessaire
- Pandas vectorisé (pas de boucles)

**Optimisations frontend** :
- Lazy loading des graphiques
- `useMemo` pour éviter recalculs
- `React.memo` pour composants graphiques
- Code splitting par page

### Limites

- Dataset max : 1000 lignes (au-delà, considérer pagination)
- Graphiques simultanés : Max 10
- Pas de persistence (données réinitialisées au redémarrage)
- Pas de temps réel (données statiques)

### Compatibilité

- **Navigateurs** : Chrome 90+, Firefox 88+, Safari 14+
- **Python** : 3.9+
- **Node.js** : 18+
- **Résolution minimale** : 1280x720px (desktop), responsive mobile

---

## 📅 PHASAGE D'IMPLÉMENTATION

### Phase 1 : Setup & Backend Core ⏱️ 2 jours

**Backend** :
1. ✅ Créer virtual environment et installer requirements.txt
2. ✅ Setup FastAPI + CORS
3. ✅ Charger et valider le dataset
4. ✅ Implémenter `analysis_engine.py` (calculs KPIs, agrégations)
5. ✅ Créer endpoints Dashboard (KPIs, Top 5, Top 10, Map)

**Frontend** :
1. ✅ Setup Next.js 15 + TypeScript + Tailwind
2. ✅ Installer ShadCN/UI + Plotly.js
3. ✅ Créer structure de routing (3 pages)
4. ✅ Implémenter Navbar
5. ✅ Setup design system (couleurs, fonts)

**Livrable** : Backend fonctionnel avec endpoints Dashboard + Frontend avec navigation

---

### Phase 2 : Dashboard Principal ⏱️ 2 jours

**Backend** :
1. ✅ Finaliser tous les endpoints Dashboard
2. ✅ Générer la carte Plotly (scatter_geo)
3. ✅ Tester tous les endpoints

**Frontend** :
1. ✅ Créer composants KPICard, DataTable, Chart
2. ✅ Implémenter page Dashboard
3. ✅ Afficher les 4 KPIs avec animation
4. ✅ Afficher les 2 tableaux
5. ✅ Afficher la carte géographique

**Livrable** : Dashboard principal complet et fonctionnel

---

### Phase 3 : Analyse Univariée ⏱️ 2 jours

**Backend** :
1. ✅ Créer `visualization_engine.py`
2. ✅ Implémenter les 5 endpoints d'analyse univariée
3. ✅ Générer les graphiques Plotly (Line, Pie, Bar)

**Frontend** :
1. ✅ Créer page Analyse Univariée
2. ✅ Intégrer les 5 graphiques
3. ✅ Ajouter SectionContainer pour chaque graphique
4. ✅ Optimiser le chargement (lazy loading)

**Livrable** : Page Analyse Univariée complète avec 5 visualisations

---

### Phase 4 : Analyse Bivariée ⏱️ 2 jours

**Backend** :
1. ✅ Implémenter les 3 endpoints d'analyse bivariée
2. ✅ Générer Grouped Bar, Multiple Lines, Bar avec code couleur

**Frontend** :
1. ✅ Créer page Analyse Bivariée
2. ✅ Intégrer les 3 graphiques
3. ✅ Ajouter explications/insights textuels

**Livrable** : Page Analyse Bivariée complète avec 3 visualisations

---

### Phase 5 : Polish & Tests ⏱️ 1-2 jours

**Frontend** :
1. ✅ Ajouter animations (fade-in, count-up)
2. ✅ Implémenter loading states
3. ✅ Responsive design final (mobile, tablet)
4. ✅ Optimiser performances

**Backend** :
1. ✅ Ajouter logging
2. ✅ Gestion des erreurs robuste
3. ✅ Documentation API (optionnel)

**QA** :
1. ✅ Tester tous les endpoints
2. ✅ Tester navigation
3. ✅ Tester responsive
4. ✅ Préparer la démo de présentation

**Livrable** : Application complète prête pour présentation

---

## 🎯 INDICATEURS DE SUCCÈS

### Critères Fonctionnels

✅ **Page 1 (Dashboard)** :
- 4 KPIs s'affichent correctement
- Top 5 incidents dans un tableau formaté
- Top 10 pays dans un tableau formaté
- Carte géographique interactive

✅ **Page 2 (Univariée)** :
- 5 graphiques s'affichent sans erreur
- Tous les graphiques sont interactifs (Plotly)
- Titres contextualisés (secteur financier)

✅ **Page 3 (Bivariée)** :
- 3 graphiques s'affichent sans erreur
- Relations entre variables clairement visibles
- Code couleur efficacité défenses fonctionne

✅ **Navigation** :
- Navbar persiste sur toutes les pages
- Liens fonctionnels
- Indicateur de page active

---

### Critères Techniques

✅ **Backend** :
- Tous les endpoints retournent des données valides
- Temps de réponse < 500ms
- Pas d'erreurs 500

✅ **Frontend** :
- Temps de chargement < 3 secondes
- Pas d'erreurs console
- Responsive sur desktop/tablet/mobile

✅ **Qualité du code** :
- Code structuré et modulaire
- Composants réutilisables
- Typage TypeScript correct

---

### Critères de Présentation

✅ **Storytelling** :
- Navigation fluide lors de la démo
- Ordre logique : Vue globale → Univarié → Bivarié
- Insights clairs et pertinents

✅ **Visuel** :
- Design cohérent dark mode
- Graphiques lisibles projetés
- Animations polies

✅ **Académique** :
- Dataset correctement analysé
- Visualisations scientifiquement valides
- Conclusions pertinentes sur cybersécurité financière

---

## 🚀 INSTRUCTIONS DE DÉMARRAGE

### Prérequis

- Python 3.9+
- Node.js 18+
- npm ou yarn

### Setup Backend

```bash
# 1. Aller dans le dossier backend
cd backend

# 2. Créer le virtual environment
python -m venv venv

# 3. Activer le virtual environment
# Sur Windows:
venv\Scripts\activate
# Sur macOS/Linux:
source venv/bin/activate

# 4. Installer les dépendances
pip install -r requirements.txt

# 5. Vérifier que le dataset est présent
# backend/data/cyberattacks_clean.csv

# 6. Lancer le serveur FastAPI
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Le backend sera accessible sur `http://localhost:8000`

Documentation API : `http://localhost:8000/docs`

---

### Setup Frontend

```bash
# 1. Aller dans le dossier frontend
cd frontend

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

---

### Workflow de développement

```bash
# Terminal 1 : Backend
cd backend
source venv/bin/activate  # ou venv\Scripts\activate sur Windows
uvicorn main:app --reload

# Terminal 2 : Frontend
cd frontend
npm run dev
```

---

## 📝 NOTES FINALES

### Points d'attention

- **Virtual Environment** : Toujours activer avant de lancer le backend
- **CORS** : FastAPI doit autoriser `http://localhost:3000`
- **Dataset** : Vérifier la présence de `cyberattacks_clean.csv`
- **Plotly** : Les graphiques doivent avoir `template='plotly_dark'`

### Recommandations

- Commencer par le Dashboard (Page 1) car il contient les KPIs de base
- Tester chaque endpoint avec Postman/Thunder Client avant intégration frontend
- Utiliser les hooks React pour éviter code dupliqué
- Prévoir des loading states pour meilleure UX

### Extensions futures (hors scope)

- Filtres interactifs (année, pays, type)
- Export des graphiques en PNG
- Page 4 : Analyses avancées (corrélations, prédictions)
- Authentification et gestion utilisateurs
- Déploiement cloud (Vercel + Railway)

---

## 🎉 CONCLUSION

Ce PRD définit **l'intégralité des spécifications** pour construire le **CyberAttack Analytics Dashboard** avec :

✅ 3 pages bien définies (Dashboard, Univarié, Bivarié)
✅ 4 KPIs + 2 tableaux + 9 graphiques interactifs
✅ Architecture technique complète (Frontend + Backend)
✅ 14 endpoints API documentés
✅ Design system cohérent (dark mode)
✅ Phasage d'implémentation en 5 phases
✅ Instructions de setup détaillées

**Le projet est prêt à être développé !** 🚀

---

**Version** : 2.0
**Date** : Octobre 2025
**Auteur** : Équipe CyberAttack Analytics
