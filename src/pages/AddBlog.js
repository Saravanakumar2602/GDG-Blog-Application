import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase';

const AddBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(id);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (isEdit) {
      const fetchBlog = async () => {
        try {
          const docRef = doc(db, 'blogs', id);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const blogData = docSnap.data();
            if (blogData.authorId !== user.uid) {
              navigate('/');
              return;
            }
            setFormData({
              title: blogData.title,
              content: blogData.content
            });
          }
        } catch (error) {
          console.error('Error fetching blog:', error);
        }
      };
      fetchBlog();
    }
  }, [user, navigate, id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      if (isEdit) {
        await updateDoc(doc(db, 'blogs', id), {
          title: formData.title,
          content: formData.content,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'blogs'), {
          title: formData.title,
          content: formData.content,
          author: user.email,
          authorId: user.uid,
          createdAt: serverTimestamp()
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!user) return null;

  return (
    <div className="container">
      <div className="form-container">
        <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center'}}>
          {isEdit ? 'Edit Blog' : 'Add New Blog'}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter blog title"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="form-textarea"
              placeholder="Write your blog content here..."
            />
          </div>
          <div style={{display: 'flex', gap: '1rem'}}>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Blog' : 'Publish Blog')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;