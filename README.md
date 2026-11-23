# SalonBook - Salon Appointment Booking Platform

SalonBook is a role-based salon appointment booking web application. Customers can browse salon services, request appointments and pay for confirmed appointments through Stripe. The salon administrator manages services, appointments, customers and payment transactions.

This repository contains the **client** (Next.js). The API lives in the server repository.

## Live Website

- Live site: https://salonbook-client-liard.vercel.app

## Repositories

- Client: https://github.com/taniatajin/salonbook-client
- Server: https://github.com/taniatajin/salonbook-server

## Demo Credentials (for evaluation)

Use these accounts on the live site. Both use email and password login.

| Role | Email | Password |
|---|---|---|
| Admin | admin@salonbook.com | Admin123 |
| Customer | tajin@gmail.com | Tajin123 |

The admin account opens the Admin Dashboard (services, appointments, users and transactions). The customer account opens the Customer Dashboard.

## Important Features

**Customer**
- Browse active salon services, search by name, filter by category and sort by price
- View service details and submit appointment requests with a date, time slot and message
- View appointment status, cancel pending requests and pay for confirmed appointments with Stripe Checkout
- View appointment and payment history
- Customer dashboard with appointment statistics and profile management

**Admin**
- Add, update, delete, activate and deactivate services with image upload (ImgBB)
- View all appointment requests, confirm pending ones and cancel pending or confirmed ones
- View registered customers and block or unblock them
- View payment transactions (read-only)
- Admin dashboard with overview statistics

**Security**
- Better Auth with email/password and Google login
- Role-based route protection on the client and role verification on every protected API
- Blocked users cannot access protected features or sign in
- Payment status is updated only by a verified Stripe webhook event
- All secrets are stored in environment variables

## Technology Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS, React Icons, React Hot Toast
- Better Auth (MongoDB adapter, JWT plugin)
- MongoDB
- Stripe Checkout (server side), ImgBB image hosting

## Installation

```bash
git clone https://github.com/taniatajin/salonbook-client.git
cd salonbook-client
npm install
```

## Environment Variables

Create a `.env.local` file in the project root. Names only, never commit real values:

```
MONGODB_URI=
DB_NAME=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_API_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
IMGBB_API_KEY=
```

- `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` are the URL of this client (for example `http://localhost:3000`).
- `NEXT_PUBLIC_API_URL` is the URL of the Express server (for example `http://localhost:5000`).
- For Google login add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.

## Run Locally

The server must be running first (see the server repository).

```bash
npm run dev
```

Open http://localhost:3000.

## Create an Admin Account

Admin accounts cannot be created through public registration. Every new account is created with the `customer` role. An administrator is assigned securely by editing the account directly in the database:

1. Sign up normally on the site.
2. Open the `user` collection in MongoDB (for example in MongoDB Atlas) and change the account's `role` field from `customer` to `admin`.
3. Sign out and sign in again for the new role to apply.

The role and blocked status cannot be changed through profile updates or any public API.

## Test Payments

Stripe runs in test mode. Use card number `4242 4242 4242 4242`, any future expiry date and any 3 digit CVC.

## Scripts

- `npm run dev` start the development server
- `npm run build` create a production build
- `npm run start` start the production server