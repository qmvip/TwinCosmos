/**
 * TwinCosmos - Fusion Reactor Simulation Demo
 * 
 * Demonstrates tokamak fusion physics with V5 stability prediction
 * 
 * Run: node examples/03-fusion-reactor.js
 */

import { FusionSimulator } from '../src/simulators/fusion.js';

function demoFusionReactor() {
  console.log('='.repeat(60));
  console.log('⚛️  Fusion Reactor Digital Twin Demo');
  console.log('='.repeat(60));
  console.log();
  
  // Initialize tokamak simulator
  const reactor = new FusionSimulator({
    reactorType: 'tokamak',
    initialTemperature: 1e7,  // 10 million K
    initialDensity: 5e19,     // 5e19 m^-3
    majorRadius: 6.0,         // meters
    minorRadius: 2.0,         // meters
    magneticField: 5.0        // Tesla
  });
  
  console.log('⚙️  Reactor Configuration:');
  console.log(`   - Type: ${reactor.config.reactorType}`);
  console.log(`   - Major Radius: ${reactor.config.majorRadius}m`);
  console.log(`   - Minor Radius: ${reactor.config.minorRadius}m`);
  console.log(`   - Magnetic Field: ${reactor.config.magneticField}T`);
  console.log();
  
  // Run simulation
  console.log('🔥 Running fusion simulation...\n');
  console.log('Time(s) | Temp(MK) | Density(e19) | Power(MW) | Stability | Phase');
  console.log('-'.repeat(70));
  
  const results = [];
  const steps = 30;
  
  for (let i = 0; i < steps; i++) {
    const state = reactor.step(1.0);
    results.push(state);
    
    // Print every 5 steps
    if (i % 5 === 0 || i === steps - 1) {
      console.log(
        `${state.time.toFixed(1).padStart(6)} | ` +
        `${(state.temperature/1e6).toFixed(1).padStart(9)} | ` +
        `${(state.density/1e19).toFixed(2).padStart(12)} | ` +
        `${(state.fusionPower/1e6).toFixed(2).padStart(9)} | ` +
        `${(state.stability*100).toFixed(1).padStart(9)}% | ` +
        `${state.phase.padStart(10)}`
      );
    }
  }
  
  // Analysis
  console.log('\n' + '='.repeat(60));
  console.log('📊 Simulation Analysis:');
  console.log('='.repeat(60));
  
  const temps = results.map(r => r.temperature);
  const powers = results.map(r => r.fusionPower);
  const stabilities = results.map(r => r.stability);
  
  console.log(`\n  Temperature Range: ${(Math.min(...temps)/1e6).toFixed(1)} - ${(Math.max(...temps)/1e6).toFixed(1)} MK`);
  console.log(`  Power Range: ${(Math.min(...powers)/1e6).toFixed(2)} - ${(Math.max(...powers)/1e6).toFixed(2)} MW`);
  console.log(`  Stability Range: ${(Math.min(...stabilities)*100).toFixed(1)}% - ${(Math.max(...stabilities)*100).toFixed(1)}%`);
  
  // V5 Stability Analysis
  console.log('\n🔬 V5 Barrier Stability Analysis:');
  console.log('  Equation: P = 1/(1+e^(-2γ(Input-B)))');
  console.log('  Parameters: Barrier=0.5, Gamma=2.0');
  
  const avgStability = stabilities.reduce((a, b) => a + b, 0) / stabilities.length;
  const v5Barrier = 0.5;
  const gamma = 2.0;
  const v5Probability = 1 / (1 + Math.exp(-2 * gamma * (avgStability - v5Barrier)));
  
  console.log(`\n  Average Stability Input: ${(avgStability*100).toFixed(1)}%`);
  console.log(`  V5 Barrier Output (P): ${(v5Probability*100).toFixed(1)}%`);
  console.log(`  Interpretation: ${v5Probability > 0.7 ? 'Stable operation' : v5Probability > 0.5 ? 'Marginal stability' : 'Unstable'}`);
  
  // Phase timeline
  console.log('\n📅 Phase Timeline:');
  const phases = results.map(r => r.phase);
  const phaseCounts = {};
  phases.forEach(p => {
    phaseCounts[p] = (phaseCounts[p] || 0) + 1;
  });
  Object.entries(phaseCounts).forEach(([phase, count]) => {
    console.log(`  - ${phase}: ${count} steps (${(count/steps*100).toFixed(0)}%)`);
  });
  
  console.log('\n✅ Fusion Reactor Demo Complete!');
}

demoFusionReactor();
