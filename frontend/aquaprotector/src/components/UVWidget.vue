<template>
  <div class="uv-widget">
    <div class="uv-search">
      <input
        v-model="locationQuery"
        type="text"
        :placeholder="placeholder"
        class="uv-input"
        @keyup.enter="fetchUV"
      />
      <button class="uv-button" @click="fetchUV" :disabled="loading">
        {{ loading ? 'Loading...' : 'Get UV' }}
      </button>
    </div>

    <div v-if="error" class="uv-error">{{ error }}</div>

    <div v-if="uvData" class="uv-result">
      <div class="uv-level" :class="severity.class">
        <div class="uv-value">UV {{ uvData.uvi.toFixed(1) }}</div>
        <div class="uv-severity">{{ severity.label }}</div>
      </div>
      <div class="uv-meta">
        <div>📍 {{ uvData.locationName }}</div>
        <div>🕒 {{ formattedTime }}</div>
      </div>
      <div class="uv-advice">{{ severity.advice }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  apiKey: string
  defaultLocation?: string
  placeholder?: string
  autoFetch?: boolean
}

const props = defineProps<Props>()

const locationQuery = ref(props.defaultLocation ?? 'Dromana')
const placeholder = props.placeholder ?? 'Enter location e.g. Dromana, St Kilda'
const loading = ref(false)
const error = ref('')
const uvData = ref<null | {
  uvi: number
  timestamp: number
  locationName: string
}>(null)

const formattedTime = computed(() => {
  if (!uvData.value) return ''
  const d = new Date(uvData.value.timestamp * 1000)
  return d.toLocaleString()
})

const severity = computed(() => {
  const u = uvData.value?.uvi ?? 0
  if (u < 3) return { class: 'low', label: 'Low', advice: 'Minimal protection required.' }
  if (u < 6) return { class: 'moderate', label: 'Moderate', advice: 'Wear sunglasses and use SPF 30+ sunscreen.' }
  if (u < 8) return { class: 'high', label: 'High', advice: 'Reduce time in the sun between 10am-4pm.' }
  if (u < 11) return { class: 'very-high', label: 'Very High', advice: 'Seek shade and wear protective clothing.' }
  return { class: 'extreme', label: 'Extreme', advice: 'Avoid sun exposure. Full protection needed.' }
})

const fetchUV = async () => {
  if (!locationQuery.value.trim()) {
    error.value = 'Please enter a location'
    return
  }
  if (!props.apiKey) {
    error.value = 'Missing OpenWeather API key'
    return
  }
  error.value = ''
  loading.value = true
  uvData.value = null
  try {
    // 1) Geocode to lat/lon
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      locationQuery.value
    )}&limit=1&appid=${props.apiKey}`
    const geoRes = await fetch(geoUrl)
    if (!geoRes.ok) throw new Error('Geocoding failed')
    const geo = await geoRes.json()
    if (!Array.isArray(geo) || geo.length === 0) throw new Error('Location not found')
    const { lat, lon, name, country, state } = geo[0]

    // 2) Deprecated UV endpoint (as requested) with graceful fallback to One Call
    // Primary: /data/2.5/uvi?lat&lon&appid
    const uviUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${props.apiKey}`
    let uviRes = await fetch(uviUrl)
    let uvi: number
    let dt: number
    if (uviRes.ok) {
      const uviJson = await uviRes.json()
      uvi = typeof uviJson.value === 'number' ? uviJson.value : 0
      dt = typeof uviJson.date === 'number' ? uviJson.date : Math.floor(Date.now() / 1000)
    } else {
      // Fallback: One Call 3.0, then 2.5 if 401/403
      const oneCall3Url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${props.apiKey}`
      let oneRes = await fetch(oneCall3Url)
      let one: any
      if (!oneRes.ok && (oneRes.status === 401 || oneRes.status === 403)) {
        const oneCall25Url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${props.apiKey}`
        oneRes = await fetch(oneCall25Url)
        if (!oneRes.ok) throw new Error('UV fetch failed (fallback)')
        one = await oneRes.json()
      } else {
        if (!oneRes.ok) throw new Error('UV fetch failed')
        one = await oneRes.json()
      }
      uvi = one.current?.uvi ?? 0
      dt = one.current?.dt ?? Math.floor(Date.now() / 1000)
    }

    uvData.value = {
      uvi,
      timestamp: dt,
      locationName: [name, state, country].filter(Boolean).join(', ')
    }
  } catch (err: any) {
    error.value = err?.message ?? 'Failed to fetch UV data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (props.autoFetch) fetchUV()
})
</script>

<style scoped>
.uv-widget { width: 100%; }
.uv-search { display: flex; gap: 0.75rem; margin-bottom: 1rem; }
.uv-input {
  flex: 1; padding: 0.6rem 0.8rem; border: 2px solid #ffe0b2; border-radius: 8px; font-size: 0.95rem;
}
.uv-input:focus { outline: none; border-color: #f57c00; box-shadow: 0 0 0 3px rgba(245,124,0,0.1); }
.uv-button {
  padding: 0.6rem 1rem; border: none; border-radius: 8px; background: linear-gradient(45deg, #f57c00, #ffb74d);
  color: white; font-weight: 600; cursor: pointer; transition: transform 0.2s ease;
}
.uv-button:disabled { opacity: 0.7; cursor: not-allowed; }
.uv-button:hover:not(:disabled) { transform: translateY(-1px); }
.uv-error { color: #d32f2f; background: #ffebee; border: 1px solid #ffcdd2; padding: 0.5rem 0.75rem; border-radius: 6px; margin-bottom: 0.75rem; }
.uv-result { display: flex; flex-direction: column; gap: 0.75rem; }
.uv-level { display: flex; align-items: center; gap: 0.75rem; padding: 0.8rem 1rem; border-radius: 10px; color: #333; font-weight: 700; }
.uv-level.low { background: #e8f5e9; border: 2px solid #4caf50; }
.uv-level.moderate { background: #fff8e1; border: 2px solid #ffb300; }
.uv-level.high { background: #ffecb3; border: 2px solid #ff9800; }
.uv-level.very-high { background: #ffe0b2; border: 2px solid #f57c00; }
.uv-level.extreme { background: #ffebee; border: 2px solid #d32f2f; }
.uv-value { font-size: 1.2rem; }
.uv-severity { font-size: 1rem; font-weight: 600; }
.uv-meta { display: flex; gap: 1rem; color: #555; }
.uv-advice { color: #555; }
</style>


