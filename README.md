# Node.js Transactions API

A simple REST API built with Node.js ecosystem technologies for learning purposes. This project implements a transaction management system where users can create, list, and view their financial transactions.

## 🚀 Technologies Used

This project was built to explore various technologies from the Node.js ecosystem:

### Core Technologies

- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Fastify](https://fastify.dev/)** - Fast and efficient web framework

### Database & Migrations

- **[Knex.js](https://knexjs.org/)** - SQL query builder and migration tool
- **[SQLite3](https://www.sqlite.org/)** - Lightweight database for development

### Validation & Utilities

- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[dotenv](https://github.com/motdotla/dotenv)** - Environment variable management
- **[@fastify/cookie](https://github.com/fastify/fastify-cookie)** - Cookie handling

### Development Tools

- **[tsx](https://github.com/esbuild-kit/tsx)** - TypeScript execution with hot reload
- **[tsup](https://tsup.egoist.dev/)** - TypeScript bundler
- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[Supertest](https://github.com/ladjs/supertest)** - HTTP assertion testing
- **[ESLint](https://eslint.org/)** - Code linting

## 📋 Features

### Functional Requirements

- ✅ Users can create new transactions
- ✅ Users can get an account summary
- ✅ Users can list all their transactions
- ✅ Users can view details of a specific transaction

### Business Rules

- Transactions can be either credit or debit type
- Users are identified through session cookies
- Users can only view transactions they created
- Credit transactions add to the balance, debit transactions subtract

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd api-nodejs
```

2. Install dependencies:

```bash
npm install
```

3. Run database migrations:

```bash
npm run knex migrate:latest
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

The server will start with hot reload enabled.

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## 📖 API Endpoints

### Create Transaction

```http
POST /transactions
Content-Type: application/json

{
  "title": "Transaction title",
  "amount": 1000,
  "type": "credit" | "debit"
}
```

### List All Transactions

```http
GET /transactions
```

### Get Transaction Summary

```http
GET /transactions/summary
```

### Get Specific Transaction

```http
GET /transactions/:id
```

## 🗄️ Database Schema

The application uses SQLite with the following table structure:

### Transactions Table

- `id` - UUID (Primary Key)
- `title` - String
- `amount` - Number (positive for credit, negative for debit)
- `session_id` - UUID (for user identification)
- `created_at` - Timestamp

## 🧪 Testing

The project includes comprehensive tests using Vitest and Supertest:

- Transaction creation
- Transaction listing
- Specific transaction retrieval
- Account summary calculation
- Session-based user isolation

Run tests with:

```bash
npm test
```

## 📁 Project Structure

```
├── db/                          # Database files
│   ├── app.db                   # Main database
│   ├── test.db                  # Test database
│   └── migrations/              # Database migrations
├── src/
│   ├── app.ts                   # Fastify application setup
│   ├── server.ts                # Server entry point
│   ├── database.ts              # Database configuration
│   ├── @types/                  # TypeScript type definitions
│   ├── env/                     # Environment configuration
│   ├── middleware/              # Custom middleware
│   └── routes/                  # API routes
├── test/                        # Test files
├── knexfile.ts                  # Knex configuration
├── package.json                 # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## 🎯 Learning Outcomes

This project helped me learn:

- Building REST APIs with Fastify
- Database migrations and query building with Knex.js
- TypeScript integration in Node.js projects
- Schema validation with Zod
- Session management with cookies
- Testing HTTP APIs with Vitest and Supertest
- Project structure and tooling in modern Node.js applications
