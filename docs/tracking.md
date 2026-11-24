# SoftPip Attribution & Tracking Protocol

## Overview

SoftPip operates as an educational affiliate funnel for Deriv (Deriv Services Ltd). The platform maintains a single primary partner tracking token:

- **Tracking Token:** `B9FG9YL4HJVF`
- **Canonical Referral URL:** `https://t.deriv.link?t=B9FG9YL4HJVF`

Every outgoing registration anchor across the website routes through this URL with standardized placement tags for internal attribution.

---

## Placement Taxonomy

To measure conversion efficiency and user drop-off across the 14-phase funnel, outbound links append query parameters:

| Placement ID | Location | Context |
| :--- | :--- | :--- |
| `hero` | Homepage Hero Section | Primary header CTA cluster |
| `autopsy_gate` | `/autopsy` | Unlocking gate and post-autopsy CTA |
| `curriculum_mod` | `/curriculum/[slug]` | End-of-module segregation and trial links |
| `bot_page` | `/bot` | Step 1 and bottom account segregation CTA |
| `calculator` | `/calculator` | Post-simulation $10 trial account link |
| `scaling_guide` | `/scaling` | Stage 1 $10 trial registration link |
| `footer` | Site Footer | Global secondary registration anchor |

Example tagged referral link:
```
https://t.deriv.link?t=B9FG9YL4HJVF&utm_source=softpip&utm_medium=web&utm_campaign=funnel&utm_content=calculator
```

---

## Compliance Requirements

In accordance with Deriv Affiliate Terms and International Advertising Standards:
1. Every affiliate anchor MUST declare `rel="sponsored noopener"` and `target="_blank"`.
2. Every page containing an affiliate link MUST render the standard `<AffiliateDisclosure />` component adjacent to the CTA cluster.
3. No guarantee of profit or false performance promises may be made in proximity to affiliate links.
