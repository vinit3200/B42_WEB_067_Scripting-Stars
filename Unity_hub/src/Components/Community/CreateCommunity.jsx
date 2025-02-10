import React, { useState } from 'react';
import "./Community.css";

export default function CreateCommunity({ onClose, user }) {
  const [formData, setFormData] = useState({
    name: '',
    niche: 'Technology & Innovation',
    description: '',
    profilePicture: '',
  });

  const [selectedImage, setSelectedImage] = useState(null); // Store selected image temporarily

  const niches = [
    "Technology & Innovation", "Health & Fitness", "Arts & Entertainment", "Literature & Writing",
    "Business & Finance", "Science & Education", "Gaming", "Hobbies & Crafts", "Lifestyle & Relationships",
    "Social Causes & Activism", "Automotive & Transportation", "Food & Beverage", "Spirituality & Religion",
    "Career & Professional Growth", "Miscellaneous Niches"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Only save the selected image when the user clicks "Create Community"
    const updatedFormData = { 
      ...formData, 
      profilePicture: selectedImage || formData.profilePicture 
    };
    
    const communities = JSON.parse(localStorage.getItem('communities') || '[]');
    const newCommunity = { ...updatedFormData, id: Date.now(), creator: user.username, members: [user.username] };
    communities.push(newCommunity);
    localStorage.setItem('communities', JSON.stringify(communities));

    setFormData(updatedFormData); // Update state
    onClose(); // Close modal
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // Temporarily store image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="create-community-modal">
      <div className="modal-content">
        <h2>Create Community</h2>
        <form onSubmit={handleSubmit} className="community-form">
          <div className="form-group profile-section">
            {/* Show selected image only if available */}
            {selectedImage && (
              <img src={selectedImage} alt="Profile" className="profile-picture" />
            )}

            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Enter community name"
            />
          </div>

          <div className="form-group">
            <label>Select Niche</label>
            <select
              value={formData.niche}
              onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
              required
            >
              {niches.map(niche => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Community Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Describe your community..."
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
          </div>

          <div className="form-actions">
            <button type="submit" className="create-btn">Create Community</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
