"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../lib/utils'
import { Shield, BarChart3, TrendingUp, Lock, Users } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: '/', label: 'Tableau de Bord', Icon: Shield },
    { href: '/univariate', label: 'Analyse Univariée', Icon: BarChart3 },
    { href: '/bivariate', label: 'Analyse Bivariée', Icon: TrendingUp },
    { href: '/team', label: 'Équipe', Icon: Users },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-cyan-500/30 bg-gradient-to-r from-background via-cyan-950/20 to-background backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
      <div className="container mx-auto flex h-16 items-center px-4 relative">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>

        <div className="relative mr-8 flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse bg-cyan-500/20 blur-xl rounded-full"></div>
            <Lock className="relative w-8 h-8 text-cyan-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black font-mono tracking-wider bg-gradient-to-r from-red-500 via-orange-500 to-cyan-400 bg-clip-text text-transparent">
              CYBERATTAQUES
            </span>
            <span className="text-[0.6rem] font-mono tracking-widest text-cyan-500/70 uppercase -mt-1">
              Tableau de Bord Analytique
            </span>
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-1">
            {links.map((link) => {
              const Icon = link.Icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-bold font-mono uppercase tracking-wider transition-all duration-300 rounded-lg group overflow-hidden",
                    pathname === link.href
                      ? "text-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/30"
                      : "text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/10"
                  )}
                >
                  {/* Animated border on hover */}
                  {pathname !== link.href && (
                    <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/30 rounded-lg transition-all duration-300"></div>
                  )}

                  {/* Active indicator */}
                  {pathname === link.href && (
                    <>
                      <div className="absolute inset-0 border-2 border-cyan-500/50 rounded-lg"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                    </>
                  )}

                  <span className="relative flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-16 border-t-2 border-r-2 border-cyan-500/20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-16 border-b-2 border-l-2 border-cyan-500/20 pointer-events-none"></div>
      </div>
    </nav>
  )
}
