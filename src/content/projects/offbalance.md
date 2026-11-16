---
title: 'OffBalance'
summary: 'A group expense splitter with flexible splits, invites and payments, built on Next.js and Supabase with row-level security.'
category: 'apps'
status: 'working'
year: 2026
stack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'PostgreSQL']
repo: 'https://github.com/TeleVision05/OffBalance'
repoPrivate: true
live: 'https://offbalance-taupe.vercel.app'
play: ''
featured: false
order: 1
---

## What it does

OffBalance splits group expenses, records payments and shows who owes whom, per group. Groups can have any number of members, including placeholders for people who have not joined yet. Admins can restrict who adds expenses, and a group can be set to settle through a single hub member.

## How it works

- Accounts use Supabase email and password auth. Data lives in Postgres with row-level security, so each user only sees their own groups' rows.
- An expense can be split equally, by exact amounts, by percentages, or as fixed amounts with the remainder split equally.
- Balances are computed from the expense and payment history, and a summary step works out a short list of payments that settles everyone.
- Members can be invited by email through Resend or by a shareable group link. A placeholder member is claimed when someone accepts an invite.
- Admin controls include an admins-only option for adding expenses, soft-deleting groups and cancelling invites.

## What's next

- The balance and split logic is checked by a manual assertion script, not an automated test suite.
