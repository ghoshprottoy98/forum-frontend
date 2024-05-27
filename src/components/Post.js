import React from 'react';

const Post = ({ post, user }) => {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="post-author"><strong>Posted by: {user ? user.name : 'Unknown'}</strong></p>
      <div className="post-actions">
        <button className="action-btn"><i className="fas fa-arrow-up"></i> 67 </button>
        <button className="action-btn"><i className="fas fa-arrow-down"></i> 52 </button>
        <button className="action-btn"><i className="fas fa-comment"></i> 34 </button>
        <button className="action-btn"><i className="fas fa-bookmark"></i> </button>
      </div>
    </div>
  );
};

export default Post;
