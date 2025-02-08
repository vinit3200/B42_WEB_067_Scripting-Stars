import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfile from "../Community/EditProfile";
import './Home.css';



const Home = ({ user, setUser, setShowAuth, showEditProfile, setShowEditProfile }) => {
  const [displayCommunities, setDisplayCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const communities = JSON.parse(localStorage.getItem("communities") || "[]");
    setDisplayCommunities(communities);
  }, []);

  // Function to handle restricted actions
  const handleRestrictedAction = (action) => {
    if (!user) {
      navigate("/login"); // Redirect to login if not logged in
    } else {
      action(); // Execute the intended action
    }
  };

  return (
    <div className="home-layout-t">
      <section className="community-links-t">
        <h2>Community Links</h2>
        <button 
          className="community-link-btn-t"
          onClick={() => handleRestrictedAction(() => {
            const communities = JSON.parse(localStorage.getItem("communities") || "[]");
            const userCommunities = user 
              ? communities.filter(c => c.creator === user.username) 
              : [];
            setDisplayCommunities(userCommunities);
          })}
        >
          My Communities
        </button>
      </section>

      <section className="communities-t">
        <h2>Communities</h2>
        <div className="communities-grid-t">
          {displayCommunities.map((community) => (
            <div key={community.id} className="community-card-t">
              {community.profilePicture && (
                <img src={community.profilePicture} alt={community.name} className="community-image-t" />
              )}
              <h3>{community.name}</h3>
              <p className="community-niche-t">Niche: {community.niche}</p>
              <p className="community-description-t">{community.description}</p>
              <p className="community-members-t">Members: {community.members.length}</p>
              <button onClick={() => handleRestrictedAction(() => alert("Joined!"))}>
                Join Community
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="recommended-t">
        <h2>Recommended Communities</h2>
      </section>

      {/* ✅ Improved EditProfile Modal Rendering */}
      {showEditProfile && (
        <div className="popup-overlay">
          <div className="popup-content">
            <EditProfile 
              user={user} 
              setUser={setUser} 
              onClose={() => setShowEditProfile(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
