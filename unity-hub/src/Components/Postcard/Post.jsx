import React from 'react';
import './Post.css';

function Post({ username, time, content, likes, comments }) {
    
  return (
    <div className="post">
      <h2>{username}</h2>
      <p>{time}</p>
      <p>{content}</p>
      <div className="post-actions">
        <span>❤️ {likes}</span>
        <span>💬 {comments}</span>
        <span>🔗 Share</span>
      </div>
    </div>
  );
}

export default Post;
