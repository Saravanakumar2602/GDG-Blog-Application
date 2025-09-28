import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
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

  return (
    <div className="container">
      <article className="article">
        <h1 className="article-title">{blog.title}</h1>
        <div className="article-meta">
          <div>
            <p>By {blog.author}</p>
            <p>{blog.createdAt?.toDate().toLocaleDateString()}</p>
          </div>
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
        <div className="article-content">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;