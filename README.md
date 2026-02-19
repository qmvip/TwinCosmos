# TwinCosmos - V5 Meta Memory + Fusion Physics Simulation System

## 概述

TwinCosmos 是一个数字孪生宇宙框架，融合了 V5 Meta Memory 系统、聚变物理模拟和算法决策引擎。

### 核心特性

- **V5 Memory System**: 基于广义势垒方程的记忆系统
- **Fusion Simulator**: 托卡马克聚变反应堆数字孪生
- **Decision Engine**: V5驱动的算法决策系统

### 核心公式

```
V5 Barrier Equation: P = 1/(1+e^(-2γ(Input-B)))
```

### Hebb Theory Connection

- **Input** = 复习 (增加信号)
- **γ** = 熟练度 (提高响应)
- **P→1** = 顺 (条件反射)

## 安装

```bash
cd TwinCosmos
npm install
```

## 快速开始

### 示例 1: 基本模拟

```bash
npm start
# or
node examples/01-basic-simulation.js
```

### 示例 2: 决策引擎演示

```bash
node examples/02-decision-engine.js
```

### 示例 3: 聚变反应堆模拟

```bash
node examples/03-fusion-reactor.js
```

## 项目结构

```
TwinCosmos/
├── src/
│   ├── index.js              # Main entry
│   ├── simulators/
│   │   └── fusion.js         # Fusion reactor simulator
│   └── decision/
│       └── engine.js         # V5 decision engine
├── examples/
│   ├── 01-basic-simulation.js
│   ├── 02-decision-engine.js
│   └── 03-fusion-reactor.js
├── package.json
└── README.md
```

## 技术架构

### 1. V5 Memory System

集成 `@wangyi/v5-memory`，提供：
- 分层记忆存储 (Hot/Warm/Cold)
- 混合检索 (BM25 + 向量 + 图)
- 认知推理框架 (ToT/GoT)

### 2. Fusion Simulator

托卡马克聚变反应堆数字孪生：
- 等离子体温度模拟
- 粒子密度计算
- 聚变功率输出
- V5稳定性预测

### 3. Decision Engine

基于 V5 方程的算法选择：
- 加热策略决策
- 燃料供应策略
- 磁场控制决策
- Hebb 学习机制

## 许可证

MIT
