import React from 'react';

const Sidebar = ({ setActiveView }) => {
  return (
    <div className="sidebar">
      <h2>Learnify</h2>
      <ul>
        <li onClick={() => setActiveView('profile')}>👤 User Profile</li>
        <li onClick={() => setActiveView('explore')}>🌍 Explore</li>
        <li onClick={() => setActiveView('train')}>🧠 Train</li>
        <li onClick={() => setActiveView('changePassword')}>🔒 Change Password</li>
      </ul>
    </div>
  );
};

export default Sidebar;
