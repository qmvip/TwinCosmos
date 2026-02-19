---

## 🔌 Commercial & Research Services
I provide custom development & consulting based on V5 Meta Memory & TwinCosmos:
- Digital twin for fusion / energy / industry
- Real-time simulation system
- AI decision engine integration
- Research paper engineering & code implementation
- Enterprise license & private deployment

Business: rhodri777@foxmail.com

---

# 🌌 TwinCosmos
> 基于 V5 广义势垒的数字孪生聚变物理决策系统  
> An Integrated System of Digital Twin, Fusion Physics, and Algorithmic Decision-Making

[![Demo](https://img.shields.io/badge/Demo-Run%20Now-green)](https://github.com/qmvip/TwinCosmos#quick-start)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20+-yellow)](https://nodejs.org/)

## 核心定位
TwinCosmos 是一套「认知引擎 + 数字孪生 + 聚变物理」的集成系统，基于 V5 元记忆理论（V5 势垒方程）实现：
- 托卡马克聚变反应堆全参数数字孪生模拟；
- 可解释的 V5 算法决策引擎；
- 基于 Hebb 理论的状态学习与记忆；
- 从冷启动到稳定运行的全生命周期控制。

### 核心公式

```
V5 Barrier Equation: P = 1/(1+e^(-2γ(Input-B)))
```

### 核心理论

TwinCosmos 基于 V5 广义势垒方程构建决策与稳定性分析体系：
Input：聚变物理参数（温度 / 密度 / 稳定性）；
γ：V5 目录索引陡度；
B：V5 激活阈值；
P：决策置信度 / 稳定性概率。

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

### 1.克隆仓库
```bash
git clone https://github.com/qmvip/TwinCosmos.git
cd TwinCosmos

### 2.安装依赖

npm install

### 3. 运行演示
bash
运行
# 一键运行所有演示
npm run demo

# 单独运行聚变反应堆模拟
npm run demo:fusion

# 单独运行V5决策引擎
npm run demo:decision

#### 示例 1: 基本模拟

```bash
npm start
# or
node examples/01-basic-simulation.js
```

#### 示例 2: 决策引擎演示

```bash
node examples/02-decision-engine.js
```

#### 示例 3: 聚变反应堆模拟

```bash
node examples/03-fusion-reactor.js
```
## 演示输出示例

### 聚变反应堆模拟
============================================================
⚛️  Fusion Reactor Digital Twin Demo
============================================================
⚙️  Reactor Configuration:
   - Type: tokamak
   - Major Radius: 6m
   - Minor Radius: 2m
   - Magnetic Field: 5T
...
✅ Fusion Reactor Demo Complete!

## 核心功能
模块	功能	演示脚本
FusionSimulator	托卡马克聚变反应堆数字孪生	examples/03-fusion-reactor.js
V5 Decision Engine	基于 V5 势垒方程的可解释决策	examples/02-decision-engine.js
V5 Meta Memory	元记忆存储与 Hebb 学习	内嵌于基础演示

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
