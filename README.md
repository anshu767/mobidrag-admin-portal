# MobiDrag Admin Panel

Complete admin dashboard for managing applications, partners, deals, and payouts.

## Project Structure

```
mobidrag-admin/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── services/      # API services
│   │   ├── layouts/       # Layout components
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── main.css       # Global styles
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind configuration
│   ├── postcss.config.js  # PostCSS configuration
│   └── package.json       # Dependencies
│
└── server/                # Express backend
    ├── src/
    │   ├── config/        # Configuration files
    │   ├── models/        # MongoDB models
    │   ├── controllers/   # Route controllers
    │   ├── routes/        # API routes
    │   ├── middleware/    # Middlewares
    │   └── index.js       # Server entry point
    ├── .env.example       # Environment variables template
    └── package.json       # Dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud - MongoDB Atlas)

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from template:
```bash
cp .env.example .env
```

4. Update `.env` with your settings:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mobidrag-admin
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

5. Start the server:
```bash
npm run dev  # Development with nodemon
npm start    # Production
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Default Admin Account

For testing, use these credentials after creating the user in MongoDB:
- Email: `admin@mobidrag.com`
- Password: `admin123`

### Create Admin User (MongoDB)

```javascript
// Run in MongoDB CLI
db.users.insertOne({
  name: "Admin User",
  email: "admin@mobidrag.com",
  password: "hashed_password", // bcrypt hash of "admin123"
  role: "admin",
  tier: "enterprise",
  status: "active",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Applications
- `GET /api/admin/applications` - Get all applications
- `POST /api/admin/applications/:id/approve` - Approve application

### Partners
- `GET /api/admin/partners` - Get all partners

### Deals
- `GET /api/admin/deals` - Get all deals
- `PATCH /api/admin/deals/:id/stage` - Update deal stage

### Payouts
- `GET /api/admin/payouts` - Get all payouts

## Features

✅ Admin Authentication with JWT
✅ Application Management
✅ Partner Management
✅ Deal Tracking
✅ Commission/Payout Management
✅ Responsive Dashboard
✅ Role-based Access Control
✅ MongoDB Integration
✅ Error Handling
✅ Pagination Support

## Database Models

### User
- name, email, password, role, tier, status
- Password hashing with bcryptjs

### Application
- name, email, status (pending/approved/rejected)

### Partner
- name, email, status

### Deal
- brandName, partnerId, stage, amount
- Stages: negotiation, approved, active, completed, cancelled

### Commission
- dealId, partnerId, amount, status

## Technology Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Development Tips

### Adding New Pages
1. Create component in `client/src/pages/`
2. Add route in `App.jsx`
3. Add navigation link in `Sidebar.jsx`

### Adding New API Endpoints
1. Create model in `server/src/models/`
2. Create controller in `server/src/controllers/`
3. Create route in `server/src/routes/`
4. Import route in `server/src/index.js`

### Common Issues

**CORS Error**: Update `server/src/index.js` frontend URL
**MongoDB Connection**: Verify MONGO_URI in `.env`
**Token Invalid**: Clear localStorage and re-login

## License

MIT
