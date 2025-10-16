/**
 * API Client
 * Fonctions pour communiquer avec le backend FastAPI
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

/**
 * Fonction générique pour les appels API
 */
async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return await response.json()
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
