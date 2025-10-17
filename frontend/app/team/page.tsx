'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import Navbar from '../components/Navbar'

interface TeamMember {
  name: string
  title: string
  role: string
  description: string
  photo: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Bachirou Konaté',
    title: 'Étudiant en Big Data & Intelligence Artificielle',
    role: 'Collecte des Données',
    description: 'Le chasseur d\'informations, le carburant de la machine',
    photo: 'https://i.imgur.com/Yz2QalM.png',
  },
  {
    name: 'Michel Sagesse Kolié',
    title: 'Étudiant en Big Data & Intelligence Artificielle',
    role: 'Analyse & Traitement',
    description: 'La vision d\'ensemble, le cerveau analytique',
    photo: 'https://i.imgur.com/YngA7Rt.jpeg',
  },
  {
    name: 'Karamo Sylla',
    title: 'Étudiant en Big Data & Intelligence Artificielle',
    role: 'Visualisation & Interface',
    description: 'L\'architecte visuel qui transforme les données brutes en récits captivants',
    photo: 'https://i.imgur.com/N0EjAdE.jpeg',
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#13121d] text-white">
      <Navbar />

      {/* Header Section */}
      <section className="relative overflow-hidden border-b border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#06b6d410_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-4 font-mono text-5xl font-black uppercase tracking-tight text-cyan-400">
              Notre Équipe
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-400">
              Les Etudiants derrière le CyberAttack Analytics Dashboard
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#242332] p-8 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                {/* Glow Effect */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-cyan-500/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                <div className="relative">
                  {/* Photo Profile */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-cyan-500/30 transition-all duration-300 group-hover:border-cyan-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="mb-2 text-center font-mono text-2xl font-bold text-white">
                    {member.name}
                  </h3>

                  {/* Title */}
                  <p className="mb-3 text-center text-xs text-gray-500 italic">
                    {member.title}
                  </p>

                  {/* Role */}
                  <p className="mb-2 text-center text-sm font-semibold uppercase tracking-wider text-cyan-400">
                    {member.role}
                  </p>

                  {/* Description */}
                  <p className="text-center text-sm text-gray-400 italic">
                    {member.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <section className="border-t border-cyan-500/20 bg-[#242332] py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="mb-4 font-mono text-lg font-semibold uppercase tracking-wide text-cyan-400">
              CyberAttack Analytics Team
            </p>
            <p className="text-gray-400">
              Projet académique - Sécurité Informatique
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Octobre 2025
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
