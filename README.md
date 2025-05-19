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


2. Install Dependencies

```bash
npm install


3. Configure Environment Variables

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookreview
JWT_SECRET=your_jwt_secret_key 

