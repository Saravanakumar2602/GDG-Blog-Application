import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, orderBy, query, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase';

const Home = () => {
  const [user] = useAuthState(auth);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const handleLike = async (blogId, currentLikes = []) => {
    if (!user) return;
    
    const blogRef = doc(db, 'blogs', blogId);
    const isLiked = currentLikes.includes(user.uid);
    
    try {
      if (isLiked) {
        await updateDoc(blogRef, {
          likes: arrayRemove(user.uid)
        });
      } else {
        await updateDoc(blogRef, {
          likes: arrayUnion(user.uid)
        });
      }
      
      // Update local state
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === blogId) {
          const newLikes = isLiked 
            ? currentLikes.filter(uid => uid !== user.uid)
            : [...currentLikes, user.uid];
          return { ...blog, likes: newLikes };
        }
        return blog;
      });
      setBlogs(updatedBlogs);
      setFilteredBlogs(updatedBlogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const blogsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          likes: doc.data().likes || []
        }));
        setBlogs(blogsData);
        setFilteredBlogs(blogsData);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container" style={{padding: '2rem 20px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 'bold', color: 'white'}}>Latest Blogs</h1>
        <div style={{position: 'relative'}}>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '25px',
              border: '2px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.9)',
              fontSize: '1rem',
              width: '300px',
              outline: 'none'
            }}
          />
        </div>
      </div>
      {filteredBlogs.length === 0 ? (
        <p style={{color: 'white', textAlign: 'center', fontSize: '1.2rem'}}>No blogs found. {searchTerm ? 'Try a different search term.' : 'Be the first to add one!'}</p>
      ) : (
        <div className="blog-grid">
          {filteredBlogs.map(blog => {
            const readingTime = calculateReadingTime(blog.content);
            const likeCount = blog.likes?.length || 0;
            const isLiked = user && blog.likes?.includes(user.uid);
            
            return (
              <div key={blog.id} className="blog-card">
                <h2>{blog.title}</h2>
                <div className="blog-meta">
                  <div>
                    <p>By {blog.author}</p>
                    <p>{blog.createdAt?.toDate().toLocaleDateString()}</p>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <span style={{color: '#667eea', fontWeight: '500'}}>{readingTime} min read</span>
                    <button
                      onClick={() => handleLike(blog.id, blog.likes)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: user ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: isLiked ? '#fd79a8' : '#718096',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                      }}
                      disabled={!user}
                    >
                      <span style={{fontSize: '1.2rem'}}>{isLiked ? '❤️' : '🤍'}</span>
                      {likeCount}
                    </button>
                  </div>
                </div>
                <div className="blog-content">
                  {blog.content.substring(0, 150)}...
                </div>
                <Link to={`/blog/${blog.id}`} className="read-more">
                  Read More
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;