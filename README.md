# Blog Application

A full-stack blog application built with React and Firebase for the GDG Web Application Selection Task.

## Features

### Core Features
- ✅ Homepage displaying list of blog posts
- ✅ Individual blog post view with title, author, date, and content
- ✅ Add new blog post functionality
- ✅ User authentication (Sign up, Login, Logout)
- ✅ Edit/Delete blog posts (only by author)
- ✅ Responsive design
- ✅ Firebase Firestore for data persistence

### Tech Stack
- **Frontend**: React, React Router DOM
- **Backend**: Firebase (Firestore + Authentication)
- **Styling**: TailwindCSS
- **State Management**: React Hooks + Firebase Hooks

## Setup Instructions

### 1. Clone and Install Dependencies
```bash
cd blog-app
npm install
```

### 2. Firebase Configuration
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore Database and Authentication (Email/Password)
3. Get your Firebase config from Project Settings
4. Update `src/firebase.js` with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 3. Firestore Security Rules
Add these rules to your Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /blogs/{document} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.authorId;
    }
  }
}
```

### 4. Run the Application
```bash
npm start
```

## Project Structure
```
src/
├── components/
│   └── Navbar.js          # Navigation component
├── pages/
│   ├── Home.js            # Homepage with blog list
│   ├── BlogDetail.js      # Individual blog view
│   ├── AddBlog.js         # Add/Edit blog form
│   └── Auth.js            # Login/Signup page
├── firebase.js            # Firebase configuration
└── App.js                 # Main app with routing
```

## Firebase Operations Used

### Firestore CRUD Operations
- `getDocs()` - Fetch all blogs
- `getDoc()` - Fetch single blog
- `addDoc()` - Create new blog
- `updateDoc()` - Update existing blog
- `deleteDoc()` - Delete blog

### Authentication
- `createUserWithEmailAndPassword()` - User registration
- `signInWithEmailAndPassword()` - User login
- `signOut()` - User logout
- `useAuthState()` - Monitor auth state

## Deployment

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Set up environment variables if needed

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## Features Implemented

✅ **Core Requirements**
- Homepage with blog list
- Individual blog post view
- Add new blog functionality
- User authentication
- Edit/Delete posts (author only)
- Responsive design
- Database persistence

✅ **Bonus Features**
- User authentication with Firebase Auth
- Author-only edit/delete permissions
- Responsive TailwindCSS design
- Real-time data with Firestore
- Proper error handling
- Loading states

## Security Features
- Authentication required for creating/editing blogs
- Author-only permissions for edit/delete
- Firestore security rules
- Input validation and sanitization

## Author
Built for GDG Web Application Selection Task
