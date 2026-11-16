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

Craving Snacks is a small web store for browsing snacks. The deployed site has home, search, cart and account pages. You can register and log in, and the front end talks to a separate API. It is a working prototype, and I have not checked how far the cart and ordering flow goes.

## How it works

- The front end is a React single-page app using React Router for its pages and axios for API calls.
- The back end is an Express server with a MySQL connection pool, with routes for registering, logging in, reading the current user and listing products.
- Passwords are hashed with bcrypt, and logging in returns a signed JSON Web Token that expires after one hour. Protected routes check that token.
- Both halves deploy to Vercel.
