import React, { useEffect, useState } from 'react';
import ChangePassword from './ChangePassword';

const Dashboard = () => {
  const [user, setUser] = useState({ name: '', email: '', id: '' });
  const [selectedSection, setSelectedSection] = useState('User');
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(localStorage.getItem('avatar') || '');
  const [bio, setBio] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFullName(storedUser.name);
      setEmail(storedUser.email);
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setPreviewAvatar(base64Image);
      localStorage.setItem('avatar', base64Image);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          fullName: user.name,
          email: user.email,
          avatar: avatar, // base64 or URL
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert(data.msg || 'Update failed.');
      }
    } catch (error) {
      console.error('Frontend error:', error);
      alert('Error updating profile');
    }
  };
  

  const handleChangePasswordClick = () => setIsChangePasswordModalOpen(true);
  const handleCloseModal = () => setIsChangePasswordModalOpen(false);

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2>Menu</h2>
        <ul>
          <li onClick={() => setSelectedSection('User')} className={selectedSection === 'User' ? 'active' : ''}>User</li>
          <li onClick={() => setSelectedSection('Explore')} className={selectedSection === 'Explore' ? 'active' : ''}>Explore</li>
          <li onClick={() => setSelectedSection('Train')} className={selectedSection === 'Train' ? 'active' : ''}>Train</li>
        </ul>
      </aside>

      <main className="dashboard-content">
        {selectedSection === 'User' && (
          <section className="profile-section">
            <h2 className="section-heading">General Information</h2>
            <div className="profile-card">
              <div className="avatar-upload">
                <img
                  src={previewAvatar || '/avatar-placeholder.png'}
                  alt="Avatar"
                  className="avatar-img"
                />
                <label htmlFor="avatarInput" className="upload-btn">Upload Avatar</label>
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
                <small className="upload-info">Max size 2MB. Formats: JPG, PNG.</small>
              </div>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Username"
                  value={user.name}
                  disabled
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <textarea
                  placeholder="Biography"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="save-btn" onClick={handleSaveChanges}>
  Save Changes
</button>

            </div>
          </section>
        )}
        {selectedSection === 'Explore' && <p>Explore content coming soon...</p>}
        {selectedSection === 'Train' && <p>Train content coming soon...</p>}
      </main>

      {isChangePasswordModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ChangePassword userId={user.id} />
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
