import React from 'react';
import { useState, useEffect } from "react"

export default function EditCommunity({ onClose, user, selectedCommunity }) {
  const [communities, setCommunities] = useState(JSON.parse(localStorage.getItem('communities') || '[]'));
  const [formData, setFormData] = useState(selectedCommunity);

  useEffect(() => {
    setFormData(selectedCommunity);
  }, [selectedCommunity]);

  const niches = [
    "Technology & Innovation", "Health & Fitness", "Arts & Entertainment", "Literature & Writing",
    "Business & Finance", "Science & Education", "Gaming", "Hobbies & Crafts", "Lifestyle & Relationships",
    "Social Causes & Activism", "Automotive & Transportation", "Food & Beverage", "Spirituality & Religion",
    "Career & Professional Growth", "Miscellaneous Niches"
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCommunities = communities.map(c => 
      c.id === formData.id ? { ...c, ...formData } : c
    );
    localStorage.setItem('communities', JSON.stringify(updatedCommunities));
    onClose();
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

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Community</h2>
        <form onSubmit={handleSubmit} className="edit-form">
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
