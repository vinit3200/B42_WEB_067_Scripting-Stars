
import React, { useState } from 'react';

export default function EditCommunity({ onClose, user }) {
  const [communities, setCommunities] = useState(JSON.parse(localStorage.getItem('communities') || '[]'));
  const userCommunities = communities.filter(c => c.creator === user.username);
  const [selectedCommunity, setSelectedCommunity] = useState(userCommunities[0]?.id || '');
  const [formData, setFormData] = useState(userCommunities[0] || {
    name: '',
    niche: '',
    description: '',
    profilePicture: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCommunities = communities.map(c => 
      c.id === parseInt(selectedCommunity) ? { ...c, ...formData } : c
    );
    localStorage.setItem('communities', JSON.stringify(updatedCommunities));
    onClose();
  };

  const handleCommunityChange = (e) => {
    const communityId = parseInt(e.target.value);
    setSelectedCommunity(communityId);
    const community = communities.find(c => c.id === communityId);
    setFormData(community || {
      name: '',
      niche: '',
      description: '',
      profilePicture: ''
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (userCommunities.length === 0) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit Community</h2>
          <p>You haven't created any communities yet.</p>
          <button onClick={onClose} className="cancel-btn">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Community</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>Select Community</label>
            <select value={selectedCommunity} onChange={handleCommunityChange}>
              {userCommunities.map(community => (
                <option key={community.id} value={community.id}>
                  {community.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Community Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
              rows="4"
            />
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
            {formData.profilePicture && (
              <div className="image-preview">
                <img src={formData.profilePicture} alt="Preview" />
              </div>
            )}
          </div>
          <div className="form-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
