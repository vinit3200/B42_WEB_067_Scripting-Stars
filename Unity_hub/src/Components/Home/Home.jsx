import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCommunity from "../Community/CreateCommunity";
import EditCommunity from "../Community/EditCommunity"; // Imported EditCommunity
import "./Home.css";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";


const Home = ({ user, setUser, setShowAuth }) => {
  const [displayCommunities, setDisplayCommunities] = useState([]);
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);
  const [showEditCommunity, setShowEditCommunity] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [recommendedCommunities, setRecommendedCommunities] = useState([]);
  const [likes, setLikes] = useState(JSON.parse(localStorage.getItem('likedCommunity')) || false);
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem('communityComments')) || []);
  const [newComment, setNewComment] = useState('');
  

  const navigate = useNavigate();

  useEffect(() => {
    const communities = JSON.parse(localStorage.getItem("communities") || "[]");
    setDisplayCommunities(communities);
    setRecommendedCommunities(communities.filter((c) => c.creator !== user?.username));
  }, [showCreateCommunity, showEditCommunity]);

  const handleRestrictedAction = (action) => {
    if (!user) {
      navigate("/login");
    } else {
      action();
    }
  };

  const handleLike = (communityId) => {
    const likedCommunities = JSON.parse(localStorage.getItem("likedCommunities")) || {};
    likedCommunities[communityId] = !likedCommunities[communityId];
  
    const updatedCommunities = displayCommunities.map((c) => {
      if (c.id === communityId) {
        return { ...c, likes: (c.likes || 0) + (likedCommunities[communityId] ? 1 : -1) };
      }
      return c;
    });

  
    setDisplayCommunities(updatedCommunities);
    setLikes(likedCommunities);
    localStorage.setItem("likedCommunities", JSON.stringify(likedCommunities));
    localStorage.setItem("communities", JSON.stringify(updatedCommunities));
  };

  const toggleCommentSection = (communityId) => {
    setSelectedCommunity((prev) => (prev === communityId ? null : communityId));
    setNewComment(""); 
  };
  
  
  const handlePostComment = (communityId) => {
    // if (!user) {
    //   alert("You must be logged in to comment.");
    //   return;
    // }
  
    if (newComment) {
      const storedComments = JSON.parse(localStorage.getItem("communityComments")) || {};
      const updatedComments = storedComments[communityId] || [];
      updatedComments.push({ text: newComment, user: user.username });
  
      storedComments[communityId] = updatedComments;
      setComments(storedComments);
      localStorage.setItem("communityComments", JSON.stringify(storedComments));
      setNewComment("");
    }
  };
  
  
  

  const handleDeleteCommunity = (id) => {
    const updatedCommunities = displayCommunities.filter((c) => c.id !== id);
    localStorage.setItem("communities", JSON.stringify(updatedCommunities));
    setDisplayCommunities(updatedCommunities);
  };

  return (
    <>
    {/* <div className="Header-section">
      <h1>Unity Hub</h1>
    </div> */}
    <div className="home-layout-t">
      
      {/* Community Links */}
      <section className="community-links-t">
        <h2>Community Links</h2>
        <button className="create-community-btn-t"
          onClick={() => handleRestrictedAction(() => setShowCreateCommunity(true))}>
          Create Community
        </button>
      </section>

      {/* Communities Section */}
      <section className="communities-t">
        <h2>Communities</h2>
        <div className="communities-grid-t">
          {displayCommunities.length > 0 ? (
            displayCommunities.map((community) => (
              <div key={community.id} className="community-card-t">
                 <div className="community-header">
                 {community.profilePicture && (
            <img 
              src={community.profilePicture} 
              alt="Community Profile" 
              className="community-profile-pic" 
            />
          )}
                <h3 className="community-name" style={{color: "purple", fontFamily: "Poppins, sans-serif"}}>{community.name}</h3>
                 </div>
                <h4 className="community-niche" style={{backgroundColor: "yellow"}}>{community.niche}</h4>
                <p>{community.description}</p>

                {/* Like & Comment Section */}
                <div className="community-actions">
                  <div className="like-comment-section">
                  <button type="button" className="like-btn" onClick={() => handleLike(community.id)}>
                    {likes[community.id] ? <FaHeart color="red" /> : <FaRegHeart />} {community.likes || 0}
                  </button>

                  <button type="button" className="comment-btn" onClick={() => toggleCommentSection(community.id)}>
                    <FaComment /> {comments[community.id]?.length || 0}
                  </button>

                  </div>
                  
                  {selectedCommunity === community.id && (
                  <div className="comment-section">
                    <div className="comment-list">
                      {comments[community.id]?.map((comment, index) => (
                        <p key={index}><strong>{comment.user}:</strong> {comment.text}</p>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="button" onClick={() => handlePostComment(community.id)}>
                      Post
                    </button>
                  </div>
                  )}

                  {community.creator === user?.username && (
                  <div>
                    <button style={{marginLeft: "100px", marginRight: "5px"}} onClick={() => {
                      setSelectedCommunity(community);
                      setShowEditCommunity(true);
                    }}>Edit</button>
                    <button onClick={() => handleDeleteCommunity(community.id)}>Delete</button>
                  </div>
                )}
                </div>

                {/* Edit & Delete Buttons */}
                
              </div>
            ))
          ) : (
            <p>No communities yet. Create one!</p>
          )}
        </div>
      </section>

      {/* Recommended Communities Section */}
      <section className="recommended-t">
        <h2>Recommended Communities</h2>
        <div className="recommended-grid-t">
          {recommendedCommunities.length > 0 ? (
            recommendedCommunities.map((community) => (
              <div key={community.id} className="community-card-t">
                <h3>{community.name}</h3>
                <p>{community.niche}</p>
                <button onClick={() => handleRestrictedAction(() => alert("Joined!"))}>
                  Join Community
                </button>
              </div>
            ))
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </section>

      {/* Create Community Popup */}
      {showCreateCommunity && (
        <div className="popup-overlay">
          <div className="popup-content">
            <CreateCommunity
              onClose={() => {
                setShowCreateCommunity(false);
                const updatedCommunities = JSON.parse(localStorage.getItem("communities") || "[]");
                setDisplayCommunities(updatedCommunities);
              }}
              user={user}
            />
          </div>
        </div>
      )}

      {/* Edit Community Popup */}
      {showEditCommunity && selectedCommunity && (
        <div className="popup-overlay">
          <div className="popup-content">
            <EditCommunity
              onClose={() => setShowEditCommunity(false)}
              user={user}
              selectedCommunity={selectedCommunity}
            />
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Home;
