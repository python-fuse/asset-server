# Asset Management System API

A comprehensive asset management system built with Node.js, Express, TypeScript, and Prisma.

## 🚀 Features

- User Management with role-based access control
- Asset lifecycle tracking and management
- Category organization system
- Movement tracking and audit logs
- File upload for asset images
- Session-based authentication

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: SQLite with Prisma ORM
- **Authentication**: Express-session
- **Security**: Helmet, CORS, bcrypt

## ⚡ Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Setup database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

4. **Start server**
   ```bash
   npm run dev
   ```

Server runs on `http://localhost:5000`

## 🔐 Test Credentials

- **Admin**: `admin@company.com` / `password123`
- **Asset Manager**: `manager@company.com` / `password123`
- **Auditor**: `auditor@company.com` / `password123`

## 📚 API Documentation

See `API_DOCS.txt` for complete API reference.

**Base URL**: `http://localhost:5000/api`

## 🚀 Available Scripts

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:seed      # Seed database
```

## 📁 Project Structure

```
src/
├── controllers/     # Route handlers
├── services/        # Business logic
├── routes/          # API routes
├── middleware/      # Custom middleware
├── validators/      # Input validation
└── utils/           # Utilities
```
