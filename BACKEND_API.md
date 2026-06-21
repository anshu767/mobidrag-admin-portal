# MobiDrag Admin Panel - Backend API Documentation

## Overview
Complete Express.js backend for partner program management with JWT authentication, MongoDB integration, and admin-only routes.

---

## 📁 Folder Structure

```
server/
├── src/
│   ├── config/
│   │   ├── database.js        # MongoDB connection
│   │   └── jwt.js             # JWT token handling
│   │
│   ├── models/
│   │   ├── User.js            # Admin & Partner users
│   │   ├── Application.js     # Partner applications
│   │   ├── Deal.js            # Brand deals
│   │   └── Commission.js      # Partner commissions
│   │
│   ├── controllers/
│   │   ├── authController.js      # Login
│   │   ├── applicationController.js # App approve/reject + create partner
│   │   ├── partnerController.js    # Partner management
│   │   ├── dealController.js       # Deal stage updates + auto-commission
│   │   └── commissionController.js # Payout management
│   │
│   ├── routes/
│   │   ├── authRoutes.js      # Public routes
│   │   └── adminRoutes.js     # Protected admin routes
│   │
│   ├── middleware/
│   │   ├── auth.js            # JWT verification + admin check
│   │   └── errorHandler.js    # Error handling
│   │
│   └── index.js               # Express app
│
├── .env                       # Environment variables
├── .env.example              # Template
├── .gitignore
├── package.json
└── seed.js                   # Database seeding
```

---

## 🔑 Core Concepts

### Users (Role-Based)
- **Admin**: Full access to admin APIs
- **Partner**: Can view own deals and commissions

### Partner Application Flow
1. **Pending** → Admin reviews
2. **Approve** → Auto-creates partner User with default password
3. **Reject** → Application rejected

### Deal Stages
- **contacted** - Initial contact
- **demo** - Demo phase
- **negotiating** - Negotiation ongoing
- **won** - ✅ Deal closed (AUTO-creates 10% commission)
- **lost** - ❌ Rejected (requires loss reason)

---

## 🔐 Authentication

### Login
```bash
POST /api/auth/login
Body: { email, password }
Response: { token, user: { id, name, email, role, tier } }
```

### Token Usage
Every protected request needs:
```
Authorization: Bearer <jwt_token>
```

### Middleware
- `protect` - Verifies JWT token
- `adminOnly` - Ensures admin role (applied to all /api/admin/* routes)

---

## 📊 Database Models

### User
```javascript
{
  name: String,           // Required
  email: String,          // Unique, required
  password: String,       // Hashed, required
  role: 'admin' | 'partner',
  tier: 'silver' | 'gold' | 'platinum',
  status: 'active' | 'suspended',
  createdAt: Date,
  updatedAt: Date
}
```

### Application
```javascript
{
  name: String,           // Required
  email: String,          // Unique, required
  status: 'pending' | 'approved' | 'rejected',
  createdAt: Date,
  updatedAt: Date
}
```

### Deal
```javascript
{
  brandName: String,      // Required
  partnerId: ObjectId,    // Reference to User
  stage: 'contacted' | 'demo' | 'negotiating' | 'won' | 'lost',
  amount: Number,         // Required, min 0
  lossReason: String,     // Only if stage = 'lost'
  createdAt: Date,
  updatedAt: Date
}
```

### Commission
```javascript
{
  dealId: ObjectId,       // Reference to Deal
  partnerId: ObjectId,    // Reference to User
  amount: Number,         // Required
  status: 'pending' | 'paid',
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### Authentication (Public)

#### Login
```bash
POST /api/auth/login
Body: {
  email: "admin@mobidrag.com",
  password: "admin123"
}
Response: {
  success: true,
  token: "eyJhbGc...",
  user: {
    id: "507f...",
    name: "Admin",
    email: "admin@mobidrag.com",
    role: "admin",
    tier: "platinum"
  }
}
```

---

### Applications (Admin Only)

#### Get All Applications
```bash
GET /api/admin/applications?status=pending&page=1&limit=10
Response: {
  success: true,
  data: [...],
  pagination: { page, limit, total, pages }
}
```

#### Approve Application
```bash
POST /api/admin/applications/:id/approve
Response: {
  success: true,
  message: "Application approved & partner account created",
  data: {
    partnerId: "507f...",
    name: "...",
    email: "...",
    tier: "silver"
  }
}
```

**IMPORTANT LOGIC**: 
- Creates new User with role='partner', tier='silver', status='active'
- Default password: 'ChangeMe@123'
- Updates Application status to 'approved'

#### Reject Application
```bash
POST /api/admin/applications/:id/reject
Response: {
  success: true,
  message: "Application rejected",
  data: { ... }
}
```

---

### Partners (Admin Only)

#### Get All Partners
```bash
GET /api/admin/partners?status=active&page=1&limit=10&search=tech
Response: {
  success: true,
  data: [ { id, name, email, role, tier, status, createdAt } ... ],
  pagination: { page, limit, total, pages }
}
```

#### Update Partner
```bash
PATCH /api/admin/partners/:id
Body: {
  tier: "gold",          // Optional: 'silver' | 'gold' | 'platinum'
  status: "suspended"    // Optional: 'active' | 'suspended'
}
Response: {
  success: true,
  message: "Partner updated successfully",
  data: { ... }
}
```

---

### Deals (Admin Only)

#### Get All Deals
```bash
GET /api/admin/deals?stage=won&page=1&limit=10&sort=-createdAt
Response: {
  success: true,
  data: [
    {
      id: "...",
      brandName: "Nike",
      partnerId: { name, email, tier },
      stage: "won",
      amount: 50000,
      createdAt: "..."
    },
    ...
  ],
  pagination: { page, limit, total, pages }
}
```

#### Update Deal Stage
```bash
PATCH /api/admin/deals/:id/stage
Body: {
  stage: "won",           // Required: 'contacted' | 'demo' | 'negotiating' | 'won' | 'lost'
  lossReason: "..."       // Required if stage = 'lost'
}
Response: {
  success: true,
  message: "Deal marked as won & commission created automatically",
  data: {
    deal: { ... },
    commission: {
      id: "...",
      amount: 5000,       // 10% of deal amount
      status: "pending"
    }
  }
}
```

**IMPORTANT LOGIC**:
- When stage = **"won"** → Auto-creates Commission with amount = 10% of deal amount
- When stage = **"lost"** → Stores lossReason

---

### Payouts (Admin Only)

#### Get Pending Payouts
```bash
GET /api/admin/payouts?status=pending&page=1&limit=10
Response: {
  success: true,
  data: [
    {
      id: "...",
      dealId: { brandName, amount },
      partnerId: { name, email, tier },
      amount: 5000,
      status: "pending",
      createdAt: "..."
    },
    ...
  ],
  totalAmount: 15000,
  pagination: { page, limit, total, pages }
}
```

#### Mark Commissions as Paid
```bash
POST /api/admin/payouts/pay
Body: {
  commissionIds: ["507f1...", "507f2...", ...]  // Array of commission IDs
}
Response: {
  success: true,
  message: "3 commission(s) marked as paid",
  data: {
    count: 3,
    amount: 15000,
    commissions: [ ... ]
  }
}
```

**IMPORTANT LOGIC**:
- Updates Commission status from 'pending' to 'paid'
- Can mark multiple commissions at once

---

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Create .env File
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mobidrag-admin
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### 3. Seed Database
```bash
npm run seed
```

Creates:
- 1 Admin user (admin@mobidrag.com / admin123)
- 3 Partner users
- 2 pending applications
- 4 deals (various stages)
- 2 commissions

### 4. Start Server
```bash
npm run dev    # Development (with nodemon)
npm start      # Production
```

Server runs on `http://localhost:5000`

---

## 🧪 Testing API

### Using cURL

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mobidrag.com","password":"admin123"}'
```

#### Get Applications (requires token)
```bash
curl -X GET http://localhost:5000/api/admin/applications \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman
1. POST /api/auth/login (get token)
2. Copy token to Authorization header: `Bearer {token}`
3. Use in all admin endpoints

---

## 🔄 Important Logic Flow

### Deal Won → Auto Commission
```
1. Admin updates deal stage to "won"
2. Backend calculates commission (10% of deal amount)
3. Commission document created with status="pending"
4. Response includes commission details
```

### Deal Lost → Store Reason
```
1. Admin updates deal stage to "lost"
2. Admin provides lossReason in request
3. Deal updated with stage="lost" and lossReason stored
4. No commission created for lost deals
```

### Application Approved → Create Partner
```
1. Admin approves application
2. New User created with:
   - role = "partner"
   - tier = "silver"
   - status = "active"
   - password = "ChangeMe@123" (default)
3. Application status updated to "approved"
4. Response includes partnerId and details
```

### Payout → Mark Commissions Paid
```
1. Admin selects multiple pending commissions
2. POST /api/admin/payouts/pay with commissionIds
3. All commissions updated from "pending" to "paid"
4. Response shows paid count and amount
```

---

## 🛡️ Security Features

✅ JWT token-based authentication
✅ Password hashing with bcryptjs (10 salt rounds)
✅ Admin-only route protection via middleware
✅ Input validation on all endpoints
✅ Error handling with consistent response format
✅ CORS enabled for frontend communication
✅ Environment variables for sensitive data

---

## 📝 Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Status Codes
- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized (invalid token)
- **403** - Forbidden (not admin)
- **404** - Not Found
- **500** - Server Error

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB Connection Failed | Check MONGO_URI and ensure MongoDB is running |
| Invalid Token | Re-login and get new token |
| Admin Only Error | Ensure logged-in user has role='admin' |
| CORS Error | Update FRONTEND_URL in server .env |
| Port Already in Use | Change PORT in .env or kill existing process |

---

## 📚 Code Examples

### Update Deal to Won Status
```bash
PATCH /api/admin/deals/507f1f77bcf86cd799439011/stage
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "stage": "won"
}
```

Response:
```json
{
  "success": true,
  "message": "Deal marked as won & commission created automatically",
  "data": {
    "deal": {
      "id": "507f1...",
      "brandName": "Nike",
      "stage": "won",
      "amount": 50000
    },
    "commission": {
      "id": "507f2...",
      "amount": 5000,
      "status": "pending"
    }
  }
}
```

### Update Deal to Lost Status
```bash
PATCH /api/admin/deals/507f1f77bcf86cd799439011/stage
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "stage": "lost",
  "lossReason": "Client budget exceeded allocated amount"
}
```

---

## 🎯 Next Steps

1. Start backend: `npm run dev`
2. Test endpoints with Postman or cURL
3. Connect frontend via API proxy
4. Run integration tests
5. Deploy to production

---

**Happy Coding! 🚀**
npm run dev
