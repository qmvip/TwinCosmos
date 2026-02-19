/**
 * TwinCosmos - Decision Engine Demo
 * 
 * Demonstrates V5-based algorithm selection
 * 
 * Run: node examples/02-decision-engine.js
 */

import { DecisionEngine } from '../src/decision/engine.js';

function demoDecisionEngine() {
  console.log('='.repeat(60));
  console.log('🧠 V5 Decision Engine Demo');
  console.log('='.repeat(60));
  console.log();
  
  const engine = new DecisionEngine({
    barrier: 0.5,
    gamma: 2.0,
    decisionThreshold: 0.7
  });
  
  // Test cases representing different fusion states
  const testCases = [
    {
      name: 'Cold Start',
      state: { temperature: 1e6, density: 1e18, stability: 0.1, fusionPower: 0 }
    },
    {
      name: 'Heating Up',
      state: { temperature: 5e7, density: 5e19, stability: 0.3, fusionPower: 1e4 }
    },
    {
      name: 'Near Ignition',
      state: { temperature: 8e7, density: 1e20, stability: 0.6, fusionPower: 1e6 }
    },
    {
      name: 'Burn Phase',
      state: { temperature: 1.5e8, density: 1e20, stability: 0.85, fusionPower: 5e7 }
    },
    {
      name: 'Stable Operation',
      state: { temperature: 1e8, density: 1e20, stability: 0.95, fusionPower: 1e8 }
    }
  ];
  
  console.log('📋 Testing V5 Decision Algorithm:\n');
  console.log('V5 Equation: P = 1/(1+e^(-2γ(Input-B)))');
  console.log('Parameters: Barrier=0.5, Gamma=2.0\n');
  console.log('-'.repeat(60));
  
  for (const testCase of testCases) {
    const decision = engine.decide(testCase.state);
    
    console.log(`\n🔹 ${testCase.name}`);
    console.log(`   Input State:`);
    console.log(`     - Temperature: ${(testCase.state.temperature/1e6).toFixed(1)}MK`);
    console.log(`     - Density: ${(testCase.state.density/1e19).toFixed(2)}e19 m⁻³`);
    console.log(`     - Stability: ${(testCase.state.stability*100).toFixed(1)}%`);
    console.log(`   V5 Decision:`);
    console.log(`     - Confidence: ${(decision.confidence*100).toFixed(1)}%`);
    console.log(`     - Should Act: ${decision.shouldAct ? 'YES' : 'NO'}`);
    console.log(`   Actions:`);
    console.log(`     - Heating: ${decision.actions.heating}`);
    console.log(`     - Fueling: ${decision.actions.fueling}`);
    console.log(`     - Magnetic: ${decision.actions.magnetic}`);
    console.log(`   Rationale: ${decision.rationale.join(', ')}`);
  }
  
  // Show learning results
  console.log('\n' + '='.repeat(60));
  console.log('📊 Learning Results (Hebb Theory):');
  console.log('='.repeat(60));
  
  const patterns = engine.getPatterns();
  console.log(`\nLearned ${patterns.length} state patterns:\n`);
  
  patterns.forEach((p, i) => {
    console.log(`  ${i+1}. Pattern "${p.key}":`);
    console.log(`     - Occurrences: ${p.count}`);
    console.log(`     - Success Rate: ${(p.avgScore*100).toFixed(1)}%`);
  });
  
  console.log('\n✅ Decision Engine Demo Complete!');
}

demoDecisionEngine();
