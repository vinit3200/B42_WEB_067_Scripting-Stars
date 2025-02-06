import React from 'react';
import './Poll.css';

function Poll() {
  return (
    <div className="poll">
      <h3>What's your favorite programming language?</h3>
      <div className="poll-option">Python - 45%</div>
      <div className="poll-option">JavaScript - 30%</div>
      <div className="poll-option">Java - 15%</div>
      <div className="poll-option">C# - 10%</div>
      <p>Click an option to vote</p>
    </div>
  );
}

export default Poll;
