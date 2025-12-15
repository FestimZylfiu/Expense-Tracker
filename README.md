# 💰 Expense Tracker

A full-stack expense tracking application built with GraphQL, React, TypeScript, and MongoDB.

## 🚀 Features

- **User Authentication**: Secure signup/login with session management
- **Transaction Management**: Create, read, update, and delete transactions
- **Category Statistics**: Visualize spending by category
- **Profile Pictures**: Automatic avatar generation based on gender
- **Responsive Design**: Built with Tailwind CSS and Framer Motion
- **Type Safety**: Full TypeScript support on the frontend

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express
- **Apollo Server** (GraphQL)
- **MongoDB** with Mongoose
- **Passport.js** for authentication
- **bcryptjs** for password hashing
- **express-session** for session management

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing fast development
- **Apollo Client** for GraphQL queries
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Chart.js** for data visualization
- **Framer Motion** for animations

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Backend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```env
   MONGO_URI=mongodb://localhost:27017/expense-tracker
   SESSION_SECRET=your-super-secret-key-change-this
   NODE_ENV=development
   ```

3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   The GraphQL server will run on `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables (optional):**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` if needed:
   ```env
   VITE_NODE_ENV=development
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The React app will run on `http://localhost:3000`

## 🎯 Usage

1. **Sign Up**: Create a new account with username, name, password, and gender
2. **Login**: Access your account with credentials
3. **Add Transactions**: Record expenses, savings, or investments
4. **View Statistics**: See spending breakdown by category
5. **Manage Transactions**: Edit or delete existing transactions

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── db/              # Database connection
│   ├── models/          # Mongoose schemas
│   ├── resolvers/       # GraphQL resolvers
│   ├── typeDefs/        # GraphQL type definitions
│   ├── passport/        # Authentication config
│   └── index.js         # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── graphql/     # GraphQL queries/mutations
│   │   ├── types/       # TypeScript types
│   │   └── utils/       # Utility functions
│   └── public/          # Static assets
└── package.json         # Root package file
```

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint



Your Name

---

**Built with ❤️ using GraphQL and React**
