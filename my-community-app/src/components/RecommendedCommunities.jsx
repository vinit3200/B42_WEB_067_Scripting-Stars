// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "../styles/community.css";

const RecommendedCommunities = () => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/recommended") // Replace with your API
      .then((res) => res.json())
      .then((data) => setRecommended(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="recommended-communities">
      <h2>Recommended Communities</h2>
      <hr />
      <ul>
        {recommended.map((community) => (
          <li key={community.id}>{community.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedCommunities;
