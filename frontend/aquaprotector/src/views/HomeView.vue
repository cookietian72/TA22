<template>
  <div class="home">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <img src="/logo.png" alt="AquaProtect Logo" class="logo" />
          <h2>AquaProtect</h2>
        </div>
        <div class="nav-menu" :class="{ active: mobileMenuOpen }">
          <router-link to="/" class="nav-link active" @click="closeMobileMenu">Home</router-link>
          <router-link to="/predictive-model" class="nav-link" @click="closeMobileMenu">Predictive Model</router-link>
          <router-link to="/education" class="nav-link" @click="closeMobileMenu">Education</router-link>
        </div>
        <div class="nav-toggle" @click="toggleMobileMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">AquaProtect</h1>
        <p class="hero-subtitle">Keep Your Family Safe at Dromana Beach</p>
        <p class="hero-description">
          Get real-time water quality updates and make informed decisions about beach safety after rainfall
        </p>
        <router-link to="/predictive-model" class="cta-button">Check Water Quality Now</router-link>
      </div>
    </section>

    <!-- Data Dashboard Section -->
    <section class="dashboard-section">
      <div class="container">
        <h2>Beach Conditions Dashboard</h2>
        <div class="dashboard-grid">
          <div class="dashboard-card prediction-card">
            <div class="card-header">
              <h3>🔮 Prediction Model Results</h3>
            </div>
            <div class="card-content">
              <div class="placeholder-content">
                <p>Water quality predictions will appear here</p>
                <div class="placeholder-box"></div>
              </div>
            </div>
          </div>
          
          <div class="dashboard-card weather-card">
            <div class="card-header">
              <h3>🌤️ Weather Conditions</h3>
            </div>
            <div class="card-content">
              <div class="placeholder-content">
                <p>Current weather data will be displayed here</p>
                <div class="placeholder-box"></div>
              </div>
            </div>
          </div>
          
          <div class="dashboard-card uv-card">
            <div class="card-header">
              <h3>☀️ UV Index</h3>
            </div>
            <div class="card-content">
              <div class="placeholder-content">
                <p>UV index and sun safety information</p>
                <div class="placeholder-box"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Target Audience Section -->
    <section class="target-section">
      <div class="container">
        <h2>Who We Help</h2>
        <div class="target-content">
          <div class="target-item">
            <h3>👨‍👩‍👧‍👦 Parents & Families</h3>
            <p>Parents aged 30-50 who prioritize their children's safety and want to make informed beach visit decisions</p>
          </div>
          <div class="target-item">
            <h3>🏖️ Beach Visitors</h3>
            <p>Tourists from Victoria suburbs planning trips to Dromana Beach, especially after rainfall events</p>
          </div>
          <div class="target-item">
            <h3>🌊 Water Safety Advocates</h3>
            <p>Health-conscious families who value water quality information and child-focused beach safety education</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Provide Section -->
    <section class="features-section">
      <div class="container">
        <h2>What We Provide</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h3>Real-Time Water Quality</h3>
            <p>Get instant updates on Dromana Beach water quality conditions, especially after rainfall</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Mobile-Friendly Interface</h3>
            <p>Easy-to-use mobile app that works perfectly on your smartphone for quick on-the-go checks</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⏰</div>
            <h3>Advance Planning</h3>
            <p>Plan your beach visits with confidence using our predictive water quality forecasts</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🛡️</div>
            <h3>Safety Alerts</h3>
            <p>Receive immediate notifications when water conditions may pose risks to your family</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📚</div>
            <h3>Educational Resources</h3>
            <p>Learn about beach safety, water quality indicators, and how to protect your children</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🌧️</div>
            <h3>Rainfall Impact Analysis</h3>
            <p>Understand how recent rainfall affects water quality and when it's safe to return to the beach</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2025 AquaProtect - TA22 Team</p>
        <p>Keeping families safe at Dromana Beach</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Navigation Bar */
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

.nav-link:hover {
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

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 30%, #00b4db 70%, #0083b0 100%);
  color: white;
  padding: 80px 20px;
  text-align: center;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="wave" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse"><path d="M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23wave)"/></svg>') repeat-x;
  animation: wave 20s linear infinite;
}

@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100px); }
}

.hero-content {
  max-width: 800px;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.7);
  color: #ffffff;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
  font-weight: 600;
}

.hero-description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #ffffff;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
  line-height: 1.6;
  font-weight: 500;
}

.cta-button {
  background: linear-gradient(45deg, #1976d2, #42a5f5);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
  position: relative;
  z-index: 1;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-decoration: none;
  display: inline-block;
}

.cta-button:hover {
  background: linear-gradient(45deg, #42a5f5, #1976d2);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Target Section */
.target-section {
  padding: 80px 0;
  background: linear-gradient(180deg, #e3f2fd 0%, #f8f9ff 100%);
}

.target-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.target-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.target-item {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
}

.target-item h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #1976d2;
}

.target-item p {
  color: #666;
  line-height: 1.6;
}

/* Features Section */
.features-section {
  padding: 80px 0;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%);
}

.features-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease;
  border: 2px solid #bbdefb;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.1);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.2);
  border-color: #1976d2;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* Dashboard Section */
.dashboard-section {
  padding: 60px 0;
  background: linear-gradient(180deg, #ffffff 0%, #f0f8ff 100%);
  border-bottom: 3px solid #e3f2fd;
}

.dashboard-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #1976d2;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.dashboard-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.15);
  overflow: hidden;
  transition: transform 0.3s ease;
  border: 2px solid #e3f2fd;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(25, 118, 210, 0.2);
}

.card-header {
  background: linear-gradient(135deg, #1976d2, #42a5f5);
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.card-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.card-content {
  padding: 2rem;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-content {
  text-align: center;
  color: #666;
}

.placeholder-content p {
  margin-bottom: 1rem;
  font-style: italic;
}

.placeholder-box {
  width: 100%;
  height: 100px;
  background: linear-gradient(135deg, #f5f5f5, #e8f4fd);
  border: 2px dashed #bbdefb;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #90a4ae;
  font-size: 0.9rem;
}

.prediction-card .card-header {
  background: linear-gradient(135deg, #7b1fa2, #ab47bc);
}

.weather-card .card-header {
  background: linear-gradient(135deg, #1976d2, #42a5f5);
}

.uv-card .card-header {
  background: linear-gradient(135deg, #f57c00, #ffb74d);
}

/* Footer */
.footer {
  background: linear-gradient(135deg, #1565c0, #1976d2);
  color: white;
  padding: 40px 0;
  text-align: center;
}

.footer p {
  margin: 0.5rem 0;
  opacity: 0.9;
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

  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .target-content,
  .features-grid,
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .target-section h2,
  .features-section h2,
  .dashboard-section h2 {
    font-size: 2rem;
  }
  
  .dashboard-card {
    min-width: 300px;
  }
}
</style>
