import React from 'react';

const ProfileView = ({ user }) => {
  if (!user) return <p>Loading...</p>;

  return (
    <div className="content-box">
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default ProfileView;
