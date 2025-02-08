// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import CommunityLinks from "./components/CommunityLinks";
import Communities from "./components/Communities";
import RecommendedCommunities from "./components/RecommendedCommunities";
// import CreateCommunityForm from "./components/CreateCommunityForm";
import "./styles/community.css";


const App = () => {
    // eslint-disable-next-line no-unused-vars
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="container">
            <CommunityLinks setShowForm={setShowForm} />
            <Communities />
            <RecommendedCommunities />

            {/* {showForm && <CreateCommunityForm onClose={() => setShowForm(false)} />} */}
        </div>
    );
};

export default App;
