// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "../styles/community.css";

const MyCommunities = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    // Fetch communities created by the user (replace with actual API call)
    const fetchUserCommunities = async () => {
      try {
        const response = await fetch("https://your-api-url.com/my-communities"); // Replace with your API
        const data = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchUserCommunities();
  }, []);

  return (
    <div className="communities">
      <h2>Communities</h2>
      <hr />
      {communities.length > 0 ? (
        communities.map((community) => (
          <div key={community.id} className="community-card">
            <h3>{community.name}</h3>
            <p><strong>Niche:</strong> {community.niche}</p>
            <p><strong>Members:</strong> {community.members}</p>
            <button className="join-btn">Join</button>
          </div>
        ))
      ) : (
        <p>No communities found.</p>
      )}
    </div>
  );
};

export default MyCommunities;
