/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import "../styles/createCommunity.css";

const CreateCommunity = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    niche: "",
    description: "",
    profilePicture: null,
  });

  const niches = [
    "Technology & Innovation",
    "Health & Fitness",
    "Arts & Entertainment",
    "Literature & Writing",
    "Business & Finance",
    "Science & Education",
    "Gaming",
    "Hobbies & Crafts",
    "Lifestyle & Relationships",
    "Social Causes & Activism",
    "Automotive & Transportation",
    "Food & Beverage",
    "Spirituality & Religion",
    "Career & Professional Growth",
    "Miscellaneous Niches"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("niche", formData.niche);
    formDataToSend.append("description", formData.description);
    if (formData.profilePicture) {
      formDataToSend.append("profilePicture", formData.profilePicture);
    }

    try {
      const response = await axios.post("/api/communities", formDataToSend);
      if (response.data.success) {
        alert("Community Created Successfully!");
        setFormData({ name: "", niche: "", description: "", profilePicture: null });
        onClose(); // Close modal after submission
      }
    } catch (error) {
      console.error("Error creating community:", error);
      alert("Failed to create community.");
    }
  };

  return (
    <>
      {/* Overlay to dim the background */}
      <div className="modal-overlay" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="create-community-container">
        <h2>Create Community</h2>
        <form onSubmit={handleSubmit}>
          <label>Community Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Select Niche</label>
          <select name="niche" value={formData.niche} onChange={handleChange} required>
            <option value="">Select a niche</option>
            {niches.map((niche) => (
              <option key={niche} value={niche}>{niche}</option>
            ))}
          </select>

          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <button type="submit" className="create-btn">Create Community</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default CreateCommunity;
