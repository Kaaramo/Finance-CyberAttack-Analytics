"use client"

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false })

interface ChartProps {
  data: any
  layout?: any
  config?: any
}

export default function Chart({ data, layout, config }: ChartProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (data) {
      setIsLoading(false)
    }
  }, [data])

  if (isLoading || !data) {
    return (
      <div className="relative flex h-[500px] items-center justify-center rounded-xl border-2 border-cyan-500/30 bg-gradient-to-br from-card to-background overflow-hidden shadow-2xl shadow-cyan-500/10">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>

        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="animate-spin h-12 w-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full"></div>
          <div className="text-cyan-400 font-mono text-sm animate-pulse">Chargement du graphique...</div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-500/30"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-500/30"></div>
      </div>
    )
  }

  const defaultConfig = {
    displayModeBar: false,  // Désactiver la barre d'outils (téléchargement, zoom, etc.)
    responsive: true,
    displaylogo: false,
    ...config
  }

  const defaultLayout = {
    autosize: true,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#ffffff', family: 'monospace' },
    ...layout
  }

  return (
    <div className="relative rounded-xl border-2 border-cyan-500/30 bg-gradient-to-br from-card to-background p-6 overflow-hidden shadow-2xl shadow-cyan-500/10 group">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      {/* Scanning effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1500 pointer-events-none"></div>

      <div className="relative z-10">
        <Plot
          data={data.data || data}
          layout={{ ...defaultLayout, ...(data.layout || {}) }}
          config={defaultConfig}
          className="w-full"
          useResizeHandler
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-500/30"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-500/30"></div>
    </div>
  )
}
