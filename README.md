# 📚 Book Review 

A simple RESTful API for managing books and user-submitted reviews, built using Node.js, Express, MongoDB, and JWT for authentication.

---

## 🚀 Features

- User signup & login with hashed passwords
- JWT-based authentication
- Create, read, and search books
- Create, update, and delete reviews (user-specific)
- Book details include average rating & reviews (with pagination)
- Modular structure with clean code and meaningful comments

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** JWT, bcrypt
- **Validation:** Middleware & checks
- **Tools:** Postman, dotenv, nodemon

---

## ⚙️ Project Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/prateekpmd/Book-Review.git 
```


### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
PORT=5000
MONGODB_URI=Your MongoDb Uri
JWT_SECRET=your_jwt_secret_key 
```

## 💻 How to Run Locally

### 1. Start MongoDB
Make sure MongoDB is running on your machine:

### 1. Start the Server
Development Mode:
```bash
npm run dev
```
Server runs at: http://localhost:5000


# 📋 Example API Requests (Postman)
## 1. Auth Module
### 1.1 User Signup
Method: POST

URL: http://localhost:5000/api/auth/signup

```bash
{
  "email": "user@example.com",
  "password": "mypassword"
}
```

### 1.2 User Login
Method: POST

URL: http://localhost:5000/api/auth/login

```bash
{
  "email": "user@example.com",
  "password": "mypassword"
}
```
## 2. Book Module
### 1.1 Create a Book
Method: POST

URL: http://localhost:5000/api/books

Headers:

Authorization: Bearer <YOUR_JWT_TOKEN>

Content-Type: application/json

Body: (raw JSON)
```bash
{
  "title": "Driver 2",
  "author": "Asap Rocky",
  "genre": "Animation",
  "publishedYear": 2015
}

```

### 2.1 Get All Books (with optional filters & pagination)
Method: GET

URL: http://localhost:3000/api/books?author=Orwell&genre=Dystopian&page=1&limit=5

### 2.2 Get Book Details by ID (includes average rating & reviews)
Method: GET

URL: http://localhost:3000/api/books/<BOOK_ID>

### 2.3 Search Books by Title or Author
Method: GET

URL: http://localhost:3000/api/books/search?q=1984


## 2. Review Module
### 1.1 Create a Review
