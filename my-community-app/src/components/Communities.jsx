// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "../styles/community.css";

const Communities = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetch("https://api.example.com/communities") // Replace with your API
      .then((res) => res.json())
      .then((data) => setCommunities(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="communities">
      <h2>Communities</h2>
      <hr />
      <ul>
        {communities.map((community) => (
          <li key={community.id}>{community.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Communities;
