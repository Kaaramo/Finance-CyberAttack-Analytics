/**
 * API Client
 * Fonctions pour communiquer avec le backend FastAPI
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Cache simple en mémoire avec TTL de 5 minutes
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Fonction générique pour les appels API avec cache
 */
async function fetchAPI<T>(endpoint: string, useCache: boolean = true): Promise<T> {
  // Vérifier le cache
  if (useCache) {
    const cached = cache.get(endpoint)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data as T
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      // Next.js cache automatique
      next: { revalidate: 300 } // 5 minutes
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    const data = await response.json()

    // Mettre en cache
    if (useCache) {
      cache.set(endpoint, { data, timestamp: Date.now() })
    }

    return data
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    throw error
  }
}

// Dashboard endpoints
export const getGlobalKPIs = () => fetchAPI('/dashboard/kpis')
export const getTopIncidents = () => fetchAPI('/dashboard/top-incidents')
export const getTopCountries = () => fetchAPI('/dashboard/top-countries')
export const getMapVisualization = () => fetchAPI('/dashboard/map')

// Univariate analysis endpoints
export const getTemporalEvolution = () => fetchAPI('/univariate/temporal-evolution')
export const getAttackTypesDistribution = () => fetchAPI('/univariate/attack-types-distribution')
export const getAttackSources = () => fetchAPI('/univariate/attack-sources')
export const getVulnerabilities = () => fetchAPI('/univariate/vulnerabilities')
export const getCountriesDistribution = () => fetchAPI('/univariate/countries-distribution')

// Bivariate analysis endpoints
export const getTypesByCountry = () => fetchAPI('/bivariate/types-by-country')
export const getLossesByTypeTemporal = () => fetchAPI('/bivariate/losses-by-type-temporal')
export const getDefenseEfficiency = () => fetchAPI('/bivariate/defense-efficiency')

// Dataset info
export const getDatasetInfo = () => fetchAPI('/dataset/info')
