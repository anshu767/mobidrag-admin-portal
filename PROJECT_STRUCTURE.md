```
mobidrag-admin/
│
├── server/                                 # Backend - Express + MongoDB
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js                # MongoDB connection
│   │   │   └── jwt.js                     # JWT token handling
│   │   │
│   │   ├── models/
│   │   │   ├── User.js                    # Admin user schema
│   │   │   ├── Partner.js                 # Partner schema
│   │   │   ├── Application.js             # Application schema
│   │   │   ├── Deal.js                    # Deal schema
│   │   │   └── Commission.js              # Commission schema
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js          # Login logic
│   │   │   ├── applicationController.js   # App management
│   │   │   ├── partnerController.js       # Partner retrieval
│   │   │   ├── dealController.js          # Deal management
│   │   │   └── commissionController.js    # Payout retrieval
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js              # Auth endpoints
│   │   │   └── adminRoutes.js             # Admin endpoints (protected)
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js                    # JWT verification
│   │   │   └── errorHandler.js            # Error handling
│   │   │
│   │   └── index.js                       # Express server
│   │
│   ├── .env                               # Environment variables (local)
│   ├── .env.example                       # Template
│   ├── .gitignore                         # Git ignore rules
│   ├── package.json                       # Dependencies
│   ├── seed.js                            # Database seeding
│   └── README.md                          # Backend docs
│
├── client/                                # Frontend - React + Vite
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx                  # Admin login page
│   │   │   ├── Dashboard.jsx              # Main dashboard
│   │   │   ├── Applications.jsx           # App management page
│   │   │   ├── Partners.jsx               # Partners list
│   │   │   ├── Deals.jsx                  # Deals management
│   │   │   └── Payouts.jsx                # Payouts page
│   │   │
│   │   ├── components/
│   │   │   ├── Table.jsx                  # Data table component
│   │   │   ├── Card.jsx                   # Stats card
│   │   │   ├── Badge.jsx                  # Status badge
│   │   │   ├── Modal.jsx                  # Dialog component
│   │   │   └── ProtectedRoute.jsx         # Route protection
│   │   │
│   │   ├── services/
│   │   │   ├── api.js                     # Axios configuration
│   │   │   ├── authService.js             # Auth API calls
│   │   │   └── adminService.js            # Admin API calls
│   │   │
│   │   ├── layouts/
│   │   │   ├── Sidebar.jsx                # Navigation sidebar
│   │   │   ├── Topbar.jsx                 # Top header
│   │   │   └── MainLayout.jsx             # Main layout wrapper
│   │   │
│   │   ├── App.jsx                        # Route setup & structure
│   │   ├── main.jsx                       # React entry point
│   │   └── main.css                       # Global styles & Tailwind
│   │
│   ├── index.html                         # HTML template
│   ├── vite.config.js                     # Vite configuration
│   ├── tailwind.config.js                 # Tailwind configuration
│   ├── postcss.config.js                  # PostCSS setup
│   ├── .gitignore                         # Git ignore rules
│   ├── package.json                       # Dependencies
│   └── README.md                          # Frontend docs
│
├── README.md                              # Main documentation
└── QUICKSTART.md                          # Setup guide


DATA FLOW:

1. LOGIN PAGE (client/src/pages/Login.jsx)
   ↓
2. authService.authLogin() → API: POST /api/auth/login
   ↓
3. Backend (authController.js) → User.comparePassword()
   ↓
4. Returns JWT token + user info
   ↓
5. localStorage.setItem('token', token)
   ↓
6. Navigate to Dashboard
   ↓
7. Protected routes check token via ProtectedRoute component
   ↓
8. If no token → redirect to login
   ↓
9. Dashboard loads data via adminService functions
   ↓
10. api.js interceptor adds Authorization header with token
    ↓
11. Backend middleware (auth.js) verifies token
    ↓
12. Controllers fetch data from MongoDB
    ↓
13. Response with data → Components render in UI


API RESPONSES:

✅ Success Response
{
  "success": true,
  "message": "Operation successful",
  "data": [...],
  "pagination": { "page": 1, "limit": 10, "total": 50, "pages": 5 }
}

❌ Error Response
{
  "success": false,
  "message": "Error description"
}

🔐 Auth Response
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f...",
    "name": "Admin",
    "email": "admin@mobidrag.com",
    "role": "admin",
    "tier": "enterprise"
  }
}


COMPONENT HIERARCHY:

App (Router)
├── Login (public)
└── MainLayout (protected routes)
    ├── Sidebar
    │   └── Links (Dashboard, Applications, Partners, Deals, Payouts)
    ├── Topbar
    │   └── User info + Logout
    └── Routes
        ├── Dashboard
        │   └── Card x4 (stats)
        ├── Applications
        │   └── Table + Modal
        ├── Partners
        │   └── Table
        ├── Deals
        │   └── Table + Modal
        └── Payouts
            └── Table


REUSABLE COMPONENTS:

1. Table.jsx
   - Columns config
   - Pagination
   - Loading state
   - Custom render functions

2. Card.jsx
   - Title, value, icon
   - Color variants (primary, success, warning, danger)

3. Badge.jsx
   - Status labels
   - Auto-variant detection
   - Customizable colors

4. Modal.jsx
   - Header, body, footer
   - Backdrop click to close
   - Custom actions

5. ProtectedRoute.jsx
   - Checks localStorage token
   - Redirects if not authenticated
```
