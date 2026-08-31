# 🗺️ TripVault

> **Plan it. Save it. Revisit it.**  
> TripVault is a full-stack travel itinerary management application that lets you create, organise, and showcase your trips with rich details, cover photos, and a public profile.

![TripVault — Dark Mode](./client/public/vite.svg)

---

## ✨ Features

| Feature | Details |
|---|---|
| **Authentication** | Secure JWT-based login & registration |
| **Trip CRUD** | Create, read, update, and delete trip itineraries |
| **Cover Photos** | Upload trip images via Cloudinary |
| **Trip Details** | Destination, dates, budget (INR ₹), rating & description |
| **Public Profiles** | Share your travel story with a unique `/profile/:username` URL |
| **Search & Sort** | Filter trips by destination; sort by date or budget |
| **Dark / Light Mode** | System-persisted theme toggle |
| **Toast Notifications** | Feedback for every user action (React Toastify) |
| **Responsive Design** | Fully mobile-friendly down to 375 px; hamburger nav on mobile |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** (Vite)
- **React Router v7**
- **Bootstrap 5** — layout utilities
- **React Toastify** — toast notifications
- **Vanilla CSS** — custom design system (glassmorphism, CSS variables)

### Backend
- **Node.js + Express 5**
- **MongoDB + Mongoose**
- **JWT** (jsonwebtoken) — authentication
- **Bcryptjs** — password hashing
- **Cloudinary + Multer** — image uploads
- **dotenv** — environment configuration

---

## 📁 Project Structure

```
TripVault/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── api/             # Axios instance
│   │   ├── components/      # Navbar, Footer, TripCard, ProtectedRoute
│   │   ├── context/         # AuthContext (JWT + user state)
│   │   ├── pages/           # Login, Register, Dashboard, CreateTrip, EditTrip,
│   │   │                    #   TripDetails, PublicProfile, EditProfile
│   │   ├── App.jsx          # Routes
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global design system
│   └── package.json
│
└── server/                  # Express backend
    ├── config/              # Database connection
    ├── controllers/         # Auth, trips, users
    ├── middleware/           # JWT auth guard
    ├── models/              # User, Trip (Mongoose)
    ├── routes/              # /auth, /trips, /users
    ├── index.js             # Server entry point
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (free tier is enough)

### 1. Clone the repository

```bash
git clone https://github.com/surajnt859/NewTripVault.git
cd NewTripVault
```

### 2. Set up the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory (see `.env.example` for required variables):

```bash
cp .env.example .env
# Then fill in your actual values
```

Start the server:

```bash
npm run dev          # development (nodemon)
# or
npm start            # production
```

The API will be available at `http://localhost:5000`.

### 3. Set up the Frontend

```bash
cd client
npm install
npm run dev
```

The React app will be available at `http://localhost:5173`.

> **Important:** The frontend proxies API calls to the backend. Make sure the backend is running before starting the frontend.

---

## 🔑 Environment Variables

Copy `server/.env.example` to `server/.env` and fill in your values.

| Variable | Description |
|---|---|
| `PORT` | Port the Express server listens on |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |

### Trips (Protected — requires `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trips` | Get all trips for the logged-in user |
| `POST` | `/api/trips` | Create a new trip |
| `GET` | `/api/trips/:id` | Get a single trip |
| `PUT` | `/api/trips/:id` | Update a trip |
| `DELETE` | `/api/trips/:id` | Delete a trip |
| `POST` | `/api/trips/:id/upload` | Upload a cover photo to Cloudinary |

### Users
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/users/:username/profile` | Get public profile + trips |
| `PUT` | `/api/users/profile` | Update username / bio (protected) |

---

## 🌐 Deployment

### Backend (e.g. Render / Railway)
1. Push code to GitHub.
2. Create a new Web Service and point it to the `server/` folder.
3. Set all environment variables from `.env.example` in the dashboard.
4. Build command: `npm install` | Start command: `npm start`.

### Frontend (e.g. Vercel / Netlify)
1. Create a new project and point it to the `client/` folder.
2. Build command: `npm run build` | Output directory: `dist`.
3. Set `VITE_API_URL` to your deployed backend URL if you are using it.

---

## 👤 Author

Built by **Suraj** — [@surajnt859(https://github.com/surajnt859)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
