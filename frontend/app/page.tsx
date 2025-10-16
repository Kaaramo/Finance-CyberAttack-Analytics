"use client"

import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import KPICard from './components/KPICard'
import DataTable from './components/DataTable'
import Chart from './components/Chart'
import { getGlobalKPIs, getTopIncidents, getTopCountries, getMapVisualization } from './lib/api'
import { formatCurrency, formatNumber, formatTime } from './lib/utils'
import { Shield, DollarSign, Users, Clock } from 'lucide-react'

export default function DashboardPage() {
  const [kpis, setKpis] = useState<any>(null)
  const [topIncidents, setTopIncidents] = useState<any[]>([])
  const [topCountries, setTopCountries] = useState<any[]>([])
  const [mapData, setMapData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [kpisData, incidentsData, countriesData, mapChartData] = await Promise.all([
          getGlobalKPIs(),
          getTopIncidents(),
          getTopCountries(),
          getMapVisualization()
        ])

        setKpis(kpisData)
        setTopIncidents(incidentsData.top_incidents)
        setTopCountries(countriesData.top_countries)
        setMapData(mapChartData.chart)
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
            <div className="animate-pulse text-2xl text-muted-foreground">Chargement...</div>
          </div>
        </main>
      </div>
    )
  }

  const incidentsColumns = [
    { key: 'rank', label: 'Rang' },
    { key: 'country', label: 'Pays' },
    { key: 'year', label: 'Année' },
    { key: 'attack_type', label: "Type d'attaque" },
    { key: 'financial_loss', label: 'Pertes (M$)', format: (v: number) => formatCurrency(v) },
    { key: 'affected_users', label: 'Utilisateurs affectés', format: (v: number) => formatNumber(v) }
  ]

  const countriesColumns = [
    { key: 'rank', label: 'Rang' },
    { key: 'country', label: 'Pays' },
    { key: 'total_loss', label: 'Pertes totales (M$)', format: (v: number) => formatCurrency(v) },
    { key: 'attack_count', label: "Nombre d'incidents" },
    { key: 'avg_loss', label: 'Perte moyenne (M$)', format: (v: number) => formatCurrency(v) }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section avec KPIs */}
        <section className="mb-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent font-mono">
              TABLEAU DE BORD DE CYBER-MENACES
            </h1>
            <p className="text-muted-foreground">
              Analyse des cyberattaques dans le secteur financier (2015-2025)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="MENACES DÉTECTÉES"
              value={kpis?.total_attacks || 0}
              icon={<Shield className="w-6 h-6" />}
              color="red"
            />
            <KPICard
              title="IMPACT FINANCIER"
              value={kpis ? `$${(kpis.total_financial_loss / 1000).toFixed(2)}B` : '$0B'}
              icon={<DollarSign className="w-6 h-6" />}
              color="orange"
            />
            <KPICard
              title="UTILISATEURS COMPROMIS"
              value={kpis ? `${(kpis.total_affected_users / 1000000).toFixed(1)}M` : '0M'}
              icon={<Users className="w-6 h-6" />}
              color="cyan"
            />
            <KPICard
              title="TEMPS DE RÉPONSE MOY."
              value={kpis ? formatTime(kpis.avg_resolution_time) : '0h'}
              icon={<Clock className="w-6 h-6" />}
              color="green"
            />
          </div>
        </section>

        {/* Carte géographique EN HAUT */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold font-mono">CARTE MONDIALE DES MENACES</h2>
          </div>
          {mapData && <Chart data={mapData} />}
        </section>

        {/* Tableaux EN BAS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DataTable
            title="TOP 5 DES INCIDENTS CRITIQUES"
            columns={incidentsColumns}
            data={topIncidents}
          />
          <DataTable
            title="TOP 10 DES PAYS CIBLÉS"
            columns={countriesColumns}
            data={topCountries}
          />
        </div>
      </main>
    </div>
  )
}
