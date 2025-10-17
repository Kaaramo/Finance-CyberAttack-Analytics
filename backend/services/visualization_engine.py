"""
Visualization Engine Service
Génération des graphiques avec Plotly Express
"""

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import json
from typing import Dict, Any

class VisualizationEngine:
    """
    Moteur de génération de visualisations avec Plotly
    """

    def __init__(self, df: pd.DataFrame):
        self.df = df
        self.template = "plotly_dark"

    def generate_map_visualization(self) -> Dict[str, Any]:
        """
        Génère la carte géographique mondiale

        Returns:
            dict: Configuration Plotly de la carte
        """
        # Agrégation des données par pays
        map_data = self.df.groupby('Country').agg({
            'Financial Loss (in Million $)': 'sum',
            'Number of Affected Users': 'sum'
        }).reset_index()

        # Calculer le nombre d'attaques
        attack_counts = self.df.groupby('Country').size().reset_index(name='Attack_Count')
        map_data = map_data.merge(attack_counts, on='Country')

        # Renommer pour plus de clarté
        map_data.columns = ['Country', 'Total_Loss', 'Total_Users', 'Attack_Count']

        # Créer la carte scatter_geo
        fig = px.scatter_geo(
            map_data,
            locations='Country',
            locationmode='country names',
            size='Attack_Count',
            color='Total_Loss',
            hover_name='Country',
            hover_data={
                'Attack_Count': True,
                'Total_Loss': ':.2f',
                'Total_Users': ':,',
                'Country': False
            },
            color_continuous_scale='Reds',
            size_max=50,
            title='Cartographie Mondiale des Cyberattaques - Secteur Bancaire (2015-2025)',
            template=self.template
        )

        # Personnaliser le layout
        fig.update_geos(
            projection_type='natural earth',
            showland=True,
            landcolor='#1a1927',
            oceancolor='#13121d',
            showocean=True,
            showcountries=True,
            countrycolor='#2d2c3d'
        )

        fig.update_layout(
            height=600,
            margin={"r": 0, "t": 50, "l": 0, "b": 0}
        )

        # Convertir en format JSON compatible
        return json.loads(fig.to_json())

    def generate_temporal_evolution(self) -> Dict[str, Any]:
        """
        Génère le graphique d'évolution temporelle

        Returns:
            dict: Configuration Plotly du graphique
        """
        # Compter les attaques par année
        attacks_by_year = self.df.groupby('Year').size().reset_index(name='Count')

        # Créer le line chart
        fig = px.line(
            attacks_by_year,
            x='Year',
            y='Count',
            markers=True,
            template=self.template
        )

        # Personnaliser le graphique
        fig.update_traces(
            line_color='#06b6d4',  # Cyan
            line_width=3,
            marker=dict(size=10, color='#06b6d4')
        )

        fig.update_layout(
            xaxis_title='Année',
            yaxis_title='Nombre d\'Attaques',
            hovermode='x unified',
            height=500,
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(color='#ffffff', family='monospace'),
            margin=dict(t=80, b=50, l=50, r=50)
        )

        return json.loads(fig.to_json())

    def generate_attack_types_pie(self) -> Dict[str, Any]:
        """
        Génère le graphique en camembert des types d'attaques

        Returns:
            dict: Configuration Plotly du graphique
        """
        # Compter les types d'attaques
        attack_type_dist = self.df['Attack Type'].value_counts().reset_index()
        attack_type_dist.columns = ['Attack Type', 'Count']

        # Créer le donut chart
        fig = px.pie(
            attack_type_dist,
            values='Count',
            names='Attack Type',
            hole=0.4,  # Donut chart
            template=self.template,
            color_discrete_sequence=px.colors.sequential.Reds_r
        )

        fig.update_traces(
            textposition='inside',
            textinfo='percent+label'
        )

        fig.update_layout(
            height=500,
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(color='#ffffff', family='monospace'),
            showlegend=True,
            legend=dict(orientation='v', yanchor='middle', y=0.5, xanchor='left', x=1.1),
            margin=dict(t=100, b=50, l=50, r=50)
        )

        return json.loads(fig.to_json())

    def generate_attack_sources_bar(self) -> Dict[str, Any]:
        """
        Génère le graphique des sources d'attaques

        Returns:
            dict: Configuration Plotly du graphique
        """
        # Compter les sources d'attaques
        source_dist = self.df['Attack Source'].value_counts().reset_index()
        source_dist.columns = ['Attack Source', 'Count']

        # Créer le bar chart
        fig = px.bar(
            source_dist,
            x='Attack Source',
            y='Count',
            template=self.template,
            color='Count',
            color_continuous_scale='Oranges'
        )

        fig.update_traces(
            text=source_dist['Count'],
            textposition='outside'
        )

        fig.update_layout(
            xaxis_title='Source d\'Attaque',
            yaxis_title='Nombre d\'Incidents',
            height=500,
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(color='#ffffff', family='monospace'),
            showlegend=False
        )

        return json.loads(fig.to_json())

    def generate_vulnerabilities_bar(self) -> Dict[str, Any]:
        """
        Génère le graphique des vulnérabilités

        Returns:
            dict: Configuration Plotly du graphique
        """
        # Compter les vulnérabilités
        vuln_dist = self.df['Security Vulnerability Type'].value_counts().reset_index()
        vuln_dist.columns = ['Vulnerability', 'Count']

        # Créer le horizontal bar chart
        fig = px.bar(
            vuln_dist,
            x='Count',
            y='Vulnerability',
            orientation='h',
            title='Failles de Sécurité Exploitées - Systèmes Bancaires',
            template=self.template,
            color='Count',
            color_continuous_scale='Reds'
        )

        fig.update_traces(
            text=vuln_dist['Count'],
            textposition='outside'
        )

        fig.update_layout(
            xaxis_title='Nombre d\'Incidents',
            yaxis_title='Type de Vulnérabilité',
            height=500,
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(color='#ffffff', family='monospace'),
            showlegend=False
        )

        return json.loads(fig.to_json())

    def generate_countries_bar(self) -> Dict[str, Any]:
        """
        Génère le graphique de répartition par pays

        Returns:
            dict: Configuration Plotly du graphique
        """
        # Compter les attaques par pays
        attacks_by_country = self.df['Country'].value_counts().reset_index()
        attacks_by_country.columns = ['Country', 'Count']

        # Créer le horizontal bar chart
        fig = px.bar(
            attacks_by_country,
            x='Count',
            y='Country',
            orientation='h',
            template=self.template,
            color='Count',
            color_continuous_scale='Reds'
        )

        fig.update_traces(
            text=attacks_by_country['Count'],
            textposition='outside'
        )

        fig.update_layout(
            xaxis_title='Nombre d\'Attaques',
            yaxis_title='Pays',
            height=600,  # Plus haut pour afficher tous les pays
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(color='#ffffff', family='monospace'),
            showlegend=False
        )

        return json.loads(fig.to_json())

    def generate_types_by_country(self) -> Dict[str, Any]:
        """
        Génère le graphique groupé des types par pays

        Returns:
            dict: Configuration Plotly du graphique
        """
        # Identifier les Top 5 pays et Top 4 types d'attaques
        top_countries = self.df['Country'].value_counts().head(5).index
        top_attacks = self.df['Attack Type'].value_counts().head(4).index

        # Filtrer le dataframe
        df_filtered = self.df[
            self.df['Country'].isin(top_countries) &
            self.df['Attack Type'].isin(top_attacks)
        ]

        # Compter les incidents par pays et type
        country_attack_counts = df_filtered.groupby(['Country', 'Attack Type']).size().reset_index(name='Count')

        # Créer le grouped bar chart
        fig = px.bar(
            country_attack_counts,
            x='Country',
            y='Count',
            color='Attack Type',
            barmode='group',
            title='Répartition des Types d\'Attaques par Pays (Top 5) - Secteur Financier',
            template=self.template
        )

        fig.update_layout(
            xaxis_title='Pays',
            yaxis_title='Nombre d\'Incidents',
            height=500,
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(color='#ffffff', family='monospace'),
            legend=dict(
                orientation='h',
                yanchor='bottom',
                y=1.02,
                xanchor='right',
                x=1
            )
        )

        return json.loads(fig.to_json())

    def generate_losses_temporal(self) -> Dict[str, Any]:
        """
        Génère le graphique d'évolution des pertes par type

        Returns:
            dict: Configuration Plotly du graphique
        """
        # Identifier les Top 4 types d'attaques
        top_attacks = self.df['Attack Type'].value_counts().head(4).index

        # Filtrer le dataframe
        df_top_attacks = self.df[self.df['Attack Type'].isin(top_attacks)]

        # Calculer les pertes par année et type
        losses_by_year_type = df_top_attacks.groupby(['Year', 'Attack Type'])['Financial Loss (in Million $)'].sum().reset_index()

        # Créer le multiple lines chart
        fig = px.line(
            losses_by_year_type,
            x='Year',
            y='Financial Loss (in Million $)',
            color='Attack Type',
            markers=True,
            title='Évolution des Pertes Financières par Type de Menace (2015-2025)',
            template=self.template
        )

        # Personnaliser les lignes
        fig.update_traces(
            line=dict(width=3),
            marker=dict(size=8)
        )

        fig.update_layout(
            xaxis_title='Année',
            yaxis_title='Pertes Financières (M$)',
            hovermode='x unified',
            height=500,
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(color='#ffffff', family='monospace'),
            legend=dict(
                orientation='h',
                yanchor='bottom',
                y=1.02,
                xanchor='right',
                x=1
            )
        )

        return json.loads(fig.to_json())

    def generate_defense_efficiency(self) -> Dict[str, Any]:
        """
        Génère le graphique d'efficacité des défenses

        Returns:
            dict: Configuration Plotly du graphique
        """
        # Calculer le temps moyen de résolution par mécanisme de défense
        defense_efficiency = self.df.groupby('Defense Mechanism Used')['Incident Resolution Time (in Hours)'].mean().sort_values().reset_index()
        defense_efficiency.columns = ['Defense Mechanism', 'Avg_Resolution_Time']

        # Calculer les seuils pour le code couleur
        max_time = defense_efficiency['Avg_Resolution_Time'].max()

        # Définir les couleurs selon l'efficacité (vert = rapide, rouge = lent)
        colors = []
        for time in defense_efficiency['Avg_Resolution_Time']:
            if time < max_time / 2:
                colors.append('rgb(39,174,96)')  # Vert (efficace)
            elif time < max_time * 0.75:
                colors.append('rgb(230,126,34)')  # Orange (moyen)
            else:
                colors.append('rgb(231,76,60)')  # Rouge (lent)

        # Créer le horizontal bar chart avec go.Figure pour contrôle total des couleurs
        fig = go.Figure()

        fig.add_trace(go.Bar(
            y=defense_efficiency['Defense Mechanism'],
            x=defense_efficiency['Avg_Resolution_Time'],
            orientation='h',
            marker=dict(color=colors),
            text=defense_efficiency['Avg_Resolution_Time'].round(1),
            textposition='outside',
            texttemplate='%{text}h'
        ))

        fig.update_layout(
            title='Temps Moyen de Résolution par Mécanisme de Défense - Secteur Bancaire',
            xaxis_title='Temps Moyen de Résolution (heures)',
            yaxis_title='Mécanisme de Défense',
            template=self.template,
            height=500,
            paper_bgcolor='rgba(0,0,0,0)',
            plot_bgcolor='rgba(0,0,0,0)',
            font=dict(color='#ffffff', family='monospace'),
            showlegend=False
        )

        return json.loads(fig.to_json())
