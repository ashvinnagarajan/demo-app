# Flask + React Monorepo (Users Management App)

This is a full-stack **Flask + React** monorepo application designed for managing users. The backend is powered by **Flask** with **AWS Lambda**, and the frontend is a **React** application deployed using **AWS Amplify**.

## 📦 Project Structure
```
my-flask-app/
├── backend/                  # Flask app (API server)
│   ├── app.py               # Main Flask app
│   ├── users.py             # Blueprint for user routes
│   ├── requirements.txt     # Python dependencies
│   ├── zappa_settings.json  # Zappa settings for Lambda
│   └── venv/ (ignored)      # Python virtual environment
│
├── frontend/                # React app (User interface)
│       ├── src/             # React source code
│       ├── public/
│       └── package.json     # React dependencies
│
├── amplify.yml              # Amplify CI/CD settings
├── .gitignore               # Ignored files for Git
├── README.md                # Project documentation
└── .gitignore
```

---

## 🚀 Getting Started

### **Prerequisites:**
- Python 3.x
- Node.js & npm
- AWS CLI & Amplify CLI

### **Backend Setup (Flask)**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
zappa deploy dev
```

### **Frontend Setup (React)**
```bash
cd frontend
npm install
npm start
```

### **Run Both Apps Locally:**
- Flask API: `http://localhost:5000`
- React Frontend: `http://localhost:3000`

Ensure **CORS** is properly configured in the backend for API integration.

---

## 🛠️ API Endpoints (Flask Backend)

### **Base URL:** `/api`
- **GET /users** – Fetch all users.
- **GET /users/:id** – Fetch a user by ID.
- **POST /users** – Create a new user.
- **PUT /users/:id** – Update a user.
- **DELETE /users/:id** – Delete a user.

---

## 📦 Deploying to AWS

### **1. Backend (Flask via Zappa)**
```bash
py -3.10 -m venv venv # Create venv if not already present
```
```bash
cd backend
venv\Scripts\Activate  # PowerShell
zappa update dev
```

### **2. Frontend (React via Amplify)**
1. Push code to GitHub.
2. Go to **AWS Amplify Console**.
3. Connect the GitHub repository.
4. Deploy React app automatically.

---

## ✅ AWS Services Used
- **Lambda (Flask API)**
- **API Gateway**
- **DynamoDB (NoSQL Database)**
- **Amplify (React Frontend Hosting)**
- **S3 (Static Storage)**

---

## 📖 Environment Management
### **Backend:**
- Manage using `zappa_settings.json`.

### **Frontend:**
- Managed via **Amplify Console** under **App Settings**.

---