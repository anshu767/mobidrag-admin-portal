# Backend Testing Guide - Quick Reference

## 🎯 Prerequisites

1. **Server running**: `npm run dev` (port 5000)
2. **Database seeded**: `npm run seed` (creates test data)
3. **Tool**: Postman, Insomnia, or cURL

---

## 🔑 Get Admin Token

### Request
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mobidrag.com",
    "password": "admin123"
  }'
```

### Response
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@mobidrag.com",
    "role": "admin",
    "tier": "platinum"
  }
}
```

**Store token for next requests**: `TOKEN=eyJhbGci...`

---

## 📋 Test Applications

### 1. List All Applications
```bash
curl -X GET http://localhost:5000/api/admin/applications \
  -H "Authorization: Bearer $TOKEN"
```

**Filter by status**:
```bash
curl -X GET "http://localhost:5000/api/admin/applications?status=pending" \
  -H "Authorization: Bearer $TOKEN"
```

---

### 2. Approve Application (Create Partner)
```bash
curl -X POST http://localhost:5000/api/admin/applications/507f1f77bcf86cd799439012/approve \
  -H "Authorization: Bearer $TOKEN"
```

**Response** (creates new partner):
```json
{
  "success": true,
  "message": "Application approved & partner account created",
  "data": {
    "partnerId": "507f1f77bcf86cd799439050",
    "name": "Startup Ventures",
    "email": "apply@startupventures.com",
    "tier": "silver",
    "status": "active"
  }
}
```

---

### 3. Reject Application
```bash
curl -X POST http://localhost:5000/api/admin/applications/507f1f77bcf86cd799439013/reject \
  -H "Authorization: Bearer $TOKEN"
```

---

## 👥 Test Partners

### 1. Get All Partners
```bash
curl -X GET http://localhost:5000/api/admin/partners \
  -H "Authorization: Bearer $TOKEN"
```

**Filter by status**:
```bash
curl -X GET "http://localhost:5000/api/admin/partners?status=active" \
  -H "Authorization: Bearer $TOKEN"
```

**Search by name/email**:
```bash
curl -X GET "http://localhost:5000/api/admin/partners?search=Tech" \
  -H "Authorization: Bearer $TOKEN"
```

---

### 2. Update Partner (Tier/Status)
```bash
curl -X PATCH http://localhost:5000/api/admin/partners/507f1f77bcf86cd799439001/tier \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tier": "gold",
    "status": "active"
  }'
```

**Valid Values**:
- tier: `"silver"` | `"gold"` | `"platinum"`
- status: `"active"` | `"suspended"`

---

## 📊 Test Deals

### 1. Get All Deals
```bash
curl -X GET http://localhost:5000/api/admin/deals \
  -H "Authorization: Bearer $TOKEN"
```

**Filter by stage**:
```bash
curl -X GET "http://localhost:5000/api/admin/deals?stage=won" \
  -H "Authorization: Bearer $TOKEN"
```

**Response includes partner details**:
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439020",
      "brandName": "Nike Partnership",
      "partnerId": {
        "id": "507f1f77bcf86cd799439001",
        "name": "Tech Innovations Ltd",
        "email": "contact@techinnovations.com",
        "tier": "gold"
      },
      "stage": "won",
      "amount": 50000,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 2. Update Deal to "won" (Auto-Commission)
```bash
curl -X PATCH http://localhost:5000/api/admin/deals/507f1f77bcf86cd799439020/stage \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stage": "won"
  }'
```

**Response includes auto-created commission**:
```json
{
  "success": true,
  "message": "Deal marked as won & commission created automatically",
  "data": {
    "deal": {
      "id": "507f1f77bcf86cd799439020",
      "brandName": "Nike Partnership",
      "stage": "won",
      "amount": 50000
    },
    "commission": {
      "id": "507f1f77bcf86cd799439030",
      "amount": 5000,
      "status": "pending"
    }
  }
}
```

✅ **Commission automatically created at 10% of deal amount**

---

### 3. Update Deal to "lost" (Store Reason)
```bash
curl -X PATCH http://localhost:5000/api/admin/deals/507f1f77bcf86cd799439021/stage \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stage": "lost",
    "lossReason": "Budget constraints exceeded allocation"
  }'
```

**Valid Stages**:
- `"contacted"` - Initial contact
- `"demo"` - Demo phase
- `"negotiating"` - Negotiation ongoing
- `"won"` - Deal closed (triggers commission)
- `"lost"` - Rejected deal (requires lossReason)

---

## 💰 Test Payouts

### 1. Get Pending Payouts
```bash
curl -X GET http://localhost:5000/api/admin/payouts \
  -H "Authorization: Bearer $TOKEN"
```

**Response includes aggregated total**:
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439030",
      "dealId": {
        "brandName": "Nike Partnership",
        "amount": 50000
      },
      "partnerId": {
        "name": "Tech Innovations Ltd",
        "email": "contact@techinnovations.com",
        "tier": "gold"
      },
      "amount": 5000,
      "status": "pending",
      "createdAt": "2024-01-15T10:35:00Z"
    }
  ],
  "totalAmount": 5000,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

---

### 2. Mark Commissions as Paid
```bash
curl -X POST http://localhost:5000/api/admin/payouts/pay \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "commissionIds": ["507f1f77bcf86cd799439030", "507f1f77bcf86cd799439031"]
  }'
```

**Response**:
```json
{
  "success": true,
  "message": "2 commission(s) marked as paid",
  "data": {
    "count": 2,
    "amount": 8000,
    "commissions": [
      {
        "id": "507f1f77bcf86cd799439030",
        "amount": 5000,
        "status": "paid"
      },
      {
        "id": "507f1f77bcf86cd799439031",
        "amount": 3000,
        "status": "paid"
      }
    ]
  }
}
```

---

## 🔍 Common Error Scenarios

### Missing Token
```bash
curl -X GET http://localhost:5000/api/admin/applications
```

**Error Response (401)**:
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**Fix**: Add `Authorization: Bearer {token}` header

---

### Non-Admin User
Login as partner (after approval):
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "contact@techinnovations.com",
    "password": "partner123"
  }'
```

Then try admin endpoint:
```bash
curl -X GET http://localhost:5000/api/admin/deals \
  -H "Authorization: Bearer {partner_token}"
```

**Error Response (403)**:
```json
{
  "success": false,
  "message": "Only admins can access this route"
}
```

**Fix**: Use admin token, not partner token

---

### Lost Deal Without Reason
```bash
curl -X PATCH http://localhost:5000/api/admin/deals/507f1f77bcf86cd799439021/stage \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stage": "lost"
  }'
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "Loss reason is required for lost deals"
}
```

**Fix**: Include `lossReason` field

---

### Invalid Stage
```bash
curl -X PATCH http://localhost:5000/api/admin/deals/507f1f77bcf86cd799439021/stage \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stage": "invalid"
  }'
```

**Error Response (400)**:
```json
{
  "success": false,
  "message": "Invalid stage"
}
```

**Valid stages**: contacted, demo, negotiating, won, lost

---

## 📝 Postman Collection

### Setup in Postman

1. **Create a new Environment**:
   - Variable: `api_url` = `http://localhost:5000`
   - Variable: `token` = (empty initially)

2. **Login Request**:
   - Method: POST
   - URL: `{{api_url}}/api/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "admin@mobidrag.com",
       "password": "admin123"
     }
     ```
   - Tests Tab (auto-save token):
     ```javascript
     var jsonData = pm.response.json();
     pm.environment.set("token", jsonData.token);
     ```

3. **All Admin Requests**:
   - Header: `Authorization: Bearer {{token}}`

---

## 🧪 Integration Flow Example

### Complete Partner Workflow

**Step 1: Login**
```bash
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@mobidrag.com",
    "password": "admin123"
  }' | grep -o '"token":"[^"]*' | cut -d'"' -f4)
```

**Step 2: Approve Application (creates partner)**
```bash
curl -X POST http://localhost:5000/api/admin/applications/507f1f77bcf86cd799439012/approve \
  -H "Authorization: Bearer $TOKEN"
```

**Step 3: Get All Partners**
```bash
curl -X GET http://localhost:5000/api/admin/partners \
  -H "Authorization: Bearer $TOKEN"
```

**Step 4: Update Partner to Gold**
```bash
PARTNER_ID=507f1f77bcf86cd799439050
curl -X PATCH http://localhost:5000/api/admin/partners/$PARTNER_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tier": "gold"}'
```

**Step 5: Create Deal (requires partner ID)**
```bash
curl -X POST http://localhost:5000/api/admin/deals \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "brandName": "New Partnership",
    "partnerId": "'$PARTNER_ID'",
    "amount": 75000
  }'
```

**Step 6: Update Deal to Won (auto-commission)**
```bash
DEAL_ID=507f1f77bcf86cd799439060
curl -X PATCH http://localhost:5000/api/admin/deals/$DEAL_ID/stage \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"stage": "won"}'
```

**Step 7: Get Pending Payouts**
```bash
curl -X GET http://localhost:5000/api/admin/payouts \
  -H "Authorization: Bearer $TOKEN"
```

**Step 8: Mark Commission as Paid**
```bash
curl -X POST http://localhost:5000/api/admin/payouts/pay \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"commissionIds": ["507f1f77bcf86cd799439070"]}'
```

---

## ✅ Test Results Template

Record test results:

| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| /api/auth/login | POST | ✅ | Returns valid token |
| /api/admin/applications | GET | ✅ | Lists pending apps |
| /api/admin/applications/:id/approve | POST | ✅ | Creates partner user |
| /api/admin/applications/:id/reject | POST | ✅ | Rejects application |
| /api/admin/partners | GET | ✅ | Lists partners |
| /api/admin/partners/:id | PATCH | ✅ | Updates tier/status |
| /api/admin/deals | GET | ✅ | Lists deals |
| /api/admin/deals/:id/stage | PATCH | ✅ | Auto-commission on won |
| /api/admin/payouts | GET | ✅ | Lists pending payouts |
| /api/admin/payouts/pay | POST | ✅ | Marks as paid |

---

**Happy Testing! 🚀**
