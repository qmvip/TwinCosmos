/**
 * FusionSimulator - Simplified Fusion Reactor Digital Twin
 * 
 * Simulates basic tokamak fusion physics:
 * - Plasma temperature (K)
 * - Particle density (m^-3)
 * - Confinement time (s)
 * - Fusion power output
 * 
 * V5 equation for stability prediction:
 * P = 1/(1+e^(-2γ(Input-B)))
 */

export class FusionSimulator {
  constructor(config = {}) {
    this.config = {
      reactorType: config.reactorType || 'tokamak',
      initialTemperature: config.initialTemperature || 1e8,  // 100 million K
      initialDensity: config.initialDensity || 1e20,           // 10^20 m^-3
      confinementTime: config.confinementTime || 3.0,         // seconds
      majorRadius: config.majorRadius || 6.0,                  // meters
      minorRadius: config.minorRadius || 2.0,                  // meters
      magneticField: config.magneticField || 5.0,              // Tesla
      ...config
    };
    
    this.state = {
      temperature: this.config.initialTemperature,
      density: this.config.initialDensity,
      confinementTime: this.config.confinementTime,
      fusionPower: 0,
      stability: 0.5,
      phase: 'ignition',  // ignition, ramp-up, burn, decline
      time: 0,
      history: []
    };
    
    // V5 parameters for stability
    this.v5Params = {
      barrier: 0.5,
      gamma: 2.0,
      inputRange: { min: 0, max: 1 }
    };
  }

  /**
   * Calculate fusion power output
   * Simplified fusion power formula: P_fusion = n_i * n_j * <σv> * E
   */
  calculateFusionPower() {
    const n = this.state.density;
    const T = this.state.temperature;
    
    // Simplified reactivity model (T in keV)
    const T_keV = T / 1.16e7;
    const sigma_v = 1.1e-21 * Math.pow(T_keV, 2) / (1 + (T_keV / 15));
    
    // Deuterium-Tritium fusion energy per reaction (17.6 MeV)
    const E_fusion = 17.6 * 1.602e-13; // Joules
    
    const power = n * n * sigma_v * E_fusion;
    
    return power;
  }

  /**
   * V5 barrier calculation for stability prediction
   * Maps input match degree to memory activation probability
   * Here: input = normalized stability metrics
   */
  calculateV5Barrier(input) {
    const { barrier, gamma } = this.v5Params;
    const Input = this.normalizeInput(input);
    
    // V5 equation: P = 1/(1+e^(-2γ(Input-B)))
    const exponent = -2 * gamma * (Input - barrier);
    const P = 1 / (1 + Math.exp(exponent));
    
    return P;
  }

  normalizeInput(value) {
    // Normalize input to [0, 1] range
    return Math.max(0, Math.min(1, value));
  }

  /**
   * Calculate stability metric (0-1)
   * Based on triple product: n * T * τ
   */
  calculateStability() {
    const n = this.state.density / 1e20;  // Normalized density
    const T = this.state.temperature / 1e8; // Normalized temperature
    const tau = this.state.confinementTime / 3.0; // Normalized confinement
    
    // Triple product (normalized)
    const tripleProduct = n * T * tau;
    
    // Stability threshold (simplified Lawson criterion)
    const lawsonLimit = 3e21;
    const stability = Math.min(1, tripleProduct / lawsonLimit);
    
    return stability;
  }

  /**
   * Single simulation step
   */
  step(deltaTime = 1.0) {
    this.state.time += deltaTime;
    
    // Update temperature (heat balance)
    const heatingPower = 50e6; // 50 MW auxiliary heating
    const coolingFactor = 0.01;
    const fusionPower = this.calculateFusionPower();
    
    this.state.temperature += (heatingPower + fusionPower) * deltaTime / 1000;
    this.state.temperature *= (1 - coolingFactor * deltaTime);
    
    // Update density (fuel supply)
    const fuelingRate = 1e18; // particles/m³/s
    this.state.density += fuelingRate * deltaTime;
    this.state.density *= (1 - 0.001 * deltaTime); // Exhaust loss
    
    // Update confinement time (improves with temperature)
    this.state.confinementTime = 3.0 * (1 + 0.1 * Math.log10(this.state.temperature / 1e8));
    
    // Calculate fusion power
    this.state.fusionPower = fusionPower;
    
    // Calculate stability using V5
    const stability = this.calculateStability();
    this.state.stability = this.calculateV5Barrier(stability);
    
    // Determine phase
    if (this.state.temperature > 1e8 && this.state.fusionPower > 1e6) {
      this.state.phase = 'burn';
    } else if (this.state.temperature > 5e7) {
      this.state.phase = 'ramp-up';
    }
    
    // Store history
    this.state.history.push({
      time: this.state.time,
      temperature: this.state.temperature,
      density: this.state.density,
      fusionPower: this.state.fusionPower,
      stability: this.state.stability,
      phase: this.state.phase
    });
    
    // Limit history size
    if (this.state.history.length > 1000) {
      this.state.history.shift();
    }
    
    return this.getState();
  }

  getState() {
    return { ...this.state };
  }

  getHistory() {
    return [...this.state.history];
  }

  /**
   * Apply control parameter (heating, fueling, etc.)
   */
  applyControl(control) {
    if (control.heating) {
      // Adjust heating power
    }
    if (control.fueling) {
      this.state.density *= (1 + control.fueling);
    }
    if (control.magneticField) {
      this.config.magneticField = control.magneticField;
    }
  }
}

export default FusionSimulator;
