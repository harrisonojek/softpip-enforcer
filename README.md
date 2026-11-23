# SoftPip The Enforcer

Open-source execution container and risk governor for Deriv Synthetic Index Options.

**It has no edge over the market. It has an edge over you.**

---

## Why It Exists

In 2025, Oghenerioborue Harrison Ekuetafia lost ₦32,450,000 trading synthetic index options on Deriv. The loss was not caused by market anomalies or broker execution delays; it was driven by position sizing distortion, revenge trading after normal drawdowns, and lack of automated execution brakes.

Deriv enforces a minimum stake floor of $0.35 on Volatility 75 index options. On a standard $10 beginner balance, a single $0.35 contract represents **3.5% of the entire account**. In institutional risk management, 3.5% per trade is already aggressive exposure.

When retail traders attempt to recover losses using a standard 2× Martingale progression:
- **Step 1:** $0.35
- **Step 2:** $0.70
- **Step 3:** $1.40
- **Step 4:** $2.80
- **Step 5:** $5.60
- **Cumulative Risk:** **$10.85**

A $10 account cannot survive five consecutive losses under Martingale doubling—it suffers complete liquidation on Step 5.

The Enforcer eliminates discretionary emotion and replaces unconstrained doubling with a conservative **1.3× ladder capped at 5 steps** ($3.17 total risk across 5 steps), an automatic 15-minute socket disconnect upon 3 consecutive losses, and a strict daily drawdown stop of $1.00 (10% of $10).

---

## Process-Level Risk Defaults

The Enforcer governs trade execution according to nine non-negotiable process limits:

| Control | Value | Operational Purpose |
| :--- | :--- | :--- |
| **Stake Floor** | `$0.35` | Deriv synthetic index minimum contract size (3.5% of a $10 account). |
| **Progression Multiplier** | `1.3×` | Controlled step progression on loss (replaces destructive 2.0× Martingale). |
| **Max Ladder Steps** | `5 steps` | Progression ceiling capping total ladder risk strictly at `$3.17`. |
| **Consecutive Loss Limit** | `3 losses` | Triggers an immediate 15-minute socket disconnect to break tilt loops. |
| **Cool-Off Duration** | `900s (15 min)` | Enforced cooling period during which all trade execution is locked. |
| **Daily Loss Limit** | `$1.00` | Hard daily stop (10% of $10 balance); terminates execution for the day. |
| **Balance Floor** | `$9.00` | Account capital floor below which no new orders will be submitted. |
| **Session Kill Switch** | `3,600s (60 min)` | Maximum continuous runtime before mandatory process exit. |
| **Max Session Trades** | `20 trades` | Trade frequency ceiling preventing over-trading in choppy regimes. |

---

## Installation & Setup

### Option 1: Automated VPS Script (Recommended)

Run the one-command installer on any Debian/Ubuntu Linux VPS with Docker:

```bash
curl -fsSL https://raw.githubusercontent.com/harrisonojek/softpip-enforcer/main/install.sh | bash
```

### Option 2: Manual Python Setup

Requirements: Python 3.10+, Git.

```bash
# 1. Clone repository
git clone https://github.com/harrisonojek/softpip-enforcer.git
cd softpip-enforcer

# 2. Set up virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# 3. Create private configuration
cp config.example.yaml config.yaml

# 4. Edit credentials
nano config.yaml  # Enter your Deriv API token and Telegram parameters

# 5. Run the governor
python governor.py
```

### Option 3: Docker Container

```bash
docker build -t softpip-enforcer .
docker run -d --name enforcer --restart unless-stopped -v $(pwd)/config.yaml:/app/config.yaml softpip-enforcer
```

---

## Telegram Remote Commands

When configured with a Telegram bot token, The Enforcer can be monitored and commanded remotely via smartphone:

| Command | Description |
| :--- | :--- |
| `/start` | Launch execution session and connect to Deriv WebSocket. |
| `/stop` | Immediately halt trading, close active proposals, and drop socket. |
| `/pause` | Temporarily pause new order dispatch without resetting session stats. |
| `/status` | Inspect live account balance, current socket state, and uptime. |
| `/stats` | Display daily session P/L, trade count, and peak drawdown. |
| `/ladder` | Query current position in the 1.3× recovery ladder and next stake. |

---

## Current Status

**Status: demo only until 200 live trades**

All initial deployments should run against Deriv Virtual/Demo accounts until 200 continuous executions have been logged in `journal.db` without a single risk limit violation.

---

## License

Licensed under the MIT License — Copyright (c) 2026 Oghenerioborue Harrison Ekuetafia.
See [LICENSE](LICENSE) for details.
