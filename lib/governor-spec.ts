/**
 * Single source of truth for SoftPip The Enforcer risk governance parameters.
 *
 * Every control rendered on `/bot`, `/`, `/curriculum/04`, `/curriculum/05`,
 * and `/scaling` imports directly from this module. `softpip-enforcer/governor.py`
 * (`GovernorConfig`) mirrors every key and default identically, enforced by CI parity tests.
 *
 * RATIONALE:
 * The daily loss limit floor is preserved at $1.00. The 15-minute cool-off triggers
 * after 2 consecutive losses ($0.35 + $0.46 = $0.81 cumulative), keeping it safely
 * under the $1.00 daily loss floor so the cool-off breaker is reachable before the
 * daily stop halts the session. `reset_ladder_on_cooloff` ensures progression resets
 * back to step 1 ($0.35) following the cool-off.
 */

export const GOVERNOR_SPEC = {
  base_stake_usd: 0.35,
  sizing_mode: "fixed" as "fixed" | "percent",
  stake_pct_of_equity: 0.01,
  multiplier: 1.3,
  max_ladder_steps: 5,
  ladder_steps_usd: [0.35, 0.46, 0.59, 0.77, 1.00] as readonly number[],
  ladder_total_risk_usd: 3.17,
  pre_cooloff_ladder_risk_usd: 0.81,
  martingale_steps_usd: [0.35, 0.70, 1.40, 2.80, 5.60] as readonly number[],
  martingale_total_risk_usd: 10.85,
  max_consecutive_losses: 2,
  cool_off_seconds: 900,
  reset_ladder_on_cooloff: true,
  daily_loss_limit_pct_of_equity: 0.10,
  daily_loss_limit_floor_usd: 1.00,
  max_drawdown_pct_of_peak: 0.20,
  balance_floor_usd: 2.00,
  max_session_trades: 40,
  session_timeout_seconds: 3600,
  min_live_balance_usd: 10.00,
  demo_graduation_trades: 200,
} as const;

export const GOVERNOR_CORROBORATION_NOTE =
  "Three of these corroborate each other at a $10 balance; they separate as equity grows.";

export interface GovernorControlItem {
  parameter: string;
  limit: string;
  enforcement: string;
}

export interface GovernorControlGroup {
  id: "stake" | "time" | "capital";
  heading: string;
  summary: string;
  controls: readonly GovernorControlItem[];
}

export const GOVERNOR_CONTROL_GROUPS: readonly GovernorControlGroup[] = [
  {
    id: "stake",
    heading: "Stake",
    summary: "Sizing, progression slope, and post-cool-off reset rules.",
    controls: [
      {
        parameter: "Base stake floor",
        limit: `$${GOVERNOR_SPEC.base_stake_usd.toFixed(2)} (${GOVERNOR_SPEC.sizing_mode})`,
        enforcement: `Hard synthetic floor at $10 (${((GOVERNOR_SPEC.base_stake_usd / GOVERNOR_SPEC.min_live_balance_usd) * 100).toFixed(1)}% of equity); percent mode uses ${(GOVERNOR_SPEC.stake_pct_of_equity * 100).toFixed(0)}% above $100.`,
      },
      {
        parameter: "Recovery ladder",
        limit: `${GOVERNOR_SPEC.multiplier}× capped at ${GOVERNOR_SPEC.max_ladder_steps} steps`,
        enforcement: `Explicit steps ($${GOVERNOR_SPEC.ladder_steps_usd.map((n) => n.toFixed(2)).join(", ")}) totaling $${GOVERNOR_SPEC.ladder_total_risk_usd.toFixed(2)} across ${GOVERNOR_SPEC.max_ladder_steps} steps.`,
      },
      {
        parameter: "Reset ladder on cool-off",
        limit: GOVERNOR_SPEC.reset_ladder_on_cooloff ? "True (reset to step 1)" : "False",
        enforcement: `Resets progression to $${GOVERNOR_SPEC.base_stake_usd.toFixed(2)} after cool-off so the bot never resumes at step 4 into chop.`,
      },
    ],
  },
  {
    id: "time",
    heading: "Time",
    summary: "Mid-session cool-off, frequency ceiling, and hard clock exit.",
    controls: [
      {
        parameter: "Loss cool-off",
        limit: `${Math.round(GOVERNOR_SPEC.cool_off_seconds / 60)} min after ${GOVERNOR_SPEC.max_consecutive_losses} losses`,
        enforcement: `Halts dispatch for ${GOVERNOR_SPEC.cool_off_seconds}s ($${GOVERNOR_SPEC.pre_cooloff_ladder_risk_usd.toFixed(2)} cumulative on first 2 steps) before daily cap fires.`,
      },
      {
        parameter: "Session trade cap",
        limit: `${GOVERNOR_SPEC.max_session_trades} trades per session`,
        enforcement: "Prevents over-trading through extended flat or choppy volatility regimes.",
      },
      {
        parameter: "Session timer",
        limit: `${Math.round(GOVERNOR_SPEC.session_timeout_seconds / 60)} min session timer`,
        enforcement: `Auto-terminates run at ${GOVERNOR_SPEC.session_timeout_seconds.toLocaleString("en-US")} seconds elapsed.`,
      },
    ],
  },
  {
    id: "capital",
    heading: "Capital",
    summary: "Daily loss ceiling, peak-to-trough stop, and equity preservation floor.",
    controls: [
      {
        parameter: "Daily loss limit",
        limit: `${Math.round(GOVERNOR_SPEC.daily_loss_limit_pct_of_equity * 100)}% ($${GOVERNOR_SPEC.daily_loss_limit_floor_usd.toFixed(2)} floor)`,
        enforcement: `Enforces max($${GOVERNOR_SPEC.daily_loss_limit_floor_usd.toFixed(2)}, 10% of equity) until 00:00 UTC rollover.`,
      },
      {
        parameter: "Drawdown stop",
        limit: `${Math.round(GOVERNOR_SPEC.max_drawdown_pct_of_peak * 100)}% peak drawdown`,
        enforcement: "Halts session if equity falls 20% below session peak_balance.",
      },
      {
        parameter: "Balance floor & kill switch",
        limit: `$${GOVERNOR_SPEC.balance_floor_usd.toFixed(2)} floor + fail-closed`,
        enforcement: `Refuses new trades at <= $${GOVERNOR_SPEC.balance_floor_usd.toFixed(2)}, on socket error, scope violation, or margin failure.`,
      },
    ],
  },
] as const;

export interface EquityRiskRow {
  balanceUsd: number;
  floorPct: string;
  fullLadderPct: string;
  stageNote: string;
}

export const EQUITY_RISK_TABLE: readonly EquityRiskRow[] = [
  {
    balanceUsd: 10,
    floorPct: `${((GOVERNOR_SPEC.base_stake_usd / 10) * 100).toFixed(1)}%`,
    fullLadderPct: `${((GOVERNOR_SPEC.ladder_total_risk_usd / 10) * 100).toFixed(1)}%`,
    stageNote: "Trial stage — proves rules hold",
  },
  {
    balanceUsd: 30,
    floorPct: `${((GOVERNOR_SPEC.base_stake_usd / 30) * 100).toFixed(2)}%`,
    fullLadderPct: `${((GOVERNOR_SPEC.ladder_total_risk_usd / 30) * 100).toFixed(1)}%`,
    stageNote: "Still above 1% floor per contract",
  },
  {
    balanceUsd: 50,
    floorPct: `${((GOVERNOR_SPEC.base_stake_usd / 50) * 100).toFixed(2)}%`,
    fullLadderPct: `${((GOVERNOR_SPEC.ladder_total_risk_usd / 50) * 100).toFixed(1)}%`,
    stageNote: "Transitional sizing",
  },
  {
    balanceUsd: 100,
    floorPct: `${((GOVERNOR_SPEC.base_stake_usd / 100) * 100).toFixed(2)}%`,
    fullLadderPct: `${((GOVERNOR_SPEC.ladder_total_risk_usd / 100) * 100).toFixed(1)}%`,
    stageNote: "Institutional threshold (1% mode unlocks)",
  },
] as const;
