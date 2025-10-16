"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface KPICardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  color?: string
}

const colorClasses: Record<string, { border: string; glow: string; text: string; bg: string }> = {
  red: {
    border: 'border-red-500/50',
    glow: 'shadow-red-500/20',
    text: 'text-red-400',
    bg: 'bg-red-500/10'
  },
  orange: {
    border: 'border-orange-500/50',
    glow: 'shadow-orange-500/20',
    text: 'text-orange-400',
    bg: 'bg-orange-500/10'
  },
  cyan: {
    border: 'border-cyan-500/50',
    glow: 'shadow-cyan-500/20',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10'
  },
  green: {
    border: 'border-green-500/50',
    glow: 'shadow-green-500/20',
    text: 'text-green-400',
    bg: 'bg-green-500/10'
  }
}

export default function KPICard({ title, value, icon, color = "cyan" }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value

  useEffect(() => {
    if (typeof numericValue === 'number' && !isNaN(numericValue)) {
      const duration = 2000
      const steps = 60
      const increment = numericValue / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setDisplayValue(numericValue)
          clearInterval(timer)
        } else {
          setDisplayValue(current)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [numericValue])

  const formattedDisplayValue = typeof value === 'string'
    ? value.replace(/[0-9.,]+/, displayValue.toLocaleString('en-US', { maximumFractionDigits: 2 }))
    : displayValue.toLocaleString('en-US', { maximumFractionDigits: 0 })

  const colors = colorClasses[color] || colorClasses.cyan

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-xl border-2 ${colors.border} bg-gradient-to-br from-card to-background p-6 shadow-2xl ${colors.glow} transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:${colors.glow} overflow-hidden group`}
    >
      {/* Effet de scan cybersécurité */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000"></div>

      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className={`text-xs font-bold tracking-wider ${colors.text} uppercase mb-2 font-mono`}>
              {title}
            </p>
          </div>
          {icon && (
            <div className={`${colors.text} animate-pulse`}>
              {icon}
            </div>
          )}
        </div>

        <div className="mt-2">
          <h3 className={`text-4xl font-black tracking-tight ${colors.text} font-mono`}>
            {typeof value === 'string' ? formattedDisplayValue : displayValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </h3>
        </div>

        {/* Barre de statut */}
        <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={`h-full ${colors.bg} ${colors.glow}`}
          />
        </div>
      </div>

      {/* Corner decorations */}
      <div className={`absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 ${colors.border} opacity-30`}></div>
      <div className={`absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 ${colors.border} opacity-30`}></div>
    </motion.div>
  )
}
