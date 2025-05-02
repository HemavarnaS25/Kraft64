import React, { useEffect, useState } from 'react';
import ChangePassword from './ChangePassword';

const Dashboard = () => {
  const [user, setUser] = useState({ name: '', email: '', id: '' });
  const [selectedSection, setSelectedSection] = useState('User');
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || '');
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setAvatar(base64Image);
      localStorage.setItem('avatar', base64Image);
    };
    if (file) {
      reader.readAsDataURL(file);
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
                  src={avatar || '/avatar-placeholder.png'}
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
                <input type="text" placeholder="Username" defaultValue={user.name} />
                <input type="text" placeholder="Full Name" defaultValue={user.name} />
                <textarea placeholder="Biography">
                  The weakest part of any system isn’t the hardware or the software... it’s the user
                </textarea>
                <input type="email" placeholder="Email Address" defaultValue={user.email} />
              </div>
              <button className="save-btn" disabled>Save Changes</button>
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
