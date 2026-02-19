/**
 * DecisionEngine - V5-based Algorithm Decision System
 * 
 * Uses V5 barrier equation to decide:
 * - Which algorithm to use
 * - When to switch strategies
 * - Confidence in decision
 * 
 * Hebb Theory Connection:
 * "Cells that fire together, wire together"
 * - Input = 复习 (increase signal)
 * - γ = 熟练度 (improve response)
 * - P→1 = 顺 (conditioned reflex)
 */

export class DecisionEngine {
  constructor(config = {}) {
    this.config = {
      memory: config.memory || null,
      decisionThreshold: config.decisionThreshold || 0.7,
      explorationRate: config.explorationRate || 0.1,
      ...config
    };
    
    // V5 parameters
    this.v5Params = {
      barrier: config.barrier || 0.5,
      gamma: config.gamma || 1.5
    };
    
    // Available algorithms for fusion control
    this.algorithms = {
      heating: [' PID', 'ML-PID', 'Adaptive', 'Neural'],
      fueling: ['Constant', 'Pulsed', 'Feedback', 'Predictive'],
      magnetic: ['Fixed', 'Adaptive', 'Optimized', 'AI']
    };
    
    // Performance history
    this.history = [];
    
    // Learned patterns
    this.patterns = new Map();
    
    // Current best algorithms
    this.currentBest = {
      heating: 'PID',
      fueling: 'Feedback',
      magnetic: 'Adaptive'
    };
  }

  /**
   * V5 decision calculation
   * P = 1/(1+e^(-2γ(Input-B)))
   */
  calculateDecision(input, context = {}) {
    const { barrier, gamma } = this.v5Params;
    
    // Input = match score between current state and learned patterns
    const matchScore = this.calculateMatchScore(input, context);
    
    const exponent = -2 * gamma * (matchScore - barrier);
    const P = 1 / (1 + Math.exp(exponent));
    
    return {
      probability: P,
      confidence: P,
      shouldDecide: P > this.config.decisionThreshold,
      matchScore
    };
  }

  /**
   * Calculate how well current state matches learned patterns
   */
  calculateMatchScore(state, context) {
    if (!this.patterns.size) {
      return 0.5; // Default mid-score when no patterns
    }
    
    let bestMatch = 0;
    
    for (const [pattern, score] of this.patterns) {
      const match = this.compareState(state, pattern);
      if (match > bestMatch) {
        bestMatch = match;
      }
    }
    
    return bestMatch;
  }

  /**
   * Compare current state with pattern
   */
  compareState(current, pattern) {
    let totalWeight = 0;
    let matchedWeight = 0;
    
    const keys = ['temperature', 'density', 'stability', 'fusionPower'];
    
    for (const key of keys) {
      if (pattern[key] !== undefined) {
        const weight = key === 'stability' ? 2 : 1;
        totalWeight += weight;
        
        const diff = Math.abs(current[key] - pattern[key]) / (pattern[key] + 1);
        if (diff < 0.2) {
          matchedWeight += weight;
        }
      }
    }
    
    return totalWeight > 0 ? matchedWeight / totalWeight : 0;
  }

  /**
   * Main decision function
   */
  decide(fusionState) {
    const decision = {
      timestamp: Date.now(),
      state: {
        temperature: fusionState.temperature,
        density: fusionState.density,
        stability: fusionState.stability,
        phase: fusionState.phase
      },
      actions: {},
      rationale: []
    };
    
    // Decide on heating strategy
    const heatingDecision = this.decideHeating(fusionState);
    decision.actions.heating = heatingDecision.algorithm;
    decision.rationale.push(heatingDecision.reason);
    
    // Decide on fueling strategy
    const fuelingDecision = this.decideFuel(fusionState);
    decision.actions.fueling = fuelingDecision.algorithm;
    decision.rationale.push(fuelingDecision.reason);
    
    // Decide on magnetic control
    const magneticDecision = this.decideMagnetic(fusionState);
    decision.actions.magnetic = magneticDecision.algorithm;
    decision.rationale.push(magneticDecision.reason);
    
    // Calculate overall confidence
    const v5Result = this.calculateDecision(fusionState);
    decision.confidence = v5Result.confidence;
    decision.shouldAct = v5Result.shouldDecide;
    
    // Learn from this decision
    this.learn(fusionState, decision);
    
    // Store in history
    this.history.push(decision);
    
    return decision;
  }

  decideHeating(state) {
    if (state.temperature < 5e7) {
      return { algorithm: 'PID', reason: 'Temperature too low, use aggressive PID' };
    } else if (state.stability < 0.3) {
      return { algorithm: 'ML-PID', reason: 'Stability low, use ML-enhanced PID' };
    } else if (state.phase === 'burn') {
      return { algorithm: 'Adaptive', reason: 'Burn phase, adaptive control' };
    } else {
      return { algorithm: this.currentBest.heating, reason: 'Normal operation' };
    }
  }

  decideFuel(state) {
    if (state.density < 5e19) {
      return { algorithm: 'Pulsed', reason: 'Low density, pulsed fueling' };
    } else if (state.stability < 0.4) {
      return { algorithm: 'Predictive', reason: 'Low stability, predictive fueling' };
    } else if (state.phase === 'burn') {
      return { algorithm: 'Feedback', reason: 'Burn phase, feedback control' };
    } else {
      return { algorithm: this.currentBest.fueling, reason: 'Normal operation' };
    }
  }

  decideMagnetic(state) {
    if (state.stability < 0.3) {
      return { algorithm: 'AI', reason: 'Critical stability, use AI control' };
    } else if (state.phase === 'burn') {
      return { algorithm: 'Optimized', reason: 'Burn phase, optimized magnetic field' };
    } else {
      return { algorithm: this.currentBest.magnetic, reason: 'Normal operation' };
    }
  }

  /**
   * Learn from decision outcomes (Hebb: cells that fire together, wire together)
   */
  learn(state, decision) {
    const patternKey = this.hashState(state);
    
    if (!this.patterns.has(patternKey)) {
      this.patterns.set(patternKey, {
        temperature: state.temperature,
        density: state.density,
        stability: state.stability,
        fusionPower: state.fusionPower,
        count: 0,
        totalScore: 0
      });
    }
    
    const pattern = this.patterns.get(patternKey);
    pattern.count++;
    
    // Calculate success score based on stability improvement
    const successScore = state.stability > 0.5 ? 1 : 0;
    pattern.totalScore += successScore;
    
    // Update best algorithms if performance improved
    if (successScore > 0.8) {
      this.currentBest.heating = decision.actions.heating;
      this.currentBest.fueling = decision.actions.fueling;
      this.currentBest.magnetic = decision.actions.magnetic;
    }
  }

  hashState(state) {
    // Simple hash for state clustering
    const t = Math.floor(state.temperature / 1e7);
    const d = Math.floor(state.density / 1e19);
    const s = Math.floor(state.stability * 10);
    return `${t}_${d}_${s}`;
  }

  getHistory() {
    return [...this.history];
  }

  getPatterns() {
    const result = [];
    for (const [key, value] of this.patterns) {
      result.push({
        key,
        ...value,
        avgScore: value.count > 0 ? value.totalScore / value.count : 0
      });
    }
    return result.sort((a, b) => b.avgScore - a.avgScore);
  }
}

export default DecisionEngine;
