## Quick Start Guide

### ⚡ Quick Setup (5 minutes)

#### 1. Backend Setup
```bash
cd server
npm install
npm run seed  # Create initial data (admin user + test data)
npm run dev   # Start server on http://localhost:5000
```

#### 2. Frontend Setup
```bash
cd client
npm install
npm run dev   # Start app on http://localhost:5173
```

#### 3. Login
- Email: `admin@mobidrag.com`
- Password: `admin123`

---

### 📁 Project Structure

```
mobidrag-admin/
├── server/                 
│   ├── src/
│   │   ├── config/        # Database & JWT config
│   │   ├── models/        # MongoDB schemas
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Auth & error handling
│   │   └── index.js       # Express app
│   ├── seed.js            # Database seeding
│   ├── package.json       
│   └── .env              
│
└── client/                
    ├── src/
    │   ├── pages/         # Dashboard, Applications, Partners, Deals, Payouts
    │   ├── components/    # Table, Card, Badge, Modal, ProtectedRoute
    │   ├── services/      # API calls (auth, admin)
    │   ├── layouts/       # Sidebar, Topbar, MainLayout
    │   ├── App.jsx        # Routing
    │   └── main.jsx       # React entry
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

### 🔑 Key Features

✅ **JWT Authentication** - Secure admin login with token expiration
✅ **Dashboard** - Statistics overview
✅ **Applications Management** - Review and approve partner applications
✅ **Partners List** - View all active partners
✅ **Deals Tracking** - Manage brand partnerships with stage updates
✅ **Commission Payouts** - Track partner payments
✅ **Responsive Design** - Mobile-friendly Tailwind CSS
✅ **Error Handling** - Global error middleware
✅ **Pagination** - Efficient data loading
✅ **API Integration** - Axios with interceptors

---

### 📚 File Explanations

#### Backend Files

| File | Purpose |
|------|---------|
| `config/database.js` | MongoDB connection setup |
| `config/jwt.js` | JWT token generation & verification |
| `models/User.js` | Admin user schema with password hashing |
| `models/Partner.js` | Partner information schema |
| `models/Application.js` | Partner application schema |
| `models/Deal.js` | Brand deal tracking schema |
| `models/Commission.js` | Commission/payout schema |
| `middleware/auth.js` | JWT verification middleware |
| `middleware/errorHandler.js` | Global error handling |
| `controllers/authController.js` | Login logic |
| `controllers/applicationController.js` | Application management |
| `controllers/partnerController.js` | Partner retrieval |
| `controllers/dealController.js` | Deal management |
| `controllers/commissionController.js` | Payout retrieval |
| `routes/authRoutes.js` | Auth endpoints |
| `routes/adminRoutes.js` | Protected admin endpoints |
| `index.js` | Express server initialization |

#### Frontend Files

| File | Purpose |
|------|---------|
| `services/api.js` | Axios instance with interceptors |
| `services/authService.js` | Login, token, user management |
| `services/adminService.js` | All admin API calls |
| `layouts/Sidebar.jsx` | Navigation menu |
| `layouts/Topbar.jsx` | User info & header |
| `layouts/MainLayout.jsx` | Layout wrapper |
| `components/Table.jsx` | Reusable data table |
| `components/Card.jsx` | Statistics card |
| `components/Badge.jsx` | Status badge |
| `components/Modal.jsx` | Dialog/confirmation |
| `components/ProtectedRoute.jsx` | Route protection |
| `pages/Login.jsx` | Admin login page |
| `pages/Dashboard.jsx` | Main dashboard |
| `pages/Applications.jsx` | Application management |
| `pages/Partners.jsx` | Partner listing |
| `pages/Deals.jsx` | Deal management |
| `pages/Payouts.jsx` | Commission tracking |
| `App.jsx` | Route setup |
| `main.jsx` | React entry point |
| `main.css` | Global styles & Tailwind |

---

### 🔌 API Endpoints

```
POST   /api/auth/login                          - Admin login
GET    /api/admin/applications                   - Get applications
POST   /api/admin/applications/:id/approve      - Approve application
GET    /api/admin/partners                       - Get partners
GET    /api/admin/deals                          - Get deals
PATCH  /api/admin/deals/:id/stage                - Update deal stage
GET    /api/admin/payouts                        - Get payouts
```

---

### 🔐 Authentication Flow

1. **Login** → POST `/api/auth/login` with email & password
2. **Receive Token** → JWT token returned from backend
3. **Store Token** → Saved in localStorage
4. **Send with Requests** → Axios interceptor adds `Authorization: Bearer <token>`
5. **Verify Token** → Backend middleware checks validity
6. **Auto Logout** → If token expires, redirect to login

---

### 📝 Database Setup

#### Option 1: Local MongoDB
```bash
# Windows
mongod

# Mac/Linux
brew services start mongodb-community
```

#### Option 2: MongoDB Atlas (Cloud)
Update `MONGO_URI` in `.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mobidrag-admin
```

#### Initialize Data
```bash
npm run seed
```

---

### 🎨 Customization

#### Add New API Endpoint

1. **Create Model** (if needed)
```javascript
// server/src/models/NewModel.js
const schema = new mongoose.Schema({...});
export default mongoose.model('NewModel', schema);
```

2. **Create Controller**
```javascript
// server/src/controllers/newController.js
export const getData = async (req, res) => {
  const data = await NewModel.find();
  res.json({ success: true, data });
};
```

3. **Create Route**
```javascript
// server/src/routes/newRoutes.js
router.get('/new', getData);
```

4. **Register Route**
```javascript
// server/src/index.js
import newRoutes from './routes/newRoutes.js';
app.use('/api/new', newRoutes);
```

5. **Create Service** (Frontend)
```javascript
// client/src/services/newService.js
export const getData = async () => {
  const response = await api.get('/new');
  return response.data;
};
```

6. **Use in Component**
```javascript
// client/src/pages/NewPage.jsx
const [data, setData] = useState([]);
useEffect(() => {
  getData().then(res => setData(res.data));
}, []);
```

---

### 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS Error | Update `FRONTEND_URL` in server `.env` |
| MongoDB Connection Failed | Check `MONGO_URI` and ensure MongoDB is running |
| Token Invalid | Clear localStorage, re-login |
| Port Already in Use | Change `PORT` in `.env` or kill process using port |
| Vite Proxy Error | Ensure backend is running on `http://localhost:5000` |

---

### 📦 Dependencies

**Backend**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT handling
- `bcryptjs` - Password hashing
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

**Frontend**
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `tailwindcss` - Styling

---

### 🚀 Deployment

#### Deploy Backend (Heroku)
1. Remove `.env` from `.gitignore`
2. Set environment variables on Heroku
3. Push to Heroku: `git push heroku main`

#### Deploy Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set `VITE_API_URL` environment variable
3. Auto-deploy on push

---

### 📞 Support

For issues or questions, refer to:
- Backend: `server/README.md` (if created)
- Frontend: `client/README.md` (if created)
- Main: `README.md`

---

**Happy Coding! 🎉**
