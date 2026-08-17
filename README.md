# Paystack Payment Gateway

A full-stack payment gateway integration built with React, TypeScript, Node.js, Express, and Paystack.

This project demonstrates how a frontend application can securely communicate with a backend payment API, which then communicates with Paystack to initialize transactions.

## Features

* Paystack payment initialization
* Payment amount selection
* Customer email validation
* Secure server-side Paystack API communication
* Paystack checkout redirection
* REST API
* Swagger/OpenAPI documentation
* Postman API testing
* Environment variable configuration
* React + TypeScript frontend
* Express + TypeScript backend

## Architecture

The application follows a simple client-server architecture:

```text
Customer
   ↓
React Client
   ↓
Express Backend
   ↓
Paystack API
   ↓
Paystack Checkout
```

The frontend **never exposes the Paystack secret key**.

Instead, it sends the payment information to the backend:

```text
email + amount
      ↓
Backend
      ↓
Paystack
      ↓
authorization_url
      ↓
Frontend
      ↓
Paystack Checkout
```

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui

### Backend

* Node.js
* Express
* TypeScript
* dotenv
* CORS
* tsx

### Payment

* Paystack

### API Documentation

* OpenAPI
* Swagger UI

### API Testing

* Postman

## Project Structure

```text
paystack-payment-gateway/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   │   └── payment.ts
│   │   └── App.tsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── payment.controller.ts
│   │   │
│   │   ├── docs/
│   │   │   └── swagger.ts
│   │   │
│   │   ├── routes/
│   │   │   └── payment.routes.ts
│   │   │
│   │   ├── services/
│   │   │   └── paystack.service.ts
│   │   │
│   │   └── server.ts
│   │
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

You'll need:

* Node.js
* npm
* A Paystack account
* A Paystack test secret key

### Clone the Repository

```bash
git clone https://github.com/your-username/paystack-payment-gateway.git
cd paystack-payment-gateway
```

## Install Dependencies

Install the frontend dependencies:

```bash
cd client
npm install
```

Then install the backend dependencies:

```bash
cd ../server
npm install
```

## Environment Variables

Create a `.env` file inside the `server` directory:

```env
PAYSTACK_SECRET_KEY=your_paystack_test_secret_key
PORT=5000
```

The secret key should **never** be exposed to the frontend or committed to GitHub.

The `.gitignore` file is configured to ignore environment files.

## Running the Backend

Inside the `server` directory:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

## Running the Frontend

Inside the `client` directory:

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

## Payment Flow

The payment process works like this:

### 1. Customer selects an amount

For example:

```text
₦5,000
```

### 2. Customer enters their email

```text
customer@example.com
```

### 3. Frontend sends the payment request

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

### 4. Backend sends the request to Paystack

The backend converts the amount from naira to kobo:

```text
₦5,000 → 500,000 kobo
```

The Paystack secret key is used only on the backend.

### 5. Paystack returns an authorization URL

Example response:

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

### 6. Customer is redirected to Paystack

The frontend uses:

```text
authorization_url
```

to redirect the customer to Paystack's checkout page.

## API Documentation

Swagger UI is available while the backend is running:

```text
http://localhost:5000/api-docs
```

Swagger provides an interactive interface for viewing and testing the API.

## API Endpoints

### Initialize Payment

```http
POST /api/payments/initialize
```

#### Request

```json
{
  "email": "customer@example.com",
  "amount": 5000
}
```

#### Success Response

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

#### Missing Fields

```http
400 Bad Request
```

```json
{
  "message": "Email and amount are required"
}
```

#### Payment Initialization Error

```http
500 Internal Server Error
```

```json
{
  "message": "Unable to initialize payment"
}
```

## Testing With Postman

The API can be tested using Postman.

Create a request:

```text
POST http://localhost:5000/api/payments/initialize
```

Set the request body to **raw JSON**:

```json
{
  "email": "test@example.com",
  "amount": 5000
}
```

Set the header:

```text
Content-Type: application/json
```

A successful request should return a Paystack authorization URL.

## Security

The Paystack secret key is kept exclusively on the backend.

```text
Frontend
   ↓
Backend API
   ↓
Paystack Secret Key
   ↓
Paystack
```

Never put the secret key inside:

* React code
* Vite environment variables exposed to the browser
* GitHub
* Public repositories
* Client-side JavaScript

Use Paystack's test keys during development.

## Deployment

The project can be deployed as two services:

```text
Frontend → Static Site
Backend  → Web Service
```


The backend should store the Paystack secret key as a server-side environment variable.

## Future Improvements

* Payment verification
* Paystack webhooks
* Transaction database
* Transaction history
* Payment status tracking
* Refund handling
* Payment receipts
* User authentication
* Admin dashboard
* Transaction analytics
* Rate limiting
* Request validation
* Production CORS configuration
* Better error handling
* Production Paystack integration

## Project Status

This project currently implements the **Paystack payment initialization flow** from frontend to backend and from backend to Paystack.

The next stage is expanding it into a more complete payment system with transaction verification, webhooks, and persistent transaction records.

## License

MIT License
