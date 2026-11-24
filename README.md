# SoftPip The Enforcer

> **v0.1.0 — demo only until 200 clean trades**  
> Open-source execution container and risk governor for Deriv Synthetic Index Options.

**It has no edge over the market. It has an edge over you.**

---

## Architecture Overview

```text
       +-------------------------------------------------------------+
       |                  SoftPip Enforcer (v0.1.0)                  |
       |                                                             |
       |  +--------------------+         +------------------------+  |
       |  |   Watchdog (30s)   |         |   Telegram Bot (Poll)  |  |
       |  |  Touches heartbeat |         |  /status /stats /ladder|  |
       |  +---------+----------+         +-----------+------------+  |
       |            |                                |               |
       |            v                                v               |
       |  +-------------------------------------------------------+  |
       |  |                  Execution Supervisor                 |  |
       |  +---------------------------+---------------------------+  |
       |                              |                              |
       |          +-------------------+-------------------+          |
       |          |                                       |          |
       |          v                                       v          |
       |  +-----------------------+               +---------------+  |
       |  |     Risk Governor     |               |   Reconciler  |  |
       |  |  Strict 8-Step Gate   |               |  Open Orders  |  |
       |  +-----------+-----------+               +-------+-------+  |
       |              |                                   |          |
       +--------------|-----------------------------------|----------+
                      |                                   |
                      v                                   v
             +-----------------+                 +-----------------+
             |   Journal WAL   |                 | Deriv WebSocket |
             | (Idempotent DB) |                 | (wss://derivws) |
             +-----------------+                 +-----------------+
```

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

The Enforcer eliminates discretionary emotion and replaces unconstrained doubling with a conservative **1.3× ladder capped at 5 steps** ($3.17 total risk across 5 steps), an automatic 15-minute socket disconnect upon 2 consecutive losses ($0.81 cumulative pre-cooloff risk), and a strict daily loss limit of 10% with a $1.00 floor.

---

## Process-Level Risk Defaults

The Enforcer governs trade execution according to nine non-negotiable process limits, mirrored identically in `lib/governor-spec.ts`:

| Control Group | Parameter | Limit / Value | Operational Enforcement |
| :--- | :--- | :--- | :--- |
| **Stake** | Base stake floor | `$0.35` (fixed) | Hard synthetic floor at $10 (3.5% of equity); percent mode unlocks 1% sizing above $100. |
| **Stake** | Recovery ladder | `1.3×` capped at 5 steps | Explicit steps (`$0.35, $0.46, $0.59, $0.77, $1.00`) totaling `$3.17` cumulative risk. |
| **Stake** | Reset ladder on cool-off | `True` (reset to step 1) | Resets progression back to `$0.35` after cool-off so the bot never resumes at step 4 into chop. |
| **Time** | Loss cool-off | `15 min` after 2 losses | Halts dispatch for 900s (`$0.81` cumulative risk across first 2 steps) before daily cap fires. |
| **Time** | Session trade cap | `40 trades` per session | Prevents over-trading through extended flat or choppy volatility regimes. |
| **Time** | Session timer | `60 min` kill switch | Auto-terminates run at 3,600 seconds continuous elapsed runtime. |
| **Capital** | Daily loss limit | `10%` (`$1.00` floor) | Enforces `max($1.00, 10% of equity)` until 00:00 UTC rollover. |
| **Capital** | Drawdown stop | `20%` peak drawdown | Halts session if equity falls 20% below the session peak balance. |
| **Capital** | Balance floor | `$2.00` floor + fail-closed | Refuses new orders at or below `$2.00`, on socket error, scope violation, or margin failure. |

*Note: Three of these corroborate each other at a $10 balance; they separate as equity grows.*

---

## 60-Second Dry-Run Quickstart

Test the governor and execution engine immediately in local simulation without exposing credentials or live capital:

```bash
# 1. Clone the repository
git clone https://github.com/harrisonojek/softpip-enforcer.git
cd softpip-enforcer

# 2. Create virtual environment and install pinned dependencies
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt

# 3. Launch 60-second dry run
python main.py --dry-run --config config.example.yaml
```

---

## Production Deployment & Setup

### Option 1: Docker Compose (Recommended VPS)

```bash
# Copy configuration and environment templates
cp config.example.yaml config.yaml
cp .env.example .env
chmod 600 .env

# Edit API token and credentials
nano config.yaml

# Build and start background service
docker compose up -d

# Follow execution logs
docker compose logs -f
```

### Option 2: Automated VPS Script

```bash
curl -fsSL https://raw.githubusercontent.com/harrisonojek/softpip-enforcer/main/install.sh | bash
```

---

## Telegram Remote Commands

When configured with a Telegram bot token and restricted to your chat ID, The Enforcer can be commanded securely:

| Command | Description |
| :--- | :--- |
| `/start` | Launch or resume trading execution session. |
| `/stop` | Immediately halt trading, close active proposals, and drop socket. |
| `/pause` | Temporarily pause new order dispatch without resetting session stats. |
| `/status` | Inspect live balance, peak balance, ladder step, and active governor halts. |
| `/stats` | Display lifetime win rate, trade volume, P&L, and clean demo trade counts. |
| `/ladder` | Query current position in the 1.3× recovery ladder and next stake amount. |
| `/export` | Trigger local CSV export of all journaled trades for open auditing. |
| `/help` | Print command cheat sheet and operational instructions. |

---

## Status & Live Trading Gate

**Status: demo only until 200 clean trades**

All deployments run in simulation or Deriv Virtual/Demo mode until **200 clean demo trades** are logged in `journal.db` without a single risk limit violation. The supervisor strictly refuses `--live` execution if `journal.count_clean_demo_trades() < 200`.

---

## Track Record & Replay Dataset Disclosure

The historical baseline log bundled in `sim/fixtures/` and exported to the track record ledger is classified as:

> **"simulated replay, fixed payout, filtered entries"**

- **Payout Origin:** Payouts are hardcoded in simulation at a fixed 95% return (`stake * 0.95`). They were not pulled from live broker proposal calls.
- **Win Rate:** The simulated 54% win rate reflects the entry filter (momentum and volatility bounds) rather than predictive forecasting skill.
- **Purpose:** The replay exists to mathematically prove that the Risk Governor mechanically prevents ruin, enforces the 2-loss cool-off, and halts at the $1.00 daily loss floor across multi-session drawdowns.

---

## License

Licensed under the MIT License — Copyright (c) 2026 Oghenerioborue Harrison Ekuetafia.  
See [LICENSE](LICENSE) for details.
