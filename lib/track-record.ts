export interface TrackRecordWeek {
  id: string;
  week: string;
  environment: "Demo" | "Live";
  instrument: string;
  trades: number;
  netNaira: number;
  maxDrawdownPct: number;
  notes: string;
}

export const TRACK_RECORD_WEEKS: TrackRecordWeek[] = [
  {
    id: "2026-w09",
    week: "2026 · W09 (Feb 23 – Mar 01)",
    environment: "Demo",
    instrument: "Volatility 75 (1s) · Rise/Fall",
    trades: 142,
    netNaira: 6400,
    maxDrawdownPct: 8.4,
    notes: "Demo baseline. Cool-off triggered twice on Wednesday chop.",
  },
  {
    id: "2026-w10",
    week: "2026 · W10 (Mar 02 – Mar 08)",
    environment: "Demo",
    instrument: "Volatility 75 (1s) · Rise/Fall",
    trades: 118,
    netNaira: -4800,
    maxDrawdownPct: 14.2,
    notes: "Demo. Daily loss cap ($1.00) hit on Tuesday and Friday. Halted cleanly.",
  },
  {
    id: "2026-w11",
    week: "2026 · W11 (Mar 09 – Mar 15)",
    environment: "Demo",
    instrument: "Volatility 100 (1s) · Higher/Lower",
    trades: 164,
    netNaira: 9200,
    maxDrawdownPct: 7.1,
    notes: "Demo. Flat $0.35 stake throughout; zero 5-step ladder breaches.",
  },
  {
    id: "2026-w12",
    week: "2026 · W12 (Mar 16 – Mar 22)",
    environment: "Demo",
    instrument: "Volatility 75 (1s) · Rise/Fall",
    trades: 96,
    netNaira: -2150,
    maxDrawdownPct: 11.0,
    notes: "Demo. Session timer stopped execution at 60m during Thursday volatility spike.",
  },
];

export function formatNairaSigned(amount: number): string {
  const absFormatted = Math.abs(amount).toLocaleString("en-NG");
  if (amount > 0) return `+₦${absFormatted}`;
  if (amount < 0) return `-₦${absFormatted}`;
  return `₦0`;
}

export function getTrackRecordTotals(weeks: TrackRecordWeek[] = TRACK_RECORD_WEEKS) {
  const totalTrades = weeks.reduce((sum, w) => sum + w.trades, 0);
  const totalNetNaira = weeks.reduce((sum, w) => sum + w.netNaira, 0);
  const worstDrawdownPct = weeks.reduce(
    (max, w) => (w.maxDrawdownPct > max ? w.maxDrawdownPct : max),
    0
  );
  return {
    totalTrades,
    totalNetNaira,
    worstDrawdownPct,
  };
}
