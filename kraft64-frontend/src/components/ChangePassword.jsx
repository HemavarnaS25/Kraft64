import React, { useState } from 'react';

const ChangePassword = ({ userId }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/auth/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          currentPassword,
          newPassword
        }),
      });

      const data = await res.json();
      alert(data.msg);
    } catch (err) {
      console.error(err);
      alert('Failed to change password');
    }
  };

  return (
    <div className="content-box">
      <h2>🔒 Change Password</h2>
      <form onSubmit={handleSubmit} className="password-form">
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ChangePassword;
