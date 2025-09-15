<template>
  <div class="weather-widget">
    <div class="weather-search">
      <input
        v-model="locationQuery"
        type="text"
        :placeholder="placeholder"
        class="weather-input"
        @keyup.enter="fetchWeather"
      />
      <button class="weather-button" @click="fetchWeather" :disabled="loadingWeather">
        {{ loadingWeather ? 'Loading...' : 'Get Weather' }}
      </button>
    </div>

    <div v-if="weatherError" class="weather-error">{{ weatherError }}</div>

    <div v-if="weatherData" class="weather-result">
      <div class="weather-main">
        <img
          v-if="weatherData.icon"
          :src="`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`"
          :alt="weatherData.description"
          class="weather-icon"
        />
        <div>
          <div class="weather-location">{{ weatherData.locationName }}</div>
          <div class="weather-temp">{{ Math.round(weatherData.temp) }}°C</div>
          <div class="weather-desc">{{ weatherData.description }}</div>
        </div>
      </div>
      <div class="weather-meta">
        <div>💨 Wind: {{ Math.round(weatherData.windSpeed) }} km/h</div>
        <div>💧 Humidity: {{ weatherData.humidity }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  apiKey: string
  defaultLocation?: string
  placeholder?: string
  autoFetch?: boolean
}

const props = defineProps<Props>()

const locationQuery = ref(props.defaultLocation ?? 'Dromana')
const placeholder = props.placeholder ?? 'Enter location e.g. Dromana, St Kilda'
const loadingWeather = ref(false)
const weatherError = ref('')
const weatherData = ref<null | {
  locationName: string
  temp: number
  description: string
  icon: string
  windSpeed: number
  humidity: number
}>(null)

const fetchWeather = async () => {
  if (!locationQuery.value.trim()) {
    weatherError.value = 'Please enter a location'
    return
  }
  if (!props.apiKey) {
    weatherError.value = 'Missing OpenWeather API key'
    return
  }
  weatherError.value = ''
  loadingWeather.value = true
  weatherData.value = null
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      locationQuery.value
    )}&appid=${props.apiKey}&units=metric`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Location not found or API error')
    const data = await res.json()
    weatherData.value = {
      locationName: `${data.name}, ${data.sys?.country ?? ''}`.trim(),
      temp: data.main?.temp,
      description: data.weather?.[0]?.description ?? 'N/A',
      icon: data.weather?.[0]?.icon ?? '',
      windSpeed: (data.wind?.speed ?? 0) * 3.6, // m/s -> km/h
      humidity: data.main?.humidity ?? 0
    }
  } catch (err: any) {
    weatherError.value = err?.message ?? 'Failed to fetch weather data'
  } finally {
    loadingWeather.value = false
  }
}

onMounted(() => {
  if (props.autoFetch) fetchWeather()
})
</script>

<style scoped>
.weather-widget {
  width: 100%;
}

.weather-search {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  width: 100%;
}

.weather-input {
  flex: 1;
  padding: 0.6rem 0.8rem;
  border: 2px solid #e3f2fd;
  border-radius: 8px;
  font-size: 0.95rem;
}

.weather-input:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25,118,210,0.1);
}

.weather-button {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, #1976d2, #42a5f5);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.weather-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.weather-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.weather-error {
  color: #d32f2f;
  background: #ffebee;
  border: 1px solid #ffcdd2;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.weather-result {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.weather-main {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.weather-icon {
  width: 64px;
  height: 64px;
}

.weather-location {
  font-weight: 700;
  color: #1976d2;
}

.weather-temp {
  font-size: 1.4rem;
  font-weight: 700;
}

.weather-desc {
  text-transform: capitalize;
  color: #555;
}

.weather-meta {
  display: flex;
  gap: 1rem;
  color: #555;
}
</style>


