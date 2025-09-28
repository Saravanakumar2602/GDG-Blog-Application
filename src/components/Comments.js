import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase';

const Comments = ({ blogId }) => {
  const [user] = useAuthState(auth);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const q = query(
          collection(db, 'comments'),
          where('blogId', '==', blogId)
        );
        const querySnapshot = await getDocs(q);
        const commentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Sort by createdAt on client side
        commentsData.sort((a, b) => {
          const aTime = a.createdAt?.toDate?.() || new Date(0);
          const bTime = b.createdAt?.toDate?.() || new Date(0);
          return bTime - aTime;
        });
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (blogId) {
      fetchComments();
    }
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setLoading(true);
    try {
      const commentData = {
        blogId,
        content: newComment.trim(),
        author: user.email,
        authorId: user.uid,
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'comments'), commentData);
      
      // Add to local state immediately
      setComments(prev => [{
        id: Date.now().toString(),
        ...commentData,
        createdAt: { toDate: () => new Date() }
      }, ...prev]);
      
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (commentId, currentContent) => {
    setEditingId(commentId);
    setEditContent(currentContent);
  };

  const handleSaveEdit = async (commentId) => {
    if (!editContent.trim()) return;
    
    try {
      await updateDoc(doc(db, 'comments', commentId), {
        content: editContent.trim(),
        updatedAt: serverTimestamp()
      });
      
      setComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, content: editContent.trim() }
          : comment
      ));
      
      setEditingId(null);
      setEditContent('');
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await deleteDoc(doc(db, 'comments', commentId));
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#2d3748' }}>
        Comments ({comments.length})
      </h3>

      {user ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="form-textarea"
            rows="3"
            style={{ marginBottom: '1rem' }}
          />
          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="btn btn-primary"
            style={{ fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <p style={{ 
          color: '#718096', 
          fontStyle: 'italic', 
          marginBottom: '2rem',
          padding: '1rem',
          background: 'rgba(102, 126, 234, 0.1)',
          borderRadius: '10px',
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          Please log in to leave a comment.
        </p>
      )}

      <div>
        {comments.length === 0 ? (
          <p style={{ color: '#718096', textAlign: 'center', padding: '2rem' }}>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map(comment => {
            const isOwner = user && user.uid === comment.authorId;
            const isEditing = editingId === comment.id;
            
            return (
              <div
                key={comment.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '0.75rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontWeight: '600', color: '#667eea' }}>
                    {comment.author}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#718096' }}>
                      {comment.createdAt?.toDate?.()?.toLocaleDateString() || 'Just now'}
                    </span>
                    {isOwner && !isEditing && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleEdit(comment.id, comment.content)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#667eea',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(comment.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#fd79a8',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {isEditing ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="form-textarea"
                      rows="3"
                      style={{ marginBottom: '1rem', fontSize: '0.9rem' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleSaveEdit(comment.id)}
                        className="btn btn-primary"
                        style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p style={{ 
                    color: '#4a5568', 
                    lineHeight: '1.6',
                    margin: 0,
                    wordBreak: 'break-word'
                  }}>
                    {comment.content}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Comments;