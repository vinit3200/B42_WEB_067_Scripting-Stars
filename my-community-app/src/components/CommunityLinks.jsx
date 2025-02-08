// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../styles/community.css";
import CreateCommunity from "./CreateCommunity";
import EditCommunity from "./EditCommunity";
// eslint-disable-next-line no-unused-vars
import MyCommunities from "./MyCommunities"; // Import MyCommunities component

// eslint-disable-next-line react/prop-types
const CommunityLinks = ({ setShowMyCommunities }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="community-links">
      <h2>Community Links</h2>
      <hr />
      <button className="community-btn" onClick={() => setShowCreateModal(true)}>
        Create Community
      </button>
      <button className="community-btn" onClick={() => setShowEditModal(true)}>
        Edit Community
      </button>
      <button className="community-btn" onClick={() => setShowMyCommunities(true)}>
        My Communities
      </button>

      {/* Conditional Rendering of Modals */}
      {showCreateModal && <CreateCommunity onClose={() => setShowCreateModal(false)} />} 
      {showEditModal && <EditCommunity onClose={() => setShowEditModal(false)} />} 
    </div>
  );
};

export default CommunityLinks;
