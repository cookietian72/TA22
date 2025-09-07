<template>
  <div class="predictive-model">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <img src="/logo.png" alt="AquaProtect Logo" class="logo" />
          <h2>AquaProtect</h2>
        </div>
        <div class="nav-menu" :class="{ active: mobileMenuOpen }">
          <router-link to="/" class="nav-link" @click="closeMobileMenu">Home</router-link>
          <router-link to="/predictive-model" class="nav-link active" @click="closeMobileMenu">Predictive Model</router-link>
          <router-link to="/education" class="nav-link" @click="closeMobileMenu">Education</router-link>
        </div>
        <div class="nav-toggle" @click="toggleMobileMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header Section -->
      <div class="header-section">
        <h1>Predictive Model Dashboard</h1>
        <p>Real-time water quality predictions for Dromana Beach</p>
      </div>

      <!-- Color Legend -->
      <div class="legend-section">
        <h2>📊 Status Legend</h2>
        <div class="legend-cards">
          <div class="legend-card safe">
            <div class="legend-color"></div>
            <div class="legend-text">
              <h3>Green = Safe</h3>
              <p>Safe for swimming</p>
            </div>
          </div>
          <div class="legend-card moderate">
            <div class="legend-color"></div>
            <div class="legend-text">
              <h3>Yellow = Moderate</h3>
              <p>Exercise caution</p>
            </div>
          </div>
          <div class="legend-card danger">
            <div class="legend-color"></div>
            <div class="legend-text">
              <h3>Red = Danger</h3>
              <p>Avoid swimming</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Today's Status Card -->
      <div class="today-status-card">
        <div class="status-header">
          <h2>Today's Water Quality</h2>
          <div class="date-selector">
            <label for="date-select">Select Date:</label>
            <input type="date" id="date-select" v-model="selectedDate" class="date-input" />
          </div>
        </div>
        <div class="status-content">
          <div class="main-status safe">
            <div class="status-icon">✅</div>
            <div class="status-text">
              <h3>Safe to Swim</h3>
              <p>Confidence: 85%</p>
            </div>
          </div>
          <div class="status-details">
            <span class="detail-badge">Low E. Coli</span>
            <span class="detail-badge">Clear Water</span>
            <span class="detail-badge">Good Conditions</span>
          </div>
        </div>
      </div>

      <!-- Prediction Results -->
      <div class="predictions-section">
        <h2>🔮 Water Quality Predictions</h2>
        <div class="prediction-cards">
          <div class="prediction-card">
            <h3>Today</h3>
            <div class="prediction-status safe">Safe to Swim</div>
            <p class="prediction-confidence">Confidence: 85%</p>
            <div class="prediction-details">
              <span class="detail-item">Low E. Coli</span>
              <span class="detail-item">Clear Water</span>
            </div>
          </div>
          
          <div class="prediction-card">
            <h3>Tomorrow</h3>
            <div class="prediction-status warning">Caution Advised</div>
            <p class="prediction-confidence">Confidence: 72%</p>
            <div class="prediction-details">
              <span class="detail-item">Moderate Risk</span>
              <span class="detail-item">Recent Rain</span>
            </div>
          </div>
          
          <div class="prediction-card">
            <h3>Next 3 Days</h3>
            <div class="prediction-status safe">Safe to Swim</div>
            <p class="prediction-confidence">Confidence: 78%</p>
            <div class="prediction-details">
              <span class="detail-item">Clear Conditions</span>
              <span class="detail-item">Low Risk</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-section">
        <button class="action-button primary">Refresh Data</button>
        <button class="action-button secondary">View Detailed Report</button>
        <button class="action-button secondary">Set Alerts</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
const selectedDate = ref(new Date().toISOString().split('T')[0]) // Today's date as default

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.predictive-model {
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(180deg, #f8f9ff 0%, #e3f2fd 100%);
}

/* Navigation Bar - Same as HomeView */
.navbar {
  background: linear-gradient(135deg, #1976d2, #42a5f5);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(25, 118, 210, 0.3);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
  transition: transform 0.3s ease;
  border-radius: 8px;
}

.logo:hover {
  transform: scale(1.05);
  filter: drop-shadow(2px 2px 6px rgba(0,0,0,0.4)) brightness(1.1);
}

.nav-logo h2 {
  color: white;
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.nav-link:hover,
.nav-link.active {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.bar {
  width: 25px;
  height: 3px;
  background: white;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

/* Main Content */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.header-section h1 {
  font-size: 2.5rem;
  color: #1976d2;
  margin-bottom: 1rem;
}

.header-section p {
  font-size: 1.2rem;
  color: #666;
}

/* Today's Status Card */
.today-status-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.15);
  border: 3px solid #e3f2fd;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.status-header h2 {
  color: #1976d2;
  margin: 0;
  font-size: 1.8rem;
}

.date-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date-selector label {
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
}

.date-input {
  padding: 0.5rem 1rem;
  border: 2px solid #e3f2fd;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #1976d2;
  background: #f8f9ff;
  transition: all 0.3s ease;
}

.date-input:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.status-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.main-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-radius: 15px;
  flex: 1;
  min-width: 300px;
}

.main-status.safe {
  background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
  border: 2px solid #4caf50;
}

.main-status.warning {
  background: linear-gradient(135deg, #fff3e0, #ffe0b2);
  border: 2px solid #ff9800;
}

.main-status.danger {
  background: linear-gradient(135deg, #ffebee, #ffcdd2);
  border: 2px solid #f44336;
}

.status-icon {
  font-size: 3rem;
}

.status-text h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #333;
}

.status-text p {
  margin: 0;
  color: #666;
  font-size: 1rem;
}

.status-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.detail-badge {
  background: #1976d2;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Legend Section */
.legend-section {
  margin-bottom: 2rem;
}

.legend-section h2 {
  color: #1976d2;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
}

.legend-cards {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
}

.legend-card {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.1);
  border: 2px solid #e3f2fd;
  transition: transform 0.3s ease;
  flex: 1;
  min-width: 200px;
  max-width: 250px;
}

.legend-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.15);
}

.legend-card.safe {
  border-color: #4caf50;
}

.legend-card.moderate {
  border-color: #ff9800;
}

.legend-card.danger {
  border-color: #f44336;
}

.legend-color {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-card.safe .legend-color {
  background: linear-gradient(135deg, #4caf50, #8bc34a);
}

.legend-card.moderate .legend-color {
  background: linear-gradient(135deg, #ff9800, #ffc107);
}

.legend-card.danger .legend-color {
  background: linear-gradient(135deg, #f44336, #ff5722);
}

.legend-text h3 {
  margin: 0 0 0.2rem 0;
  font-size: 1rem;
  color: #333;
  font-weight: 600;
}

.legend-text p {
  margin: 0;
  color: #666;
  font-size: 0.85rem;
  line-height: 1.3;
}

/* Predictions Section */
.predictions-section {
  margin-bottom: 3rem;
}

.predictions-section h2 {
  color: #1976d2;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-align: center;
}

.prediction-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.prediction-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.1);
  border: 2px solid #e3f2fd;
  text-align: center;
  transition: transform 0.3s ease;
}

.prediction-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.2);
}

.prediction-card h3 {
  color: #1976d2;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.prediction-status {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  margin-bottom: 1rem;
  display: inline-block;
}

.prediction-status.safe {
  background: #e8f5e8;
  color: #2e7d32;
}

.prediction-status.warning {
  background: #fff3e0;
  color: #f57c00;
}

.prediction-status.danger {
  background: #ffebee;
  color: #d32f2f;
}

.prediction-confidence {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.prediction-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.detail-item {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Action Section */
.action-section {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-button {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.action-button.primary {
  background: linear-gradient(45deg, #1976d2, #42a5f5);
  color: white;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
}

.action-button.primary:hover {
  background: linear-gradient(45deg, #42a5f5, #1976d2);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
}

.action-button.secondary {
  background: white;
  color: #1976d2;
  border: 2px solid #1976d2;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.1);
}

.action-button.secondary:hover {
  background: #1976d2;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.2);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background: linear-gradient(135deg, #1976d2, #42a5f5);
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0,0,0,0.05);
    padding: 2rem 0;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-toggle {
    display: flex;
  }

  .nav-link {
    margin: 1rem 0;
    font-size: 1.2rem;
  }

  .nav-logo {
    gap: 8px;
  }

  .logo {
    width: 32px;
    height: 32px;
    border-radius: 6px;
  }

  .nav-logo h2 {
    font-size: 1.5rem;
  }

  .legend-cards {
    flex-direction: column;
    align-items: center;
  }

  .legend-card {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .legend-color {
    width: 20px;
    height: 20px;
  }

  .prediction-cards {
    grid-template-columns: 1fr;
  }

  .action-section {
    flex-direction: column;
    align-items: center;
  }

  .action-button {
    width: 200px;
  }

  .status-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .status-content {
    flex-direction: column;
    align-items: stretch;
  }

  .main-status {
    min-width: auto;
    justify-content: center;
  }

  .status-details {
    justify-content: center;
  }

  .today-status-card {
    padding: 1.5rem;
  }

  .status-header h2 {
    font-size: 1.5rem;
  }

  .status-icon {
    font-size: 2.5rem;
  }

  .status-text h3 {
    font-size: 1.3rem;
  }
}
</style>
