"""
Analysis Engine Service
Calculs statistiques et analyses de données
"""

import pandas as pd
from typing import Dict, List, Any

class AnalysisEngine:
    """
    Moteur d'analyse pour les calculs statistiques
    """

    def __init__(self, df: pd.DataFrame):
        self.df = df

    def calculate_global_kpis(self) -> Dict[str, float]:
        """
        Calcule les 4 KPIs globaux du dashboard

        Returns:
            dict: KPIs (total_attacks, total_financial_loss, total_affected_users, avg_resolution_time)
        """
        return {
            "total_attacks": int(len(self.df)),
            "total_financial_loss": round(float(self.df['Financial Loss (in Million $)'].sum()), 2),
            "total_affected_users": int(self.df['Number of Affected Users'].sum()),
            "avg_resolution_time": round(float(self.df['Incident Resolution Time (in Hours)'].mean()), 2)
        }

    def get_top_incidents(self, n: int = 5) -> List[Dict[str, Any]]:
        """
        Retourne les N incidents les plus coûteux

        Args:
            n: Nombre d'incidents à retourner

        Returns:
            list: Top N incidents
        """
        top_incidents = self.df.nlargest(n, 'Financial Loss (in Million $)')[
            ['Country', 'Year', 'Attack Type', 'Financial Loss (in Million $)', 'Number of Affected Users']
        ]

        result = []
        for idx, (_, row) in enumerate(top_incidents.iterrows(), 1):
            result.append({
                "rank": idx,
                "country": row['Country'],
                "year": int(row['Year']),
                "attack_type": row['Attack Type'],
                "financial_loss": round(float(row['Financial Loss (in Million $)']), 2),
                "affected_users": int(row['Number of Affected Users'])
            })

        return result

    def get_top_countries(self, n: int = 10) -> List[Dict[str, Any]]:
        """
        Retourne les N pays avec le plus de pertes cumulées

        Args:
            n: Nombre de pays à retourner

        Returns:
            list: Top N pays
        """
        country_impact = self.df.groupby('Country').agg({
            'Financial Loss (in Million $)': ['sum', 'mean', 'count']
        }).round(2)

        country_impact.columns = ['Total_Loss', 'Avg_Loss', 'Attack_Count']
        country_impact = country_impact.sort_values('Total_Loss', ascending=False).head(n)

        result = []
        for idx, (country, row) in enumerate(country_impact.iterrows(), 1):
            result.append({
                "rank": idx,
                "country": country,
                "total_loss": round(float(row['Total_Loss']), 2),
                "attack_count": int(row['Attack_Count']),
                "avg_loss": round(float(row['Avg_Loss']), 2)
            })

        return result
