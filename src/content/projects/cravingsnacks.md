---
title: 'Craving Snacks'
summary: 'A small snack store web app with a React front end, an Express API, MySQL, and password and token based accounts.'
category: 'apps'
status: 'working'
year: 2025
stack: ['React', 'Node.js', 'Express', 'MySQL', 'JWT']
repo: 'https://github.com/TeleVision05/CravingSnacks'
repoPrivate: true
live: 'https://cravingsnacks.com'
play: ''
featured: false
order: 2
---

## What it does

Craving Snacks is a small web store for browsing snacks. The deployed site greets you with "Discover our delicious snacks and find your favorites!" and has home, search, cart and account pages. You can register and log in, and the front end talks to a separate API.

## How it works

- The front end is a React single-page app using React Router for its pages and axios for API calls.
- The back end is an Express server with a MySQL connection pool, with routes for registering, logging in, reading the current user and listing products.
- Passwords are hashed with bcrypt, and logging in returns a signed JSON Web Token that expires after one hour.
- Protected routes check that token before returning user data.
- Both halves deploy to Vercel, with a config file in each of the front end and back end folders.

## What's next

- The repository has no README, so setup and scope are undocumented. Writing one is the first step.
- The back end has a leftover duplicate of its main file and no visible automated tests.
- I have not checked how far the cart and ordering flow goes, so treat it as a working prototype.
