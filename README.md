# 🎨 Creative Showcase – Full Stack Web Application

Creative Showcase is a full stack web application that allows artists to upload, manage, and publicly showcase their digital artworks.  
It provides private dashboards for creators and public profile pages accessible via unique URLs.

## 🚀 Live Demo

🔗 **Frontend:** (Add your deployed frontend URL here)  
🔗 **Backend API:** (Add your deployed backend URL here)

## 📌 Features

### 👤 Authentication
- User Sign Up & Login
- Secure authentication using JWT
- Protected routes for dashboard access

### 🖼 Artwork Management
- Upload artwork images from dashboard
- Images stored securely on Cloudinary
- Metadata stored in MongoDB
- View uploaded artworks in private dashboard

### 🌍 Public Profiles
- Public profile page for each user  
  (`/profile.html?username=<username>`)
- Displays all artworks uploaded by that user
- Masonry-style gallery layout

### 🏠 Landing Page
- Displays random artworks from all users
- Responsive masonry / grid layout
- Call-to-action for login and signup

### 🎨 UI / UX
- Clean Behance / Dribbble inspired design
- Fully responsive (desktop, tablet, mobile)
- Sticky footer with social links

## 🧑‍💻 Tech Stack

### Frontend
- HTML5
- CSS3 (Flexbox, Responsive Design)
- JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### Cloud & Storage
- Cloudinary (Image storage & delivery)
- Multer (File handling)

## 🗂 Project Structure
---
creative-showcase/
│
├── client/
│ ├── index.html
│ ├── login.html
│ ├── signup.html
│ ├── dashboard.html
│ ├── profile.html
│ ├── css/
│ │ └── style.css
│ └── js/
│ ├── index.js
│ ├── auth.js
│ ├── upload.js
│ ├── profile.js
│ └── storage.js
│
├── server/
│ ├── src/
│ │ ├── server.js
│ │ ├── routes/
│ │ │ ├── auth.routes.js
│ │ │ └── image.routes.js
│ │ ├── models/
│ │ │ ├── User.js
│ │ │ └── Image.js
│ │ ├── middleware/
│ │ │ ├── auth.middleware.js
│ │ │ └── upload.middleware.js
│ │ └── config/
│ │ └── cloudinary.js
│ └── package.json
│
└── README.md


## ⚙️ Environment Variables

Create a `.env` file inside the `server` folder:

.env
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- CLOUDINARY_CLOUD_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_api_key
- CLOUDINARY_API_SECRET=your_api_secret
##
🛠 Installation & Setup
1️⃣ Clone the Repository
bash
Copy code
git clone https://github.com/your-username/creative-showcase.git
cd creative-showcase
2️⃣ Backend Setup
bash
Copy code
cd server
npm install
npm run dev
Backend will run on:
- http://localhost:5000
  
3️⃣ Frontend Setup
Open client/index.html using:

VS Code Live Server OR

Any local static server

Frontend runs on:
http://127.0.0.1:5500/client
🔌 API Endpoints
Auth
POST /api/auth/register – Register user

POST /api/auth/login – Login user

Images
POST /api/images/upload – Upload artwork (protected)

GET /api/images/my – Get logged-in user's images

GET /api/images/random – Random images for landing page

GET /api/images/user/:username – Public profile images

🔐 Security Notes
Passwords are hashed before storage

JWT used for authentication & route protection

Sensitive keys stored in environment variables

Cloudinary handles secure media delivery

📈 Future Improvements
Likes & comments on artworks

User profile bio and avatar

Pagination / infinite scroll

Search and filters

Admin moderation panel

⭐ Final Note (For Recruiters)
This project covers the following key engineering aspects:

Full-stack application architecture (frontend + backend separation)

Clean and responsive UI/UX design principles

RESTful API design and integration

Authentication and route protection using JWT

Cloud-based image storage and delivery using Cloudinary

End-to-end application workflow from user registration to deployment readiness

👨‍💻 Author
Subham Maity

GitHub: https://github.com/your-username

LinkedIn: https://linkedin.com/in/your-profile

⭐ If you found this project interesting, feel free to star the repository!







