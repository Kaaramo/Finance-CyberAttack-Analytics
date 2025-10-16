"use client"

import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Chart from '../components/Chart'
import {
  getTypesByCountry,
  getLossesByTypeTemporal,
  getDefenseEfficiency
} from '../lib/api'

export default function BivariatePage() {
  const [typesByCountryData, setTypesByCountryData] = useState<any>(null)
  const [lossesTemporalData, setLossesTemporalData] = useState<any>(null)
  const [defenseEfficiencyData, setDefenseEfficiencyData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [typesByCountry, lossesTemporal, defenseEfficiency] = await Promise.all([
          getTypesByCountry(),
          getLossesByTypeTemporal(),
          getDefenseEfficiency()
        ])

        setTypesByCountryData(typesByCountry.chart)
        setLossesTemporalData(lossesTemporal.chart)
        setDefenseEfficiencyData(defenseEfficiency.chart)
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex h-[60vh] items-center justify-center">
            <div className="animate-spin h-16 w-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-600 bg-clip-text text-transparent font-mono">
            ANALYSE BIVARIÉE
          </h1>
          <p className="text-muted-foreground text-lg">
            Relations et corrélations entre variables - Analyses croisées multidimensionnelles
          </p>
        </section>

        {/* Graphique 1 : Évolution des pertes par type (Pleine largeur EN HAUT) */}
        <section className="mb-12">
          <div className="mb-4">
            <h2 className="text-2xl font-bold font-mono text-cyan-400">
              1. ÉVOLUTION DES PERTES PAR TYPE
            </h2>
            <p className="text-muted-foreground mt-2">
              Impact financier temporel par catégorie de menace
            </p>
          </div>
          {lossesTemporalData && <Chart data={lossesTemporalData} />}
        </section>

        {/* Graphiques 2 et 3 côte à côte EN BAS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Graphique 2 : Répartition des types par pays */}
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold font-mono text-cyan-400">
                2. RÉPARTITION PAR PAYS
              </h2>
              <p className="text-muted-foreground mt-2">
                Profils de menaces selon les zones géographiques
              </p>
            </div>
            {typesByCountryData && <Chart data={typesByCountryData} />}
          </section>

          {/* Graphique 3 : Efficacité des défenses */}
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold font-mono text-cyan-400">
                3. EFFICACITÉ DES DÉFENSES
              </h2>
              <p className="text-muted-foreground mt-2">
                Temps de résolution moyen par mécanisme
              </p>
            </div>
            {defenseEfficiencyData && <Chart data={defenseEfficiencyData} />}
          </section>
        </div>
      </main>
    </div>
  )
}
