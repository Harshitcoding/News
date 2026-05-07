# HackerNews MERN App 📰

A full-stack web application built with the MERN stack that scrapes top stories from [Hacker News](https://news.ycombinator.com), displays them with authentication and bookmarking functionality.

## 🚀 Features

- Scrapes top 10 stories from HackerNews automatically on server start
- Manual scrape trigger via API
- JWT-based authentication (Register/Login)
- Bookmark/unbookmark stories (authenticated users only)
- Protected bookmarks page
- Pagination support
- Clean and responsive UI with Tailwind CSS

## 🛠️ Tech Stack

**Frontend:** React, React Router DOM, Tailwind CSS, Axios

**Backend:** Node.js, Express.js

**Database:** MongoDB (Mongoose)

**Other:** JWT, Bcryptjs, Cheerio, Axios (scraper)

## 📁 Folder Structure

```
News/
├── backend/
│   ├── src/
│   │   ├── config/        # Database connection
│   │   ├── controllers/   # Business logic
│   │   ├── middlewares/   # JWT auth middleware
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   └── scraper/       # HackerNews scraper
│   ├── .env
│   └── server.js
│
└── frontend/
    └── src/
        ├── api/           # Axios config
        ├── components/    # Navbar, ProtectedRoute
        ├── context/       # Auth Context
        └── pages/         # Home, Login, Register, Bookmarks
```

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

## 🖥️ How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Harshitcoding/News.git
cd News
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file with your environment variables (see above).

```bash
npm run dev
```

Backend will start on `http://localhost:3000`

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will start on `http://localhost:5173`

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Stories
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/stories` | Get all stories (sorted by points) | No |
| GET | `/api/stories?page=1&limit=10` | Get stories with pagination | No |
| GET | `/api/stories/:id` | Get single story | No |
| POST | `/api/stories/:id/bookmark` | Toggle bookmark | ✅ Yes |
| GET | `/api/bookmarks` | Get user bookmarks | ✅ Yes |

### Scraper
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/scrape` | Manually trigger scraper |

## 👨‍💻 Author

**Harshit Khandelwal** - [GitHub](https://github.com/Harshitcoding)
