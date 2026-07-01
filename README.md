# LinkedIn Clone

A full-stack LinkedIn Clone built with the MERN stack, focused on implementing core professional networking features. The project follows a scalable architecture with a Next.js frontend and a Node.js/Express backend, using MongoDB for data persistence.

## Features

### Backend
- JWT-based User Authentication
- Secure Password Hashing (Bcrypt)
- User Profile Management
- Profile Picture Upload (Multer)
- Resume Upload & Download
- Dynamic PDF Resume Generation (PDFKit)
- RESTful APIs following MVC Architecture
- MongoDB Integration with Mongoose

### Frontend
- User Registration & Login
- Authentication integrated with Backend APIs
- Dashboard
- Redux Toolkit for State Management
- Post State Management
- Responsive UI with CSS Modules

## Tech Stack

**Frontend**
- Next.js
- React.js
- Redux Toolkit
- Axios
- CSS Modules

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Multer
- PDFKit

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd Linkedin-clone
```

### Install Dependencies

**Backend**

```bash
cd Backend
npm install
```

**Frontend**

```bash
cd ../frontend
npm install
```

### Configure Environment Variables

Create a `.env` file inside the `Backend` directory.

```env
MONGO_URI=<your_mongodb_connection_string>
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=<your_jwt_secret>
```

### Run the Application

**Backend**

```bash
cd Backend
npm run dev
```

**Frontend**

```bash
cd frontend
npm run dev
```

## Project Status

### Completed
- Authentication System
- User Profile APIs
- Resume Upload & PDF Generation
- Frontend Authentication
- Dashboard
- Redux Store & Post State Management

### In Progress
- User Feed
- Post Creation & Interaction
- Connections
- Jobs
- Messaging
- Notifications

## Author

**Riya**

