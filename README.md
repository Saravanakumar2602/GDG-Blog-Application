# BlogSphere 🌐

Welcome to **BlogSphere** — a modern, full-stack blog platform built with React and Firebase for the GDG Web Application Selection Task.

![React](https://img.shields.io/badge/React-18.2.0-blue) ![Firebase](https://img.shields.io/badge/Firebase-9.0+-orange) ![Netlify](https://img.shields.io/badge/Deployed-Netlify-green)

---

## 🚀 Live Demo

👉 [Check out BlogSphere live!](https://blogsphere-gdg.netlify.app/)

---

## 📸 Screenshots

**Homepage**  
*Modern homepage with search and like system*  
![Homepage](https://github.com/user-attachments/assets/8e39b83d-644c-4609-b53f-747edfe5aaa8)

**Blog Detail**  
*Individual blog view with comments and reading time*  
![Blog Detail 1](https://github.com/user-attachments/assets/d25e9564-cd03-4e65-be37-37b527bbdf81)  
![Blog Detail 2](https://github.com/user-attachments/assets/6673537e-b0b7-4297-ad95-3707925e3012)

---

## ✨ Features

### Core

- 📝 **Blog Management** — Create, read, update, and delete posts
- 🔐 **Authentication** — Email/password & Google sign-in
- 🏠 **Homepage** — Responsive blog list with search
- 📖 **Blog Detail** — Full post view
- 👤 **User Dashboard** — Manage your own blogs
- 📱 **Mobile Friendly** — Looks great on any device

### Advanced

- ❤️ **Like System** — Real-time likes/unlikes
- 🔍 **Search** — Instantly filter by title, content, or author
- ⏱️ **Reading Time** — Auto-calculated for each post
- 💬 **Comments** — Add, edit, and delete comments
- 🎨 **Modern UI** — Purple gradients & glassmorphism
- 🔄 **Live Updates** — See changes instantly

---

## 🛠️ Tech Stack

| Category        | Technology                      |
|-----------------|--------------------------------|
| **Frontend**    | React 18, React Router DOM      |
| **Backend**     | Firebase (Firestore + Auth)     |
| **Styling**     | Custom CSS                     |
| **State**       | React Hooks, Firebase Hooks     |
| **Deployment**  | Netlify                        |
| **Auth**        | Firebase Auth (Email + Google)  |

---

## ⚡ Quick Start

### Prerequisites

- Node.js 16+
- Firebase account
- Git

### Setup

1. **Clone the repo**
    ```bash
    git clone https://github.com/Saravanakumar2602/GDG-Blog-Application.git
    cd GDG-Blog-Application
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Configure Firebase**
    - Create a Firebase project: [console.firebase.google.com](https://console.firebase.google.com/)
    - Enable Firestore Database
    - Enable Authentication (Email/Password + Google)
    - Copy your Firebase config into `src/firebase.js`

4. **Start the app**
    ```bash
    npm start
    ```

5. **Build for production**
    ```bash
    npm run build
    ```

---

## 🔥 Firebase Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blogs
    match /blogs/{document} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null && (
        request.auth.uid == resource.data.authorId ||
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes'])
      );
      allow delete: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
    // Comments
    match /comments/{document} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
  }
}
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js
│   └── Comments.js
├── pages/
│   ├── Home.js
│   ├── BlogDetail.js
│   ├── AddBlog.js
│   ├── MyBlogs.js
│   └── Auth.js
├── firebase.js
├── App.js
└── index.css
```

---

## 🎨 Design Highlights

- **Modern UI** — Purple gradients, glassmorphism, and smooth animations
- **Mobile First** — Fully responsive
- **Great UX** — Easy navigation and interactions
- **Real-time Search** — Instant filtering as you type

---

## 🔒 Security & Performance

- Secure Firebase Auth & Firestore rules
- Author-only permissions for editing/deleting
- Input validation & XSS protection
- Optimized queries & client-side filtering
- Code splitting and lazy loading for speed

---

## 🌟 Highlights

| Feature                | Description                                 |
|------------------------|---------------------------------------------|
| Real-time Updates      | Live likes and comments                     |
| Instant Search         | Filter blogs as you type                    |
| Mobile Responsive      | Works beautifully on all devices            |
| Modern Design          | Professional, eye-catching UI               |
| User Authentication    | Secure login with email & Google            |
| Comments System        | Full CRUD for user engagement               |

---

## 📊 Features Checklist

**GDG Core Requirements**
- [x] Homepage with blog list
- [x] Individual blog post view
- [x] Add new blog
- [x] User authentication
- [x] Edit/Delete (author only)
- [x] Responsive design
- [x] Database persistence

**Bonus Features**
- [x] Google OAuth
- [x] Real-time likes/comments
- [x] Search
- [x] Mobile optimization
- [x] Modern UI/UX
- [x] Personal dashboard
- [x] Comments system
- [x] Reading time estimation

---

## 🚀 Deployment

Deployed on Netlify with automatic GitHub builds.

**Live:** [https://blogsphere-gdg.netlify.app/](https://blogsphere-gdg.netlify.app/)

**To deploy your own:**
1. Fork this repo
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add any needed environment variables

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to GitHub (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

MIT — see [LICENSE](LICENSE) for details.

---

## 👨‍💻 Author

**Saravanakumar G**  
- [GitHub](https://github.com/Saravanakumar2602)
- [Project Repo](https://github.com/Saravanakumar2602/GDG-Blog-Application)
- [Live Demo](https://blogsphere-gdg.netlify.app/)

---

### 🎯 Built for the GDG Web Application Selection Task

This project showcases:
- Modern React (with hooks)
- Firebase (Firestore + Auth)
- Responsive, mobile-first design
- Real-time features
- Security best practices
- Professional UI/UX

**⭐ If you like this project, please give it a star!**
