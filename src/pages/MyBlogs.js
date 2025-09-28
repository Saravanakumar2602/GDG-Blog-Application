import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase';

const MyBlogs = () => {
  const [user] = useAuthState(auth);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchMyBlogs = async () => {
      try {
        // First try to get all blogs and filter client-side
        const allBlogsQuery = collection(db, 'blogs');
        const querySnapshot = await getDocs(allBlogsQuery);
        const allBlogs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Filter by current user
        const myBlogs = allBlogs.filter(blog => blog.authorId === user.uid);
        setBlogs(myBlogs);
        
        console.log('Current user ID:', user.uid);
        console.log('All blogs:', allBlogs);
        console.log('My blogs:', myBlogs);
      } catch (error) {
        console.error('Error fetching my blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [user]);

  if (!user) return <div className="loading">Please login to view your blogs</div>;
  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container" style={{padding: '2rem 20px'}}>
      <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>My Blogs</h1>
      {blogs.length === 0 ? (
        <div style={{textAlign: 'center', padding: '2rem'}}>
          <p style={{color: '#666', marginBottom: '1rem'}}>You haven't written any blogs yet.</p>
          <Link to="/add-blog" className="btn btn-primary">Write Your First Blog</Link>
        </div>
      ) : (
        <div className="blog-grid">
          {blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              <h2>{blog.title}</h2>
              <div className="blog-meta">
                <p>{blog.createdAt?.toDate().toLocaleDateString()}</p>
              </div>
              <div className="blog-content">
                {blog.content.substring(0, 150)}...
              </div>
              <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
                <Link to={`/blog/${blog.id}`} className="read-more">View</Link>
                <Link to={`/edit-blog/${blog.id}`} className="btn btn-primary" style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}>Edit</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;