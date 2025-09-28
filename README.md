# Blog Application

A modern, full-stack blog application built with React and Firebase for the GDG Web Application Selection Task.

## 🚀 Live Demo
**Deployed on Netlify:** [Your Netlify URL Here]

## ✨ Features

### Core Features
- ✅ Homepage displaying list of blog posts with search functionality
- ✅ Individual blog post view with title, author, date, and content
- ✅ Add new blog post functionality (authenticated users only)
- ✅ User authentication (Email/Password + Google Sign-In)
- ✅ Edit/Delete blog posts (only by author)
- ✅ Responsive design optimized for mobile and desktop
- ✅ Firebase Firestore for data persistence

### Advanced Features
- ✅ **Like System** - Users can like/unlike blog posts with real-time counts
- ✅ **Search Functionality** - Search blogs by title, content, or author
- ✅ **Reading Time Estimation** - Automatic calculation based on word count
- ✅ **Comments System** - Users can comment, edit, and delete their own comments
- ✅ **My Blogs Page** - Personal dashboard for managing user's own blogs
- ✅ **Mobile Optimization** - Touch-friendly interface with responsive design

### Tech Stack
- **Frontend**: React 18, React Router DOM
- **Backend**: Firebase (Firestore + Authentication)
- **Styling**: Custom CSS with modern design patterns
- **State Management**: React Hooks + Firebase Hooks
- **Deployment**: Netlify

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies
```bash
git clone [your-repo-url]
cd blog-app
npm install
```

### 2. Firebase Configuration
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore Database and Authentication (Email/Password + Google)
3. Get your Firebase config from Project Settings
4. Update `src/firebase.js` with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDyjusbMTW2k707l12hDs_rItdN2eMpGGw",
  authDomain: "gdg-project-ba5c6.firebaseapp.com",
  projectId: "gdg-project-ba5c6",
  storageBucket: "gdg-project-ba5c6.firebasestorage.app",
  messagingSenderId: "49778487609",
  appId: "1:49778487609:web:f517ff2c7be48a8ac478e8",
  measurementId: "G-ZPSR3DWV7B"
};
```

### 3. Firestore Security Rules
Add these rules to your Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blogs collection rules
    match /blogs/{document} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null && (
        request.auth.uid == resource.data.authorId ||
        request.resource.data.diff(resource.data).affectedKeys().hasOnly(['likes'])
      );
      allow delete: if request.auth != null 
        && request.auth.uid == resource.data.authorId;
    }
    
    // Comments collection rules
    match /comments/{document} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null 
        && request.auth.uid == resource.data.authorId;
    }
  }
}
```

### 4. Run the Application
```bash
npm start
```

### 5. Deploy to Netlify
```bash
npm run build
# Upload the 'build' folder to Netlify or connect your GitHub repo
```

## 📁 Project Structure
```
src/
├── components/
│   ├── Navbar.js          # Navigation with auth state
│   └── Comments.js        # Comments system with CRUD operations
├── pages/
│   ├── Home.js            # Homepage with search and like functionality
│   ├── BlogDetail.js      # Individual blog view with comments
│   ├── AddBlog.js         # Add/Edit blog form
│   ├── MyBlogs.js         # Personal blog management dashboard
│   └── Auth.js            # Login/Signup with Google OAuth
├── firebase.js            # Firebase configuration
├── App.js                 # Main app with routing
└── index.css              # Custom responsive styling
```

## 🔥 Firebase Operations Used

### Firestore CRUD Operations
- `getDocs()` - Fetch blogs and comments
- `getDoc()` - Fetch single blog
- `addDoc()` - Create new blogs and comments
- `updateDoc()` - Update blogs, likes, and comments
- `deleteDoc()` - Delete blogs and comments
- `arrayUnion/arrayRemove()` - Manage likes array
- `serverTimestamp()` - Consistent timestamps

### Authentication
- `createUserWithEmailAndPassword()` - User registration
- `signInWithEmailAndPassword()` - Email login
- `signInWithPopup()` - Google OAuth login
- `signOut()` - User logout
- `useAuthState()` - Real-time auth state monitoring

## 🎨 Design Features

### Modern UI/UX
- **Purple gradient theme** - Eye-catching color scheme
- **Glass morphism effects** - Modern translucent cards
- **Smooth animations** - Hover effects and transitions
- **Responsive typography** - Optimized for all screen sizes
- **Touch-friendly buttons** - Mobile-optimized interactions

### Mobile Optimization
- **Responsive grid layout** - Adapts to screen size
- **Touch-friendly navigation** - Easy mobile browsing
- **Optimized forms** - Prevents zoom on iOS
- **Flexible search bar** - Full-width on mobile
- **Stacked layouts** - Better mobile readability

## 🚀 Features Implemented

### ✅ Core Requirements (GDG Task)
- Homepage with blog list
- Individual blog post view
- Add new blog functionality
- User authentication
- Edit/Delete posts (author only)
- Responsive design
- Database persistence

### ✅ Bonus Features (Extra Credit)
- **User Authentication** - Email/Password + Google OAuth
- **Real-time Updates** - Live likes and comments
- **Search Functionality** - Find blogs instantly
- **Like System** - Engage with content
- **Comments System** - Community interaction
- **Reading Time** - Professional blog feature
- **Mobile Optimization** - Perfect mobile experience
- **Personal Dashboard** - "My Blogs" management
- **Modern Design** - Professional UI/UX

## 🔒 Security Features
- Authentication required for creating/editing content
- Author-only permissions for blog management
- Comment ownership validation
- Comprehensive Firestore security rules
- Input validation and sanitization
- XSS protection through React

## 📊 Performance Features
- Client-side search filtering
- Optimized Firebase queries
- Lazy loading of comments
- Efficient state management
- Mobile-first responsive design

## 🌟 Highlights for GDG Evaluation
1. **Complete CRUD Operations** - Full blog and comment management
2. **Real-time Features** - Live likes and comments
3. **Modern Tech Stack** - React + Firebase best practices
4. **Professional UI** - Production-ready design
5. **Mobile Responsive** - Works perfectly on all devices
6. **Security Focused** - Proper authentication and authorization
7. **User Experience** - Intuitive and engaging interface

## 🚀 Deployment
**Live Application:** Deployed on Netlify with automatic builds from GitHub

## 👨‍💻 Author
Built for GDG Web Application Selection Task - Showcasing modern web development skills with React, Firebase, and responsive design.