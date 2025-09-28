import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">BlogApp</Link>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/my-blogs">My Blogs</Link>
              <Link to="/add-blog">+ Add</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;