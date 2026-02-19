/**
 * TwinCosmos - Basic Simulation Demo
 * 
 * Run: node examples/01-basic-simulation.js
 */

import { TwinCosmos } from '../src/index.js';

async function main() {
  console.log('='.repeat(60));
  console.log('🌌 TwinCosmos - V5 Meta Memory + Fusion Simulation');
  console.log('='.repeat(60));
  console.log();
  
  // Initialize TwinCosmos
  const cosmos = new TwinCosmos({
    memoryEnabled: true,
    fusionEnabled: true,
    decisionEnabled: true,
    reactorType: 'tokamak'
  });
  
  await cosmos.initialize();
  
  // Run simulation
  console.log('📊 Running fusion simulation with V5 decision engine...\n');
  
  const steps = 20;
  for (let i = 0; i < steps; i++) {
    const result = await cosmos.step(0.5);
    
    // Print progress every 5 steps
    if (i % 5 === 0 || i === steps - 1) {
      const f = result.fusion;
      const d = result.decision;
      
      console.log(`Step ${i.toString().padStart(3, '0')} | ` +
        `T: ${(f.temperature/1e6).toFixed(1)}MK | ` +
        `n: ${(f.density/1e19).toFixed(2)}e19 | ` +
        `Stability: ${(f.stability*100).toFixed(1)}% | ` +
        `Phase: ${f.phase.padEnd(8)} | ` +
        `Decision: ${d?.actions?.heating || 'N/A'}`);
    }
  }
  
  console.log();
  
  // Get final state
  const state = cosmos.getState();
  
  console.log('📈 Final Statistics:');
  console.log(`  - Simulation time: ${state.time.toFixed(1)}s`);
  console.log(`  - Peak temperature: ${(Math.max(...state.fusion.history.map(h => h.temperature))/1e6).toFixed(1)}MK`);
  console.log(`  - Peak stability: ${(Math.max(...state.fusion.history.map(h => h.stability))*100).toFixed(1)}%`);
  console.log(`  - Total decisions: ${state.decisions.length}`);
  console.log();
  
  // Show learned patterns
  if (cosmos.components.decision) {
    const patterns = cosmos.components.decision.getPatterns();
    console.log('🧠 Learned Patterns (Hebb: cells that fire together, wire together):');
    patterns.slice(0, 5).forEach((p, i) => {
      console.log(`  ${i+1}. ${p.key}: count=${p.count}, avgScore=${(p.avgScore*100).toFixed(1)}%`);
    });
  }
  
  console.log();
  console.log('✅ Demo complete!');
}

main().catch(console.error);
