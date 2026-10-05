# Wanderlust – Full Stack Travel & Listing Platform

Wanderlust is a full-stack web application for discovering, creating, editing, and managing travel listings.

The project was originally built using Express.js and EJS. The frontend has been migrated to **React.js** while keeping the existing Node.js/Express.js backend and MongoDB database.

## 🚀 Features

* User registration and login
* Session-based authentication
* Browse travel listings
* View detailed listing information
* Create new listings
* Edit existing listings
* Delete listings
* Image upload using Cloudinary
* Location geocoding using Mapbox
* MongoDB Atlas database
* Protected routes
* Owner-based listing management
* Responsive React frontend
* REST API based communication between frontend and backend

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* Passport.js
* Express Session
* EJS
* Multer

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Cloud & APIs

* Cloudinary – Image Storage
* Mapbox – Location Geocoding

### Development Tools

* Git
* GitHub
* VS Code
* Git Bash
* npm

## 📁 Project Structure

```text
wanderlust/
│
├── backend/
│   ├── controller/
│   ├── models/
│   ├── Routes/
│   ├── views/
│   ├── public/
│   ├── middleware.js
│   ├── cloudConfig.js
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ListingCard.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Listings.jsx
│   │   │   ├── ListingDetails.jsx
│   │   │   ├── CreateListing.jsx
│   │   │   ├── EditListing.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── listingService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔐 Authentication

The application uses Passport.js with local authentication.

Authentication flow:

```text
React Login Form
       ↓
POST /login
       ↓
Express + Passport
       ↓
MongoDB
       ↓
Session Created
       ↓
React AuthContext
       ↓
Authenticated User
```

The frontend checks the current authentication status using:

```text
GET /current-user
```

## 🔗 API Endpoints

### Authentication

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| POST   | `/signup`       | Register a new user |
| POST   | `/login`        | Login user          |
| GET    | `/logout`       | Logout user         |
| GET    | `/current-user` | Get logged-in user  |

### Listings

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | `/listings`     | Get all listings    |
| GET    | `/listings/:id` | Get listing details |
| POST   | `/listings`     | Create listing      |
| PUT    | `/listings/:id` | Update listing      |
| DELETE | `/listings/:id` | Delete listing      |

## ⚙️ Environment Variables

Create a `.env` file inside the `backend` directory.

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret
MAP_TOKEN=your_mapbox_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

**Never commit your `.env` file to GitHub.**

The project should contain `.env` in `.gitignore`.

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Rahul-code256/wanderlust-react.git
cd wanderlust-react
```

### 2. Install backend dependencies

```bash
cd backend
npm install --legacy-peer-deps
```

### 3. Configure environment variables

Create:

```text
backend/.env
```

Add your MongoDB Atlas, Cloudinary, Mapbox, and session credentials.

### 4. Install frontend dependencies

Open another Git Bash terminal:

```bash
cd /f/wanderlust/frontend
npm install
```

## ▶️ Run the Application

### Start Backend

```bash
cd /f/wanderlust/backend
node app.js
```

Backend:

```text
http://localhost:8080
```

### Start React Frontend

Open another terminal:

```bash
cd /f/wanderlust/frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## 🔄 Application Architecture

```text
                 ┌─────────────────────┐
                 │     React Frontend   │
                 │    localhost:5173    │
                 └──────────┬──────────┘
                            │
                       REST API
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Express Backend   │
                 │    localhost:8080   │
                 └──────────┬──────────┘
                            │
                ┌───────────┼───────────┐
                ▼           ▼           ▼
           MongoDB      Cloudinary    Mapbox
           Atlas        Images        Location
```

## 🧪 Development

Useful commands:

```bash
# Backend
cd backend
node app.js

# Frontend
cd frontend
npm run dev

# Check Git status
git status

# Add changes
git add -A

# Commit changes
git commit -m "Update Wanderlust application"

# Push changes
git push
```

## 🎯 Project Objective

The main objective of this project is to build a modern full-stack travel listing platform and migrate the user interface from server-rendered EJS pages to a component-based React frontend.

This project demonstrates practical experience with:

* React.js
* REST APIs
* Node.js
* Express.js
* MongoDB
* Authentication
* Cloudinary
* Mapbox
* Git/GitHub
* Full-stack application architecture

## 👨‍💻 Author

**Rahul Nidode**

GitHub: [Rahul-code256](https://github.com/Rahul-code256)

LinkedIn: [Rahul Nidode](https://www.linkedin.com/in/rahul-nidode-a87b22268/)

---

⭐ If you find this project useful, consider giving it a star!
