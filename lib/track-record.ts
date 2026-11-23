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
    id: "2026-w44",
    week: "2026 · W44 (Oct 26 – Nov 01)",
    environment: "Demo",
    instrument: "Volatility 75 (1s) · Rise/Fall",
    trades: 142,
    netNaira: 6400,
    maxDrawdownPct: 8.4,
    notes: "Seed: Demo baseline. Cool-off triggered twice on Wednesday chop.",
  },
  {
    id: "2026-w45",
    week: "2026 · W45 (Nov 02 – Nov 08)",
    environment: "Demo",
    instrument: "Volatility 75 (1s) · Rise/Fall",
    trades: 118,
    netNaira: -4800,
    maxDrawdownPct: 14.2,
    notes: "Seed: Demo. Daily loss cap ($1.00) hit on Tuesday and Friday. Halted cleanly.",
  },
  {
    id: "2026-w46",
    week: "2026 · W46 (Nov 09 – Nov 15)",
    environment: "Demo",
    instrument: "Volatility 100 (1s) · Higher/Lower",
    trades: 164,
    netNaira: 9200,
    maxDrawdownPct: 7.1,
    notes: "Seed: Demo. Flat $0.35 stake throughout; zero 5-step ladder breaches.",
  },
  {
    id: "2026-w47",
    week: "2026 · W47 (Nov 16 – Nov 22)",
    environment: "Demo",
    instrument: "Volatility 75 (1s) · Rise/Fall",
    trades: 96,
    netNaira: -2150,
    maxDrawdownPct: 11.0,
    notes: "Seed: Demo. Session timer stopped execution at 60m during Thursday volatility spike.",
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
