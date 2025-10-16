"""
Preprocess Service
Gestion du chargement et de la validation du dataset
"""

import pandas as pd
from pathlib import Path

class DataLoader:
    """
    Classe pour charger et prétraiter le dataset de cyberattaques
    """

    def __init__(self, csv_path: str = "data/dataset_final.csv"):
        self.csv_path = csv_path
        self.df = None

    def load_dataset(self) -> pd.DataFrame:
        """
        Charge le dataset CSV

        Returns:
            pd.DataFrame: Dataset chargé
        """
        try:
            self.df = pd.read_csv(self.csv_path)
            print(f"Dataset chargé: {len(self.df)} incidents")
            return self.df
        except FileNotFoundError:
            raise FileNotFoundError(f"Le fichier {self.csv_path} n'existe pas")

    def validate_dataset(self) -> bool:
        """
        Valide la structure du dataset

        Returns:
            bool: True si valide
        """
        required_columns = [
            'Country', 'Year', 'Attack Type', 'Target Industry',
            'Financial Loss (in Million $)', 'Number of Affected Users',
            'Attack Source', 'Security Vulnerability Type',
            'Defense Mechanism Used', 'Incident Resolution Time (in Hours)'
        ]

        if self.df is None:
            return False

        return all(col in self.df.columns for col in required_columns)

    def get_dataset_info(self) -> dict:
        """
        Retourne les informations sur le dataset

        Returns:
            dict: Informations du dataset
        """
        if self.df is None:
            return {}

        return {
            "total_records": len(self.df),
            "columns": list(self.df.columns),
            "date_range": {
                "min": int(self.df['Year'].min()),
                "max": int(self.df['Year'].max())
            },
            "countries": sorted(self.df['Country'].unique().tolist()),
            "attack_types": sorted(self.df['Attack Type'].unique().tolist())
        }

# Instance globale du chargeur de données
data_loader = DataLoader()
