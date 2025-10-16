"use client"

import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Chart from '../components/Chart'
import {
  getTemporalEvolution,
  getAttackTypesDistribution,
  getAttackSources,
  getCountriesDistribution
} from '../lib/api'

export default function UnivariatePage() {
  const [temporalData, setTemporalData] = useState<any>(null)
  const [typesData, setTypesData] = useState<any>(null)
  const [sourcesData, setSourcesData] = useState<any>(null)
  const [countriesData, setCountriesData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [temporal, types, sources, countries] = await Promise.all([
          getTemporalEvolution(),
          getAttackTypesDistribution(),
          getAttackSources(),
          getCountriesDistribution()
        ])

        setTemporalData(temporal.chart)
        setTypesData(types.chart)
        setSourcesData(sources.chart)
        setCountriesData(countries.chart)
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
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent font-mono">
            ANALYSE UNIVARIÉE
          </h1>
          <p className="text-muted-foreground text-lg">
            Distribution et analyse statistique de chaque variable individuellement
          </p>
        </section>

        {/* Ligne 1 : Évolution Temporelle + Types d'Attaques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Graphique 1 : Évolution Temporelle */}
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold font-mono text-cyan-400">
                1. ÉVOLUTION TEMPORELLE
              </h2>
              <p className="text-muted-foreground mt-2">
                Tendance des cyberattaques (2015-2025)
              </p>
            </div>
            {temporalData && <Chart data={temporalData} />}
          </section>

          {/* Graphique 2 : Types d'Attaques */}
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold font-mono text-cyan-400">
                2. TYPES D'ATTAQUES
              </h2>
              <p className="text-muted-foreground mt-2">
                Répartition des menaces ciblant les institutions financières
              </p>
            </div>
            {typesData && <Chart data={typesData} />}
          </section>
        </div>

        {/* Ligne 2 : Sources d'Attaques + Distribution par Pays */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Graphique 3 : Sources d'Attaques */}
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold font-mono text-cyan-400">
                3. ORIGINES DES MENACES
              </h2>
              <p className="text-muted-foreground mt-2">
                Identification des acteurs malveillants
              </p>
            </div>
            {sourcesData && <Chart data={sourcesData} />}
          </section>

          {/* Graphique 4 : Pays */}
          <section>
            <div className="mb-4">
              <h2 className="text-2xl font-bold font-mono text-cyan-400">
                4. DISTRIBUTION GÉOGRAPHIQUE
              </h2>
              <p className="text-muted-foreground mt-2">
                Classement des pays les plus ciblés
              </p>
            </div>
            {countriesData && <Chart data={countriesData} />}
          </section>
        </div>
      </main>
    </div>
  )
}
