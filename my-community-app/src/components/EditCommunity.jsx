/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/editCommunity.css";

const EditCommunity = ({ onClose }) => {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    profilePicture: null,
  });

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get("/api/communities");
        if (response.data.success) {
          setCommunities(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };
    fetchCommunities();
  }, []);

  const handleSelectChange = (e) => {
    const selected = communities.find((c) => c._id === e.target.value);
    setSelectedCommunity(selected);
    setFormData({ name: selected?.name || "", description: selected?.description || "", profilePicture: null });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCommunity) return alert("Please select a community to edit.");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    if (formData.profilePicture) {
      formDataToSend.append("profilePicture", formData.profilePicture);
    }

    try {
      const response = await axios.put(`/api/communities/${selectedCommunity._id}`, formDataToSend);
      if (response.data.success) {
        alert("Community Updated Successfully!");
        onClose(); // Close modal after update
      }
    } catch (error) {
      console.error("Error updating community:", error);
      alert("Failed to update community.");
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="edit-community-container">
        <h2>Edit Community</h2>
        <form onSubmit={handleSubmit}>
          <label>Select Community</label>
          <select value={selectedCommunity?._id || ""} onChange={handleSelectChange} required>
            <option value="">Choose a community</option>
            {communities.map((community) => (
              <option key={community._id} value={community._id}>{community.name}</option>
            ))}
          </select>

          <label>Community Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <button type="submit" className="save-btn">Save Changes</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default EditCommunity;
