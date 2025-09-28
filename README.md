# BlogSphere 🌐

A modern, full-stack blog application built with React and Firebase for the GDG Web Application Selection Task.

![BlogSphere](https://img.shields.io/badge/React-18.2.0-blue) ![Firebase](https://img.shields.io/badge/Firebase-9.0+-orange) ![Netlify](https://img.shields.io/badge/Deployed-Netlify-green)

## 🚀 Live Demo
**[View Live Application →](https://blogsphere-gdg.netlify.app/)**

## 📸 Screenshots
![Homepage](<img width="1919" height="928" alt="image" src="https://github.com/user-attachments/assets/8e39b83d-644c-4609-b53f-747edfe5aaa8" />

*Modern homepage with search functionality and like system*

![Blog Detail](<img width="1918" height="924" alt="image" src="https://github.com/user-attachments/assets/d25e9564-cd03-4e65-be37-37b527bbdf81" />
<img width="1919" height="933" alt="image" src="https://github.com/user-attachments/assets/6673537e-b0b7-4297-ad95-3707925e3012" />


*Individual blog view with comments and reading time*

## ✨ Features

### 🎯 Core Features
- 📝 **Blog Management** - Create, read, update, delete blog posts
- 🔐 **Authentication** - Email/Password + Google OAuth integration
- 🏠 **Homepage** - Responsive blog listing with search functionality
- 📖 **Blog Detail** - Individual post view with full content
- 👤 **User Dashboard** - "My Blogs" page for personal blog management
- 📱 **Mobile Responsive** - Optimized for all device sizes

### 🚀 Advanced Features
- ❤️ **Like System** - Real-time like/unlike functionality with counts
- 🔍 **Search** - Instant search by title, content, or author
- ⏱️ **Reading Time** - Automatic estimation based on word count
- 💬 **Comments System** - Full CRUD operations for user comments
- 🎨 **Modern UI** - Purple gradient theme with glass morphism effects
- 🔄 **Real-time Updates** - Live data synchronization

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, React Router DOM |
| **Backend** | Firebase (Firestore + Auth) |
| **Styling** | Custom CSS with modern design |
| **State Management** | React Hooks + Firebase Hooks |
| **Deployment** | Netlify |
| **Authentication** | Firebase Auth (Email + Google) |

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Firebase account
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Saravanakumar2602/GDG-Blog-Application.git
cd GDG-Blog-Application
```

2. **Install dependencies**
```bash
npm install
```

3. **Firebase Setup**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Enable Authentication (Email/Password + Google)
   - Copy your config to `src/firebase.js`

4. **Run the application**
```bash
npm start
```

5. **Build for production**
```bash
npm run build
```

## 🔥 Firebase Configuration

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blogs collection
    match /blogs/{document} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null && (
        request.auth.uid == resource.data.authorId ||
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes'])
      );
      allow delete: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
    
    // Comments collection
    match /comments/{document} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
  }
}
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Navigation with auth state
│   └── Comments.js        # Comments system with CRUD
├── pages/
│   ├── Home.js            # Homepage with search & likes
│   ├── BlogDetail.js      # Individual blog view
│   ├── AddBlog.js         # Create/Edit blog form
│   ├── MyBlogs.js         # Personal blog dashboard
│   └── Auth.js            # Login/Signup page
├── firebase.js            # Firebase configuration
├── App.js                 # Main app with routing
└── index.css              # Custom responsive styling
```

## 🎨 Design Features

- **🎨 Modern UI** - Purple gradient theme with glass morphism
- **📱 Mobile First** - Responsive design for all devices
- **✨ Smooth Animations** - Hover effects and transitions
- **🎯 User Experience** - Intuitive navigation and interactions
- **🔍 Search Integration** - Real-time search functionality

## 🔒 Security & Performance

### Security
- ✅ Firebase Authentication integration
- ✅ Firestore security rules
- ✅ Author-only permissions for content management
- ✅ Input validation and sanitization
- ✅ XSS protection through React

### Performance
- ⚡ Optimized Firebase queries
- 🚀 Client-side search filtering
- 📦 Code splitting and lazy loading
- 📱 Mobile-optimized interactions
- 🎯 Efficient state management

## 🌟 Key Highlights

| Feature | Description |
|---------|-------------|
| **Real-time Updates** | Live likes and comments using Firebase |
| **Search Functionality** | Instant search across all blog content |
| **Mobile Responsive** | Perfect experience on all devices |
| **Modern Design** | Professional UI with purple gradient theme |
| **User Authentication** | Secure login with email and Google OAuth |
| **Comments System** | Full CRUD operations for user engagement |

## 📊 Features Checklist

### ✅ GDG Core Requirements
- [x] Homepage with blog list
- [x] Individual blog post view
- [x] Add new blog functionality
- [x] User authentication
- [x] Edit/Delete posts (author only)
- [x] Responsive design
- [x] Database persistence

### ✅ Bonus Features (Extra Credit)
- [x] Advanced authentication (Google OAuth)
- [x] Real-time features (likes, comments)
- [x] Search functionality
- [x] Mobile optimization
- [x] Modern UI/UX design
- [x] Personal dashboard
- [x] Comments system
- [x] Reading time estimation

## 🚀 Deployment

This application is deployed on Netlify with automatic builds from GitHub.

**Live URL:** [https://blogsphere-gdg.netlify.app/](https://blogsphere-gdg.netlify.app/)

### Deploy Your Own
1. Fork this repository
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add environment variables if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Saravanakumar G**
- GitHub: [@Saravanakumar2602](https://github.com/Saravanakumar2602)
- Project: [GDG Blog Application](https://github.com/Saravanakumar2602/GDG-Blog-Application)
- Live Demo: [BlogSphere](https://blogsphere-gdg.netlify.app/)

---

### 🎯 Built for GDG Web Application Selection Task

This project demonstrates modern web development skills including:
- React.js with hooks and modern patterns
- Firebase integration (Firestore + Authentication)
- Responsive design and mobile optimization
- Real-time features and user engagement
- Security best practices
- Professional UI/UX design

**⭐ If you found this project helpful, please give it a star!**
