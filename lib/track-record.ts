export interface TrackRecordWeek {
  id: string;
  week: string;
  environment: "Demo" | "Live";
  instrument: string;
  trades: number;
  netUsd: number;
  netNaira: number;
  maxDrawdownPct: number;
  notes: string;
}

export const USD_TO_NGN_RATE = 1600;

export const TRACK_RECORD_WEEKS: TrackRecordWeek[] = [
  {
    id: "2026-w01",
    week: "Week 1 · Jan 05 – Jan 11, 2026",
    environment: "Demo",
    instrument: "Volatility 75 (1s) · Rise/Fall",
    trades: 52,
    netUsd: 4.20,
    netNaira: 4.20 * USD_TO_NGN_RATE,
    maxDrawdownPct: 6.2,
    notes: "Demo baseline forward-test. 15-minute cool-off triggered once on Wednesday chop; reset to step 1.",
  },
  {
    id: "2026-w02",
    week: "Week 2 · Jan 12 – Jan 18, 2026",
    environment: "Demo",
    instrument: "Volatility 75 (1s) · Rise/Fall",
    trades: 48,
    netUsd: -1.80,
    netNaira: -1.80 * USD_TO_NGN_RATE,
    maxDrawdownPct: 12.4,
    notes: "Demo. Daily loss floor ($2.00) protected session on Thursday; halted cleanly without tilt.",
  },
  {
    id: "2026-w03",
    week: "Week 3 · Jan 19 – Jan 25, 2026",
    environment: "Demo",
    instrument: "Volatility 75 (1s) · Rise/Fall",
    trades: 56,
    netUsd: 5.85,
    netNaira: 5.85 * USD_TO_NGN_RATE,
    maxDrawdownPct: 5.8,
    notes: "Demo. 1.3× recovery ladder resolved within 3 steps throughout; zero 5-step breaches.",
  },
  {
    id: "2026-w04",
    week: "Week 4 · Jan 26 – Feb 01, 2026",
    environment: "Demo",
    instrument: "Volatility 75 (1s) · Rise/Fall",
    trades: 54,
    netUsd: 3.14,
    netNaira: 3.14 * USD_TO_NGN_RATE,
    maxDrawdownPct: 8.1,
    notes: "Demo. Crossed 200 clean demo trades graduation threshold on Thursday session.",
  },
];

export function formatUsdSigned(amount: number): string {
  const abs = Math.abs(amount).toFixed(2);
  if (amount > 0) return `+$${abs}`;
  if (amount < 0) return `-$${abs}`;
  return `$0.00`;
}

export function formatNairaSigned(amount: number): string {
  const absFormatted = Math.round(Math.abs(amount)).toLocaleString("en-NG");
  if (amount > 0) return `+₦${absFormatted}`;
  if (amount < 0) return `-₦${absFormatted}`;
  return `₦0`;
}

export function getTrackRecordTotals(weeks: TrackRecordWeek[] = TRACK_RECORD_WEEKS) {
  const totalTrades = weeks.reduce((sum, w) => sum + w.trades, 0);
  const totalNetUsd = weeks.reduce((sum, w) => sum + w.netUsd, 0);
  const totalNetNaira = weeks.reduce((sum, w) => sum + w.netNaira, 0);
  const worstDrawdownPct = weeks.reduce(
    (max, w) => (w.maxDrawdownPct > max ? w.maxDrawdownPct : max),
    0
  );
  return {
    totalTrades,
    totalNetUsd: Number(totalNetUsd.toFixed(2)),
    totalNetNaira,
    worstDrawdownPct,
  };
}
