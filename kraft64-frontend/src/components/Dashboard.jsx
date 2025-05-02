// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import ChangePassword from './ChangePassword';


const Dashboard = () => {
  const [user, setUser] = useState({ name: '', email: '', id: '', bio: '' });
  const [selectedSection, setSelectedSection] = useState('User');
  const [bio, setBio] = useState('');
  const [fullName, setFullName] = useState('');
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setFullName(storedUser.name || '');
      setBio(storedUser.bio || '');
    }
  }, []);

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/update-profile/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, bio }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
        const updatedUser = {
          ...user,
          name: data.user.fullName,
          bio: data.user.bio,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        alert(data.msg || 'Update failed.');
      }
    } catch (error) {
      console.error('Frontend error:', error);
      alert('Error updating profile');
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2>Menu</h2>
        <ul>
          <li onClick={() => setSelectedSection('User')} className={selectedSection === 'User' ? 'active' : ''}>User</li>
          <li onClick={() => setSelectedSection('Explore')} className={selectedSection === 'Explore' ? 'active' : ''}>Explore</li>
          <li onClick={() => setSelectedSection('Train')} className={selectedSection === 'Train' ? 'active' : ''}>Train</li>
          <li onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/';
          }} className="logout">Logout</li>
        </ul>
      </aside>

      <main className="dashboard-content">
        {selectedSection === 'User' && (
          <section className="profile-section">
            <h2 className="section-heading">General Information</h2>
            <div className="profile-card">
              <div className="form-grid">
                <input type="text" value={user.name} disabled placeholder="Username" />
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Biography" />
                <input type="email" value={user.email} disabled placeholder="Email" />
              </div>
              <button className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
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
            <button onClick={() => setIsChangePasswordModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
