import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase';
import Comments from '../components/Comments';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  const handleLike = async () => {
    if (!user || !blog) return;
    
    const blogRef = doc(db, 'blogs', id);
    const currentLikes = blog.likes || [];
    const isLiked = currentLikes.includes(user.uid);
    
    try {
      if (isLiked) {
        await updateDoc(blogRef, {
          likes: arrayRemove(user.uid)
        });
        setBlog(prev => ({
          ...prev,
          likes: currentLikes.filter(uid => uid !== user.uid)
        }));
      } else {
        await updateDoc(blogRef, {
          likes: arrayUnion(user.uid)
        });
        setBlog(prev => ({
          ...prev,
          likes: [...currentLikes, user.uid]
        }));
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setBlog({ 
            id: docSnap.id, 
            ...docSnap.data(),
            likes: docSnap.data().likes || []
          });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteDoc(doc(db, 'blogs', id));
        navigate('/');
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!blog) return <div className="loading">Blog not found</div>;

  const canEdit = user && user.uid === blog.authorId;
  const readingTime = calculateReadingTime(blog.content);
  const likeCount = blog.likes?.length || 0;
  const isLiked = user && blog.likes?.includes(user.uid);

  return (
    <div className="container">
      <article className="article">
        <h1 className="article-title">{blog.title}</h1>
        <div className="article-meta">
          <div>
            <p>By {blog.author}</p>
            <p>{blog.createdAt?.toDate().toLocaleDateString()}</p>
            <p style={{color: '#667eea', fontWeight: '500'}}>{readingTime} min read</p>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <button
              onClick={handleLike}
              style={{
                background: 'none',
                border: 'none',
                cursor: user ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: isLiked ? '#fd79a8' : '#718096',
                fontSize: '1.1rem',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                transition: 'all 0.3s ease'
              }}
              disabled={!user}
            >
              <span style={{fontSize: '1.5rem'}}>{isLiked ? '❤️' : '🤍'}</span>
              {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
            </button>
            {canEdit && (
              <div className="article-actions">
                <button
                  onClick={() => navigate(`/edit-blog/${id}`)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="article-content">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>
        
        <Comments blogId={id} />
      </article>
    </div>
  );
};

export default BlogDetail;