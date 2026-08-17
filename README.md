# Paystack Payment Gateway

A simple full-stack payment gateway built with **React, TypeScript, Node.js, Express, and Paystack**.

The project demonstrates how a frontend can communicate with a backend to initialize Paystack payments and redirect users to checkout.

## Stack

* React + TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* Node.js
* Express
* Paystack
* Swagger
* Postman

## How It Works

```text
┌─────────────┐
│    Client   │
│ React/TS    │
└──────┬──────┘
       │
       │ Payment Request
       ▼
┌─────────────┐
│   Server    │
│ Express/TS  │
└──────┬──────┘
       │
       │ Initialize Transaction
       ▼
┌─────────────┐
│  Paystack   │
└──────┬──────┘
       │
       │ Authorization URL
       ▼
┌─────────────┐
│  Checkout   │
└─────────────┘
```

## Project Structure

```text
paystack-payment-gateway/
│
├── client/
│   └── React frontend
│
├── server/
│   └── Express API
│
└── README.md
```

## API

### Initialize Payment

```http
POST /api/payments/initialize
```

Request:

```json
{
  "email": "customer@example.com",
  "amount": 5000
}
```

Response:

```json
{
  "status": true,
  "message": "Authorization URL created",
  "data": {
    "authorization_url": "https://checkout.paystack.com/...",
    "access_code": "...",
    "reference": "..."
  }
}
```

## API Documentation

Swagger is available at:

```text
http://localhost:5000/api-docs
```

## Payment Flow

```text
Customer
   │
   ▼
Select Amount
   │
   ▼
Enter Email
   │
   ▼
Click Pay
   │
   ▼
Backend initializes payment
   │
   ▼
Paystack Checkout
```

## Running Locally

Start the server:

```bash
cd server
npm run dev
```

Start the client:

```bash
cd client
npm run dev
```

## Status

Currently supports **Paystack payment initialization and checkout redirection**.

More payment features can be added later, such as transaction verification and webhooks.

## License

MIT
