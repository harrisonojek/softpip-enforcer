# SoftPip Account Graduation Templates

This document outlines the strict graduation criteria and operational checklists required before moving capital between risk stages.

---

## Stage 1: Demo to $10 Trial Account Graduation

Before funding real capital ($10), you must complete **200 clean demo trades** in `journal.db`.

### Qualification Checklist

- [ ] Completed 200 trades on Volatility 75 / Volatility 10 in Deriv Virtual Account mode.
- [ ] Zero manual overrides or discretionary order submissions during bot sessions.
- [ ] Verified that 15-minute cool-off triggered upon 3 consecutive losses and reset stake back to $0.35.
- [ ] Exported `journal_export.csv` and confirmed zero contract stake exceeded $1.00.
- [ ] Successfully halted on session timer (60 minutes) or daily loss cap ($2.00 floor).

### Command to Verify Eligibility:

```bash
python -c "from journal import Journal; j = Journal('journal.db'); print(f'Clean demo trades: {j.count_clean_demo_trades()}/200')"
```

If the count is `< 200`, `main.py --live` will fail-closed and abort startup.

---

## Stage 2: $10 Trial to $30 Buffer

- [ ] Minimum 100 live trades logged on the $10 trial account.
- [ ] Survived at least two live 15-minute cool-offs without manual revenge trading.
- [ ] Account equity remains positive or within the $2.00 balance floor.
- [ ] Deposit $20 additional capital to reach $30 bankroll (dropping single trade risk to 1.17%).

---

## Stage 3: $30 Buffer to $50 Transition

- [ ] Bankroll reaches $50 through organic compounding or staged deposit.
- [ ] Base stake of $0.35 now represents only 0.70% of equity (sub-1% threshold reached).
- [ ] Complete **Full KYC Verification** on Deriv (National ID / Passport + Proof of Address) before advancing further.

---

## Stage 4: $100+ Institutional Scaling

- [ ] Deriv account is fully KYC-verified (Tier 2/3 verified status).
- [ ] Account equity reaches $100.00.
- [ ] Enable percent sizing mode in `config.yaml`:
  ```yaml
  risk:
    sizing_mode: "percent"
    stake_pct_of_equity: 0.01 # 1% dynamic risk per contract
  ```
- [ ] Full recovery ladder risk is now mathematically limited to 3.2% of account equity.
